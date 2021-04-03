const mongoose = require('mongoose');
const student = mongoose.Schema({
    rollNo: {
        type: Number,
        required: true,
        unique: true,

    },
    name: {
        type: String,
        trim: true,

    }
    ,
    section: {
        type: String,
        trim: true,
        required: true
    },
    marks: {
        type: Number,
        required: true,
    }

});

mongoose.model('student', student);
module.exports = mongoose.model("student");