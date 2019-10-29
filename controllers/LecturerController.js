const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Op = Sequelize.Op;
const config = require('../config/lecturerconfig');
const models = require('../models');
const db = require('../models');
const QFile = require('../utils/ExamQuestion');


//=====================================================================
// ADMIN LOGIN
//=====================================================================
exports.lecturerLogin = (req, res, next) => {
    models.Lecturer.findOne({
        where: {
            email: req.body.email
        },
    }).then(lecturer => {
        
        if (lecturer ===null) {
            return res.status(200).json({
                status: "ERROR",
                message: "Invalid login Credentials"
            })
        } else {
            bcrypt.compare(req.body.password, lecturer.password).then(function(matched) {
                if(matched){
                    if(!lecturer.verified){
                        res.json({
                            status: 'ERROR',
                            message: 'Account Not Verified. Please visit your email to activate account'
                        })
                    }
                    var token = jwt.sign({
                        lecturer: lecturer,
                    }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    })
                    res.json({
                        status: "SUCCESS",
                        lecturer: lecturer,
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


//=====================================================================
// NEW EXAMS
//=====================================================================
exports.newExam = (req, res, next) => {
    models.Exam.create({
        name: req.body.name,
        subjectid: req.body.subjectid,
        lecturerid: req.body.lecturerid,
        deadline: new Date(req.body.ddate+' '+req.body.dtime),
        filename: new Date().toISOString().replace(/:/g, '_') +'_'+ req.body.name.replace(/[^\w\s]/gi, '')+'.json'
    }).then(async (exam) => {
        const isAvailable = await QFile.createExamQuestions(exam.filename)
       if(isAvailable.exists == true){
            res.json({
                exam: exam,
                isAvailable: isAvailable,
                message: 'File Available'
            })
        }else{
            res.json({
                exam: exam,
                isAvailable,
                message: 'New Exam Created.Please start add questions'
            })
        }
       
    }).catch(error => {
        res.json({
            status: 'ERROR',
            error: error,
            message: 'Ooops Something went wrong.Please try again later'
        })
    })
}


//=====================================================================
// GET ALL LECTURER EXAMS
//=====================================================================
exports.getExams = (req, res, next) => {
    models.Exam.findAll({
        where: {
            lecturerid: req.body.lecturerid
        }
    }).then(exams => {
       res.json({
           status: 'SUCCESS',
           exams: exams
       })
    }).catch(error => {
        res.json({
            status: 'ERROR',
            message: 'OOops Something went wrong.Please trya gain later'
        })
    })
}

//=====================================================================
// GET ALL COURSES
//=====================================================================
exports.getCourses = (req, res, next) => {
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


//=====================================================================
// DELETE EXAMS
//=====================================================================
exports.deleteExam = (req, res, next) => {
    models.Exam.findOne({
        where: {
            [Op.and]: [{
                id: req.body.examid
            },{
                lecturerid: req.body.lecturerid
            }]
        }
    }).then(exam => {
        if(exam){
            exams.destroy().then(ex => {
                res.json({
                    status: 'SUCCESS',
                    message: 'Exams Deleted Successfully.'
                })
            }).catch(err => {
                res.json({
                    status: 'ERROR',
                    message: 'You might NOT have permission to delete this content.'
                })
            })
        }
    }).catch(error=> {
        res.json({
            status: 'ERROR',
            message: 'Ooops Content NOT Found. Contact Administration'
        })
    })
}


//=====================================================================
// DELETE EXAMS 
/*
1. examid
2. subjectid
3. questionid
*/
//=====================================================================
exports.addQuestionToExam = (req, res, next) => {
    models.Exam.findOne({
        where: {
            id: req.body.examid
        }
    }).then(exam => {
        if(exam) {
            models.Subject.findOne({
                where: {
                    id: req.body.subjectid 
                }
            }).then(subject => {
                if(subject !=null){
                    db.sequelize.query("SELECT * FROM "+subject.tblName+" WHERE id="+req.body.questionid)
                    .then(([results, metadata]) => {
                        
                        const result = QFile.addQuestion(results[0], exam.filename);
            
                        res.json({
                            result: result,
                            question: results
                        })
                           
                    }).catch(error =>{
                        res.json({
                            status: 'ERROR',
                            message: 'Oops Somethign went wrong. Please try again later dddd'
                        })
                   })
                }else{
                    res.json({
                        status: 'ERROR',
                        message: 'Subject NOT Found. Please Contact Administrators'
                    })
                }
                  
            }).catch(error => {
                res.json({
                    status: 'ERROR',
                    message: 'Oops Somethign went wrong. Shame on us!!. Please try again later'
                })
            })
            
        }
    }).catch(error => {
        res.json({
            error: error
        })
    })
}

exports.getSubscribedCourses = (req, res, next) => {
        models.LecturerSubscription.findAll({
            where: {
                lecturerid: req.body.lecturerid
            }
        }).then(subs => {
            if(subs!= null && subs.length>0){
                var subIds = [];
                for(var i=0; i<subs.length; i++){
                      subIds.push(subs[i].subjectid)
                }

                models.Subject.findAll({
                    where: {
                        id: {
                            [Op.in]: subIds,
                        }
                    }
                }).then(subjects => {
                     res.json({
                         status: 'SUCCESS',
                         subjects: subjects
                     })
                }).catch(error => {
                    res.json({
                        status: 'ERROR',
                        message: error.message
                    })
                })
            }else{
                res.json({
                    status: 'ERROR',
                    message: 'You have NOT Subcribed to any courses'
                })
            }
        }).catch(error => {
            res.json({
                status: 'ERROR',
                message: error.message+' Shame on us !!!. Please try again later'
            })
        })
}

exports.resetPassword = (req, res, next) => {
        models.Lecturer.findOne({
            where: {
                activationcode: req.body.activationcode
            }
        }).then(lecturer => {
            if(lecturer!= null){
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if(err){
                        res.json({
                            status: 'ERROR',
                            message: 'Something went wrong. Please try again'
                        })
                    }else{
                        lecturer.update({
                            verified: true,
                            password: hash,
                            activationcode: null
                        }).then(lect => {
                            res.json({
                                status: 'SUCCESS',
                                message: 'Password Reset Successfully'
                            })
                        })
                    }
                })
            }else{
                res.json({
                    status: 'ERROR',
                    message: 'Account NOT Found. Please contact administation via support email'
                })
            }
        }).catch(error=> {
            res.json({
                status: 'ERROR',
                message: error.message+'. Shame on us!!! Please try again later'
            })
        })
}







