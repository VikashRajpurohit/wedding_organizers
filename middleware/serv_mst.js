const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    //getusertoken
    const token = req.header("x-auth-token");

    if(!token){
        return res.status(401).json({msg : 'No token, provided'});
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.Serv_mst = decoded.Serv_mst;
        next();
    } catch (error) {
        res.status(401).json({msg : "Token is not Valid"});
    }
}