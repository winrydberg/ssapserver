const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../config/adminconfig');
const notify = require('../utils/lecture_activation_email');
const Op = Sequelize.Op;


//=====================================================================
// ADD NEW ADMIN
//=====================================================================
exports.addAdmin = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
            models.Admin.findOrCreate({
                where: {
                    email: req.body.email
                }, 
                defaults: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    image: null,
                    isActive: false,
                    phoneNo: req.body.phoneNo,
                    roleid: req.body.roleid
                }})
                .then(([admin, created]) => {
                     if(created){
                         //TODO - send password reset email to admin to reset password
                         res.json({
                             status: 'SUCCESS',
                             message: 'Admin Account Created Successfully'
                         });
                     }else{
                         if(admin){
                            res.json({
                                status: 'ERROR',
                                message: 'Admin with provided email already exist.'
                            }); 
                         }else{
                            res.json({
                                status: 'ERROR',
                                message: 'OOps Something went wrong.Please try again later'
                            });
                         }
                     }
                })
    })
}


//=====================================================================
// ADMIN LOGIN
//=====================================================================
exports.adminLogin = (req, res, next) => {
    models.Admin.findOne({
        where: {
            email: req.body.email
        },
    }).then(admin => {
        
        if (admin ===null) {
            return res.status(200).json({
                status: "ERROR",
                message: "Invalid login Credentials"
            })
        } else {
            bcrypt.compare(req.body.password, admin.password).then(function(matched) {
                if(matched){
                    if(!admin.isActive){
                        res.json({
                            status: 'UNVERIFIED',
                            message: 'Account Not Verified.'
                        })
                    }
                    var token = jwt.sign({
                        admin: admin,
                    }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    })
                    res.json({
                        status: "SUCCESS",
                        admin: admin,
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


exports.getRoles = (req, res, next) => {
    models.Role.findAll().then(roles => {
        res.json({
            status: 'SUCCESS',
            roles: roles
        })
    }).catch(error => {
        res.json({
            status: 'ERROR',
            roles: []
        })
    })
}


exports.getCourses = (req, res , next) => {
    models.Subject.findAll().then(subjects => {
        res.json({
            status: 'SUCCESS',
            subjects: subjects,
            message: 'Course retrieved.'
        })
    }).catch(error => {
        res.json({
            status: 'ERROR',
            message: 'Oops Something went wrong. Please try again later'
        })
    })
}

exports.getInstitutions = (req, res , next) => {
    models.Institution.findAll().then(institutions => {
        res.json({
            status: 'SUCCESS',
            institutions: institutions,
            message: 'Institutions retrieved.'
        })
    }).catch(error => {
        res.json({
            status: 'ERROR',
            message: 'Oops Something went wrong. Please try again later'
        })
    })
}


exports.newLecturer = (req,res, next) => {
    models.Lecturer.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            verified: true,
            phoneNo: req.body.phoneNo,
            institution: req.body.institutionid,
            activationcode: Math.random().toString(36).slice(-10)
        }})
        .then(([lecturer, created]) => {

                if(created){
                    notify(lecturer.email, lecturer.activationcode, lecturer.firstName)
                    res.json({
                        status: 'SUCCESS',
                        message: 'Lecturer Successfully created'
                    })
                }else{
                    if(lecturer){
                        res.json({
                            status: 'ERROR',
                            message: 'Lecturer Already Exists'
                        }) 
                    }else{
                        res.json({
                            status: 'ERROR',
                            message: 'Oops Something went wrong.Please try again later'
                        }) 
                    }
                }
        }).catch(error => {
            res.json({
                status: 'ERROR',
                message: 'Lecturer Already Exists'
            }) 
        })
    
}