

//selectiong buttons
const insertBtn = document.querySelector('#insertBtn');
const updateBtn = document.querySelector('#updateBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const allRecordsBtn = document.querySelector('#allRecordsBtn');
const filterBtn = document.querySelector('#filterBtn');
const resultBtn = document.querySelector('#resultBtn');
const message = document.querySelector('#message');

//selecting divs
const AddDetails = document.querySelector('#AddDetails');
const UpdateDetails = document.querySelector('#UpdateDetails');
const DeleteDetails = document.querySelector('#DeleteDetails');
const BatchResult = document.querySelector('#BatchResult');
const Filter = document.querySelector('#Filter');

//eventListners
insertBtn.addEventListener('click', () => {
    message.style.display = "none";
    AddDetails.style.display = 'flex';
    UpdateDetails.style.display = 'none';
    DeleteDetails.style.display = 'none';
    BatchResult.style.display = 'none';
    Filter.style.display = 'none';

});

updateBtn.addEventListener('click', () => {
    message.style.display = "none";
    AddDetails.style.display = 'none';
    UpdateDetails.style.display = 'flex';
    DeleteDetails.style.display = 'none';
    BatchResult.style.display = 'none';
    Filter.style.display = 'none';
});

deleteBtn.addEventListener('click', () => {
    message.style.display = "none";
    AddDetails.style.display = 'none';
    UpdateDetails.style.display = 'none';
    DeleteDetails.style.display = 'flex';
    BatchResult.style.display = 'none';
    Filter.style.display = 'none';
});

resultBtn.addEventListener('click', () => {
    message.style.display = "none";
    AddDetails.style.display = 'none';
    UpdateDetails.style.display = 'none';
    DeleteDetails.style.display = 'none';
    BatchResult.style.display = 'flex';
    Filter.style.display = 'none';
});

filterBtn.addEventListener('click', () => {
    message.style.display = "none";
    AddDetails.style.display = 'none';
    UpdateDetails.style.display = 'none';
    DeleteDetails.style.display = 'none';
    BatchResult.style.display = 'none';
    Filter.style.display = 'flex';
});

allRecordsBtn.addEventListener('click', () => {
    fetch('./allRecords').then(res => {
        res.json();
    })
});

function collectData() {

    const rollNo = document.querySelector('#rollNo').value;
    const name = document.querySelector('#name').value;
    const section = document.querySelector('#section').value;
    const marks = document.querySelector('#marks').value;




    const data = {
        rollno: rollNo,
        name: name,
        section: section,
        marks: marks

    }
    fetch('/addStudent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

    }).then(d => {
        console.log("data saved : ");
    }).catch(e => {
        console.log("Error approve")
    });

    AddDetails.style.display = 'none';
    message.style.display = "inline";


}

function UpdateData() {
    const rollNo = document.querySelector('#UrollNo').value;
    const name = document.querySelector('#Uname').value;
    const section = document.querySelector('#Usection').value;
    const marks = document.querySelector('#Umarks').value;

    const data = {
        rollno: rollNo,
        name: name,
        section: section,
        marks: marks

    }
    fetch('/updateStudent', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

    }).then(d => {
        console.log("data updated : ");
    }).catch(e => {
        console.log("Error approve")
    });
    UpdateDetails.style.display = 'none';
    message.style.display = "inline";
}

function deleteRecord() {
    const rollNo = document.querySelector('#D_rollNo').value;
    const data = {
        rollno: rollNo,
    }
    fetch('/removeStudent', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

    }).then(d => {
        console.log("record Deleted");
    }).catch(e => {
        console.log("error " + e);
    });
    DeleteDetails.style.display = 'none';
    message.style.display = "inline";
}




