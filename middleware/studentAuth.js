const jwt =  require('jsonwebtoken');
const config = require('../config/studentconfig');

const adminAuth = (req, res, next) =>{
    var bearerToken = req.headers.authorization
    if(typeof bearerToken != 'undefined'){
       var token = bearerToken.split(' ')[1];
       console.log('TOKEN',req.headers['authorization'])
        //var token = req.headers['authorization']
        if(!token){
            return res.json({
                auth:false,
                message:"No Token provided"
            })
        }

        //token exists so verify it
        jwt.verify(token, config.secret,(err, decoded)=>{
            if(err){
                console.log('=================================jwt-error===============================',err)
                return res.json({
                    status:'AUTH_FAILED',
                    auth: false,
                    error: err,
                    message: err.message
                })
            }
            if(decoded){
                // res.json({
                //     decoded: decoded
                // })
              next();
            }
        });
    }else{
        return res.json({
            status:'AUTH_FAILED',
            auth: false,
            message:"Oopsy :) You are not authorized to access this."
        })
    }
    
}

module.exports = adminAuth;