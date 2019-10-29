var express = require('express');
var router = express.Router();
const AdminController = require('../../controllers/AdminController');
const adminAuth = require('../../middleware/adminAuth');


//============================================================================
//LECTURER REGISTRATIONS
//============================================================================
router.post('/login', AdminController.adminLogin);

//============================================================================
//ADD NEW ADMIN
//============================================================================
router.post('/new-admin', AdminController.addAdmin);

//============================================================================
//ADMIN ROLES
//============================================================================
router.get('/get-roles', adminAuth, AdminController.getRoles);

//============================================================================
//GET COURSES FOR ADMIN
//============================================================================
router.get('/get-courses', AdminController.getCourses);

//============================================================================
//ADMIN ADD NE LECTURER
//============================================================================
router.post('/new-lecturer', AdminController.newLecturer);


module.exports = router;