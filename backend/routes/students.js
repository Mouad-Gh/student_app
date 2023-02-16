const express = require('express');
const {
    getStudents,
    getStudent,
    addStudent,
    updateStudent,
    deletStudent
} = require('../controllers/studentController');


const router = express.Router();


//create a student
router.post('/', addStudent);

//get a single student
router.get('/:id',getStudent);

//get all students
router.get('/', getStudents);

//update a student
router.put('/:id',updateStudent);

//delete a student
router.delete('/:id',deletStudent);

module.exports = router;