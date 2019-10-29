var express = require('express');
var router = express.Router();

const StudentsController = require('../../controllers/StudentsController');


//============================================================================
//STUDENT REGISTRATIONS
//============================================================================
router.post('/register', StudentsController.register);

//============================================================================
//STUDENT REGISTRATIONS
//============================================================================
router.post('/login', StudentsController.login);

//============================================================================
//STUDENT REGISTRATIONS
//============================================================================
// router.post('/me', StudentsController.me);

//============================================================================
//STUDENT REGISTRATIONS
//============================================================================
// router.post('/forgot-password', StudentsController.forgotPassword);

//============================================================================
//STUDENT REGISTRATIONS
//============================================================================
// router.post('/reset-password', StudentsController.resetPassword);

module.exports = router;
