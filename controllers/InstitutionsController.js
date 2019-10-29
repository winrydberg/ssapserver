const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require('../models');


//=====================================================================
// CREATE NEW INSTITUTION
//=====================================================================
exports.newInstitution = (req, res, next) => {
    models.Institution.findOrCreate({
        where: {
            name: req.body.name
        }, 
        defaults: {
           name: req.body.name,
           logo: req.file.filename
        }}).then(([institution, created]) => {
            if(created){
                res.json({
                    status: 'SUCCESS',
                    message: 'Institution added to platform'
                })
            }else{
                if(institution) {
                    res.json({
                        status: 'ERROR',
                        message: 'Institution Already exist'
                    });
                }else{
                    res.json({
                        status: 'ERROR',
                        message: 'Oops Something went wrong. Please try again later.'
                    });
                }
            }
        }).catch(error => {
            res.json({
                status: 'ERROR',
                message: 'Oops Something went wrong. Please try again later.'
            });
        })
}




exports.getInstitutions = (req, res, next ) => {
    models.Institution.findAll().then(institutions => {
        res.json({
            status: 'SUCCESS',
            institutions: institutions
        })
    }).catch(error => {
        res.json({
            status: 'ERROR',
            message: 'Data Not available now. Please try again later',
            institutions: []
        }) 
    })
}