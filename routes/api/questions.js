var express = require('express');
var router = express.Router();
var multer  = require('multer')
var mkdirp = require('mkdirp');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');


const models = require('../../models');
const db = require('../../models');
const Op = Sequelize.Op;


const AdminQuestionsController = require('../../controllers/AdminQuestionsController');



 /* ADD NEW SUBJECTS. */
router.post('/new-question', AdminQuestionsController.saveSingleQuestion);




module.exports = router;