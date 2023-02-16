const Student = require('../models/Student');


//create a student
const addStudent = async (req, res)=>{
    try {
        const { first_name, last_name, birth_date, email } = req.body;
    
        const student = await Student.create({ first_name, last_name, birth_date, email });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}

//get a single student by id
const getStudent = async(req, res)=>{
    const { id } = req.params;
    try {
        
        const student = await Student.findById(id)
        if(!student){
            return res.status(404).json({error: 'no such student!'});
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
    
}

//get students
const getStudents = async(req, res)=>{
    const page = parseInt(req.query.page || "0");
    const search = req.query.name || "";
    const PAGE_SIZE = 20;
    try {

        //get the number of documents
        const total = await Student.countDocuments({last_name: {$regex:search, $options: 'i'}});
        
        const students = await Student.find({last_name: {$regex:search, $options: 'i'}})
                                        .limit(PAGE_SIZE)
                                        .skip(PAGE_SIZE * page);
        res.status(200).json({
            nbPages: (parseInt(total / PAGE_SIZE ) +1) ,
            data: students
        });
    } catch (error) {
        res.status(400).json({err : error.message});
    }
    
}

//modify
const updateStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const { first_name, last_name, birth_date, email } = req.body;
        
        const student = await Student.findByIdAndUpdate(id, { first_name, last_name, birth_date, email }); 
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}

//delete wallet
const deletStudent = async (req, res)=>{
    const id = req.params.id;

    try {
        
        const student = await Student.findByIdAndDelete(id); 

        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}

module.exports = {
    addStudent,
    getStudent,
    getStudents,
    updateStudent,
    deletStudent
}