const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');
// const config = require('../config/myconfig');
const sendEmail  = require('../utils/email');
const Op = Sequelize.Op;


//=====================================================================
// STUDENT REGISTRATION
//=====================================================================
exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        models.Student.findOrCreate({
            where: {
                [Op.or]: [{
                    phoneNo: req.body.phoneNo
                }, {
                    email: req.body.email
                }]
            },
            defaults: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                title: req.body.title,
                phoneNo: req.body.phoneNo,
                image: null,
                email: req.body.email,
                password: hash,
                verified: false,
                billed: false
            }
        }).spread((student, created) => {
                if(created){
                    var val = Math.floor(1000 + Math.random() * 9000);
                    models.Verification.create({
                        userId: student.id,
                        userEmail: student.email,
                        accountType: 0,
                        vcode: val
                    }).then(verify => {
                        sendEmail(req.body.email,val,student.firstName);
                        res.json({
                            student: student,
                            created: created,
                            message: 'SSAP Account Successfully created. Visit your email to activate account',
                            status: 'SUCCESS'
                        })
                    })
                }else{
                    if(student){
                        res.json({
                            message: 'Ooops Account Creation failed. User with Email / Phone No. Already Exist',
                            student: student,
                            created: created,
                            status: 'ERROR'
                        })
                   }else{
                        res.json({
                            message: 'OOps Something went wrong. Please try again later',
                            student: student,
                            created: created,
                            status: 'ERROR'
                        })
                   }
                }
        })
    })
}


//=====================================================================
// STUDENT LOGIN
//=====================================================================
exports.login = (req, res, next) => {
    models.Student.findOne({
        where: {
            email: req.body.email
        },
    }).then(user => {
        
        if (user ===null) {
            return res.status(200).json({
                status: "ERROR",
                message: "Invalid login Credentials"
            })
        } else {
            bcrypt.compare(req.body.password, user.password).then(function(matched) {
                if(matched){
                    if(!user.verified){
                        res.json({
                            status: 'UNVERIFIED',
                            message: 'Account Not Verified.'
                        })
                    }
                    var token = jwt.sign({
                        user: user
                    }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    })
                    res.json({
                        status: "SUCCESS",
                        user: user,
                        token: token,
                        message: "Login Successful",
                        matched: matched
                    })
                }else {
                    res.json({
                        status: "ERROR",
                        message: "Invalid login Credentials"
                    })
                }
            }).catch(err =>{
                res.json({error: err.message})
            })        
        }
    })
}