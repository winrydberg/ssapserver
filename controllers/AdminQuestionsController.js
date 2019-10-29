const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');
const db = require('../models');
const Op = Sequelize.Op;


//=====================================================================
// LECTURER REGISTRATION
//=====================================================================
exports.saveSingleQuestion = (req, res, next) => {
     models.Subject.findOne({
         where: {
            id: req.body.subjectid
         }
     }).then(subject => {
         if(subject != null){
            db.sequelize.query("INSERT INTO "+subject.tblName+" ( `question`, `pa1`, `pa2`, `pa3`, `pa4`,`ca`, `capoint`, `wapoint`,`ansexplanation` ) VALUES ('"+ req.body.question +"','"+ req.body.pa1 +"', '"+ req.body.pa2 +"', '"+ req.body.pa3 +"', '"+ req.body.pa4 +"','"+req.body.ca+"','"+req.body.capoint+"',"+0+",'"+req.body.ansexplanation+"')")
            .then(([results, metadata]) => {
                   
                    res.json({
                        status: 'SUCCESS',
                        results: results,
                        message: 'Question Successfully uploaded'
                    }) 
                                                          
            }).catch(error =>{
                res.json({
                    status: 'ERROR',
                    message: 'Oops Something went wrong. Please try again.'
                });
            })
         }else{
             res.json({
                 status: 'ERROR',
                 message: 'Subject does not exist'
             });
         }
     })
}