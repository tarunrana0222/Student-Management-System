const express = require('express');
const bodyparser = require('body-parser');
const expHbs = require("hbs");
const path = require('path');

require('./database');
const student = require('./Models/students');
require('dotenv').config();
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

app.get('/allDetails', (req, res) => {
    student.find({}).then(d => {
        console.log(d);
        res.json(d);
    })
})

app.get('/batchResult', async (req, res) => {
    let obj = {
        "pass": 0,
        "fail": 0
    }
    obj.pass = await student.find({ "marks": { $gt: 50 } }).countDocuments();
    obj.fail = await student.find({ "marks": { $lt: 50 } }).countDocuments();

    res.json(obj);
})

app.get('/A', async (req, res) => {
    student.find({ "marks": { $gte: 90 } }).then(d => {
        res.json(d);
    })
});
app.get('/B', async (req, res) => {
    student.find({ "marks": { $gte: 80, $lt: 90 } }).then(d => {
        res.json(d);
    })
});
app.get('/C', async (req, res) => {
    student.find({ "marks": { $gte: 70, $lt: 80 } }).then(d => {
        res.json(d);
    })
});
app.get('/D', async (req, res) => {
    student.find({ "marks": { $gte: 60, $lt: 70 } }).then(d => {
        res.json(d);
    })
});
app.get('/Fail', async (req, res) => {
    student.find({ "marks": { $lt: 50 } }).then(d => {
        res.json(d);
    })
});



app.listen(process.env.PORT, () => {
    console.log("Running on port 3000");
})