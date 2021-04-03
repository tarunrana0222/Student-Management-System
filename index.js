const express = require('express');
const bodyparser = require('body-parser');
const expHbs = require("hbs");
const path = require('path');

require('./database');
const student = require('./Models/students');

const app = express();


app.use(express.static(path.join(__dirname, "./Scripts")));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: "50mb" }));


//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Frontend/homepage.html'));
})
app.get('/allRecords', (req, res) => {
    res.sendFile(path.join(__dirname, './Frontend/AllRecords.html'));

})
app.post('/addStudent', (req, res) => {
    console.log(req.body);


    const newStudent = new student({
        rollNo: req.body.rollno,
        name: req.body.name,
        section: req.body.section,
        marks: req.body.marks
    })
    newStudent.save().then(d => {
        console.log("new student added");
        res.json({
            "d": d
        });
    })
});

app.put('/updateStudent', (req, res) => {
    console.log(req.body);
    student.updateOne({ rollNo: req.body.rollno }, {
        $set: { name: req.body.name, section: req.body.section, marks: req.body.marks }
    }).then(d => {
        console.log("updated record");
        res.json({
            "d": d
        });
    })

});

app.delete('/removeStudent', (req, res) => {
    console.log(req.body);
    student.deleteOne({ rollNo: req.body.rollno }).then(d => {
        console.log("deleted");
        res.json({
            "d": d
        });
    })
});



app.listen(3000, () => {
    console.log("Running on port 3000");
})