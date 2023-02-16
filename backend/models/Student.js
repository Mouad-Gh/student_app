const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const StudentSchema = new Schema({
    first_name : {
        type : String,
        required: true
    },
    last_name : {
        type : String,
        required: true,
    },
    birth_date : {
        type : Date,
        required: true,
    },
    email : {
        type : String,
        required: true,
        unique : true
    }

},{ timestamps: true });


module.exports = mongoose.model('Student', StudentSchema);


