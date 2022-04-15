const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require("express-session");
const app = express();
const cookieParer = require('cookie-parser');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
require('dotenv').config()


const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '978839895629-huorof84m856afqnodp6rfsgdcbuvc7h.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);


//Database Check
connectDB();


//Init Middleware
app.use(express.json({ extended: false }));
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    key: "userId",
    secret: "abcdefghijklmno",
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: true
  })
);

app.use(fileupload());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
 credentials: true
}
));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(cookieParer());
app.use(bodyParser.urlencoded({ extended: true }));

//Api Check
app.get('/', (req, res) => res.send("APi running"));

//Route Check
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/serv_type', require('./routes/api/serv_type'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/serv_mst', require('./routes/api/serv_mst'));
app.use('/api/service', require('./routes/api/service'));
app.use('/api/org', require('./routes/api/org'));
app.use('/api/sendmail', require('./routes/api/sendmail'));
app.use('/api/package', require('./routes/api/package'));
app.use('/api/payment', require('./routes/api/payment'));
app.use('/api/otp', require('./routes/api/email'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.get('/', (req, res)=>{
  res.render('index')
})

app.get('/login', (req,res)=>{
  res.render('login');
})

app.post('/login', (req,res)=>{
  let token = req.body.token;

  async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
    }
    verify()
    .then(()=>{
        res.cookie('session-token', token);
        res.send('success')
    })
    .catch(console.error);

})

app.get('/profile', checkAuthenticated, (req, res)=>{
  let user = req.user;
  res.cookie('gmail',user.email);
  res.cookie('gpassword',user.sub);
  console.log(user.email)
  res.render('profile', {user});
})

app.get('/protectedRoute', checkAuthenticated, (req,res)=>{
  res.send('This route is protected')
})

app.get('/logout', (req, res)=>{
  res.clearCookie('session-token');
  res.redirect('/login')

})


function checkAuthenticated(req, res, next){

  let token = req.cookies['session-token'];

  let user = {};
  async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      user.name = payload.name;
      user.email = payload.email;
      user.picture = payload.picture;
      user.whole = payload;
    }
    verify()
    .then(()=>{
        
        req.user = user;
        next();
    })
    .catch(err=>{
        res.redirect('/login')
    })

}
