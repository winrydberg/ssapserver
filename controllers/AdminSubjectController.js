const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');
const db = require('../models');
const Op = Sequelize.Op;


//=====================================================================
// LECTURER REGISTRATION
//=====================================================================
exports.newSubject = (req, res, next) => {
    var table_name = req.body.name.replace(/\s+/g, '_').toLowerCase()+'questions';
    models.Subject.findOrCreate({
        where: {
            [Op.or]: [{
                name: req.body.name
            },{
                tblName: table_name
            }]
        },
        defaults: {
           name: req.body.name,
           image: req.file.filename,
           parent: req.body.parent,
           tblName: table_name
        }})
        .then(([subject, created]) => {
            if(created){
                db.sequelize.query("CREATE TABLE IF NOT EXISTS "+table_name+" (`id` INTEGER NOT NULL auto_increment,PRIMARY KEY (`id`), `question` "+
                "TEXT, `pa1` TEXT,`pa2` TEXT,`pa3` TEXT, `pa4` TEXT, `ca` TEXT, `capoint` INTEGER,`wapoint` INTEGER, `ansexplanation` TEXT)")
                    .then(([results, metadata]) => {
                           
                        res.json({
                            status: 'SUCCESS',
                            message: 'Subject Successfully created'
                        })
                           
                    }).catch(error =>{
                        res.json({
                            status: 'SUCCESS',
                            message: 'Oops'
                        })
                    })
             }else{
                if(subject){
                    res.json({
                        status: 'ERROR',
                        message: 'Subject Already Exists'
                    })
                }else{
                    res.json({
                        status: 'ERROR',
                        message: 'Oops Something went wrong. Please try again later'
                    })
                }
             }
        }).catch(error =>{
            res.json({
                status: 'ERROR',
                message: error.message
            })
        })
}

//=========================================================================================
//GET PARENT SUBJECTS
//=========================================================================================
exports.getParentSubjects = (req, res) => {
    models.Subject.findAll({
        where: {
            parent: 0
        }
    }).then(subjects => {
        res.json({
            status: 'SUCCESS',
            subjects: subjects
        })
    }).catch(error => {
        res.json({
            status: 'ERROR',
            subjects: []
        })
    })
}

//=========================================================================================
// GET CHILD SUBJECTS
//=========================================================================================
exports.getChildSubjects = (req, res) => {
    models.Subject.findAll({
        where: {
            parent: req.body.parent
        }
    }).then(subjects => {
        res.json({
            status: 'SUCCESS',
            subjects: subjects
        })
    }).catch(error => {
        res.json({
            status: 'ERROR',
            subjects: []
        })
    })
}


exports.getAllSubjects = (req, res)  =>{
    models.Subject.findAll().then(subjects => {
        res.json({
            status: 'SUCCESS',
            subjects: subjects
        })
    }).catch(error => {
        res.json({
            status: 'ERROR',
            subjects: []
        })
    })
}