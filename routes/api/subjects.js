var express = require('express');
var router = express.Router();
var multer  = require('multer')
var mkdirp = require('mkdirp');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');


const models = require('../../models');
const db = require('../../models');
const Op = Sequelize.Op;


const AdminSubjectController = require('../../controllers/AdminSubjectController');


// var upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination : function (req, file, cb){
        var dest = './public/images/subjects'
        mkdirp.sync(dest);
        cb(null,dest);
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') +'_'+ file.originalname)
    }
})

const fileFilter = (req, file, callback) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype ==='image/png' || file.mimetype === 'image/jpg'){
        callback(null, true)
    }else{
        callback(null, false)
    }
}

const upload = multer({
    storage: storage, 
    limits:{
        fileSize: 1024 * 1024 * 5  // accepts only files sizes less or equal to 5MB
    },
    fileFilter : fileFilter
 })


 /* ADD NEW SUBJECTS. */
router.post('/new-subject', upload.single('image'), AdminSubjectController.newSubject);

router.get('/parent-subjects', AdminSubjectController.getParentSubjects);

/* GET ALL SUBECTS */
router.get('/all-subjects', AdminSubjectController.getAllSubjects);

module.exports = router;