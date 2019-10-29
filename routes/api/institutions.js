var express = require('express');
var multer  = require('multer')
var mkdirp = require('mkdirp');
var router = express.Router();

const InstitutionsController = require('../../controllers/InstitutionsController');


// var upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination : function (req, file, cb){
        var dest = './public/images/institutions'
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


//============================================================================
//ADD NEW INSTITUTION
//============================================================================
router.post('/new', upload.single('image'), InstitutionsController.newInstitution);

//============================================================================
//GET ALL INSTITUTION
//============================================================================
router.get('/get-all', InstitutionsController.getInstitutions);


module.exports = router;
