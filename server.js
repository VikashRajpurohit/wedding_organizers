const express=require('express');
const connectDB=require('./config/db');

const app = express();

//Database Check
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Api Check
app.get('/',(req,res)=> res.send("APi running"));

//Route Check
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/serv_type',require('./routes/api/serv_type'));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/serv_mst',require('./routes/api/serv_mst'));
app.use('/api/service',require('./routes/api/service'));
app.use('/api/org',require('./routes/api/org'));
app.use('/api/sendmail',require('./routes/api/sendmail'));
app.use('/api/package',require('./routes/api/package'));
app.use('/api/payment',require('./routes/api/payment'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
 
