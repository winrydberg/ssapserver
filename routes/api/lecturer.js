var express = require('express');
var router = express.Router();

const LecturerController = require('../../controllers/LecturerController');


//============================================================================
//LECTURER REGISTRATIONS
//============================================================================
router.post('/login', LecturerController.lecturerLogin);

//============================================================================
//CREATE A NEW EXAMS/TEST FRO LECTURER
//============================================================================
router.post('/new-exam', LecturerController.newExam);

//============================================================================
//GET ALL LECTURER EXAMS
//============================================================================
router.post('/get-exams', LecturerController.getExams);

//============================================================================
//GET ALL COURSES
//============================================================================
router.get('/get-courses', LecturerController.getCourses);

//============================================================================
//DELETE EXAMS
//============================================================================
router.post('/delete-exam', LecturerController.deleteExam);

//============================================================================
//DELETE EXAMS
//============================================================================
router.post('/add-question', LecturerController.addQuestionToExam);

//============================================================================
//GET LECTURER SUBSCRIBED COURSES 
//============================================================================
router.post('/get-subs-courses', LecturerController.getSubscribedCourses);

//============================================================================
//RESET PASSWORD AND ACCOUNTACTIVATION
//============================================================================
router.post('/reset-password', LecturerController.resetPassword);

//============================================================================
//LECTURER LOGINS
//============================================================================
// router.post('/login', LecturerController.login);


module.exports = router;
