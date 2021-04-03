

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
    document.querySelector('#AllRecords').style.display = 'none';

    BatchResult.style.display = 'none';
    Filter.style.display = 'none';
    document.querySelector('#addEntry').disabled = true;

    setInterval(() => {
        const rollNo = document.querySelector('#rollNo').value;
        const name = document.querySelector('#name').value;
        const section = document.querySelector('#section').value;
        const marks = document.querySelector('#marks').value;
        if (rollNo != '' && name != '' && section != '' && marks != '')
            document.querySelector('#addEntry').disabled = false;

    }, 1000);

});

updateBtn.addEventListener('click', () => {
    message.style.display = "none";
    AddDetails.style.display = 'none';
    UpdateDetails.style.display = 'flex';
    DeleteDetails.style.display = 'none';
    document.querySelector('#AllRecords').style.display = 'none';

    BatchResult.style.display = 'none';
    Filter.style.display = 'none';
    document.querySelector('#update').disabled = true;

    setInterval(() => {
        const rollNo = document.querySelector('#UrollNo').value;
        const name = document.querySelector('#Uname').value;
        const section = document.querySelector('#Usection').value;
        const marks = document.querySelector('#Umarks').value;

        if (UrollNo != '' && Uname != '' && Usection != '' && Umarks != '')
            document.querySelector('#update').disabled = false;


    }, 1000)

});

deleteBtn.addEventListener('click', () => {
    message.style.display = "none";
    AddDetails.style.display = 'none';
    UpdateDetails.style.display = 'none';
    DeleteDetails.style.display = 'flex';
    BatchResult.style.display = 'none';
    document.querySelector('#AllRecords').style.display = 'none';
    document.querySelector('#delete').disabled = true;
    Filter.style.display = 'none';

    setInterval(() => {
        const rollNo = document.querySelector('#D_rollNo').value;
        if (rollNo != '')
            document.querySelector('#delete').disabled = false;


    })
});

resultBtn.addEventListener('click', () => {
    message.style.display = "none";
    AddDetails.style.display = 'none';
    UpdateDetails.style.display = 'none';
    DeleteDetails.style.display = 'none';
    BatchResult.style.display = 'flex';
    Filter.style.display = 'none';
    document.querySelector('#AllRecords').style.display = 'none';

});

filterBtn.addEventListener('click', () => {
    message.style.display = "none";
    AddDetails.style.display = 'none';
    UpdateDetails.style.display = 'none';
    DeleteDetails.style.display = 'none';
    BatchResult.style.display = 'none';
    Filter.style.display = 'flex';
    document.querySelector('#AllRecords').style.display = 'none';
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


const table = document.querySelector('#table');
allRecordsBtn.addEventListener('click', async () => {
    table.textContent = '';

    message.style.display = "none";
    AddDetails.style.display = 'none';
    UpdateDetails.style.display = 'none';
    DeleteDetails.style.display = 'none';
    BatchResult.style.display = 'none';
    Filter.style.display = 'none';



    let records = await fetch('/allDetails', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    records.json().then(d => {
        table.className = "table";
        let tablehead = table.insertRow();
        var headerCell1 = document.createElement("TH");
        headerCell1.innerHTML = "Roll No";
        tablehead.appendChild(headerCell1);
        var headerCell2 = document.createElement("TH");
        headerCell2.innerHTML = "Name";
        tablehead.appendChild(headerCell2);
        var headerCell3 = document.createElement("TH");
        headerCell3.innerHTML = "Section";
        tablehead.appendChild(headerCell3);
        var headerCell4 = document.createElement("TH");
        headerCell4.innerHTML = "Marks";
        tablehead.appendChild(headerCell4);

        for (let i = 0; i < d.length; i++) {
            let row = table.insertRow();
            let td1 = row.insertCell();
            let td2 = row.insertCell();
            let td3 = row.insertCell();
            let td4 = row.insertCell();
            td1.appendChild(document.createTextNode(d[i].rollNo));
            td2.appendChild(document.createTextNode(d[i].name));
            td3.appendChild(document.createTextNode(d[i].section));
            td4.appendChild(document.createTextNode(d[i].marks));




        }

        console.log(d.length);

        document.querySelector('#AllRecords').style.display = 'flex';

    }).catch(e => {
        console.log("error" + e);
    })
});


let pass = document.querySelector('#passValue');
let fail = document.querySelector('#failValue');

resultBtn.addEventListener('click', async () => {
    let result = await fetch('/batchResult', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }


    })
    result.json().then(d => {
        pass.textContent = d.pass;
        fail.textContent = d.fail;
        console.log(d);
    })
});

async function A() {
    let result = await fetch('/A', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    result.json().then(d => {
        table.textContent = '';
        console.log(d);
        table.className = "table";
        let tablehead = table.insertRow();
        var headerCell1 = document.createElement("TH");
        headerCell1.innerHTML = "Roll No";
        tablehead.appendChild(headerCell1);
        var headerCell2 = document.createElement("TH");
        headerCell2.innerHTML = "Name";
        tablehead.appendChild(headerCell2);
        var headerCell3 = document.createElement("TH");
        headerCell3.innerHTML = "Section";
        tablehead.appendChild(headerCell3);
        var headerCell4 = document.createElement("TH");
        headerCell4.innerHTML = "Marks";
        tablehead.appendChild(headerCell4);

        for (let i = 0; i < d.length; i++) {
            let row = table.insertRow();
            let td1 = row.insertCell();
            let td2 = row.insertCell();
            let td3 = row.insertCell();
            let td4 = row.insertCell();
            td1.appendChild(document.createTextNode(d[i].rollNo));
            td2.appendChild(document.createTextNode(d[i].name));
            td3.appendChild(document.createTextNode(d[i].section));
            td4.appendChild(document.createTextNode(d[i].marks));

        }
    })
    document.querySelector('#AllRecords').style.display = 'flex';


}

async function B() {
    let result = await fetch('/B', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    result.json().then(d => {
        console.log(d);
        table.textContent = '';
        table.className = "table";
        let tablehead = table.insertRow();
        var headerCell1 = document.createElement("TH");
        headerCell1.innerHTML = "Roll No";
        tablehead.appendChild(headerCell1);
        var headerCell2 = document.createElement("TH");
        headerCell2.innerHTML = "Name";
        tablehead.appendChild(headerCell2);
        var headerCell3 = document.createElement("TH");
        headerCell3.innerHTML = "Section";
        tablehead.appendChild(headerCell3);
        var headerCell4 = document.createElement("TH");
        headerCell4.innerHTML = "Marks";
        tablehead.appendChild(headerCell4);

        for (let i = 0; i < d.length; i++) {
            let row = table.insertRow();
            let td1 = row.insertCell();
            let td2 = row.insertCell();
            let td3 = row.insertCell();
            let td4 = row.insertCell();
            td1.appendChild(document.createTextNode(d[i].rollNo));
            td2.appendChild(document.createTextNode(d[i].name));
            td3.appendChild(document.createTextNode(d[i].section));
            td4.appendChild(document.createTextNode(d[i].marks));

        }
    })
    document.querySelector('#AllRecords').style.display = 'flex';


}

async function C() {
    let result = await fetch('/C', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    result.json().then(d => {
        table.textContent = '';
        console.log(d);
        table.className = "table";
        let tablehead = table.insertRow();
        var headerCell1 = document.createElement("TH");
        headerCell1.innerHTML = "Roll No";
        tablehead.appendChild(headerCell1);
        var headerCell2 = document.createElement("TH");
        headerCell2.innerHTML = "Name";
        tablehead.appendChild(headerCell2);
        var headerCell3 = document.createElement("TH");
        headerCell3.innerHTML = "Section";
        tablehead.appendChild(headerCell3);
        var headerCell4 = document.createElement("TH");
        headerCell4.innerHTML = "Marks";
        tablehead.appendChild(headerCell4);

        for (let i = 0; i < d.length; i++) {
            let row = table.insertRow();
            let td1 = row.insertCell();
            let td2 = row.insertCell();
            let td3 = row.insertCell();
            let td4 = row.insertCell();
            td1.appendChild(document.createTextNode(d[i].rollNo));
            td2.appendChild(document.createTextNode(d[i].name));
            td3.appendChild(document.createTextNode(d[i].section));
            td4.appendChild(document.createTextNode(d[i].marks));

        }
    })
    document.querySelector('#AllRecords').style.display = 'flex';


}

async function D() {
    let result = await fetch('/D', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    result.json().then(d => {
        table.textContent = '';
        console.log(d);
        table.className = "table";
        let tablehead = table.insertRow();
        var headerCell1 = document.createElement("TH");
        headerCell1.innerHTML = "Roll No";
        tablehead.appendChild(headerCell1);
        var headerCell2 = document.createElement("TH");
        headerCell2.innerHTML = "Name";
        tablehead.appendChild(headerCell2);
        var headerCell3 = document.createElement("TH");
        headerCell3.innerHTML = "Section";
        tablehead.appendChild(headerCell3);
        var headerCell4 = document.createElement("TH");
        headerCell4.innerHTML = "Marks";
        tablehead.appendChild(headerCell4);

        for (let i = 0; i < d.length; i++) {
            let row = table.insertRow();
            let td1 = row.insertCell();
            let td2 = row.insertCell();
            let td3 = row.insertCell();
            let td4 = row.insertCell();
            td1.appendChild(document.createTextNode(d[i].rollNo));
            td2.appendChild(document.createTextNode(d[i].name));
            td3.appendChild(document.createTextNode(d[i].section));
            td4.appendChild(document.createTextNode(d[i].marks));

        }
    })
    document.querySelector('#AllRecords').style.display = 'flex';
}

async function Fail() {
    let result = await fetch('/Fail', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    result.json().then(d => {
        table.textContent = '';
        console.log(d);
        table.className = "table";
        let tablehead = table.insertRow();
        var headerCell1 = document.createElement("TH");
        headerCell1.innerHTML = "Roll No";
        tablehead.appendChild(headerCell1);
        var headerCell2 = document.createElement("TH");
        headerCell2.innerHTML = "Name";
        tablehead.appendChild(headerCell2);
        var headerCell3 = document.createElement("TH");
        headerCell3.innerHTML = "Section";
        tablehead.appendChild(headerCell3);
        var headerCell4 = document.createElement("TH");
        headerCell4.innerHTML = "Marks";
        tablehead.appendChild(headerCell4);

        for (let i = 0; i < d.length; i++) {
            let row = table.insertRow();
            let td1 = row.insertCell();
            let td2 = row.insertCell();
            let td3 = row.insertCell();
            let td4 = row.insertCell();
            td1.appendChild(document.createTextNode(d[i].rollNo));
            td2.appendChild(document.createTextNode(d[i].name));
            td3.appendChild(document.createTextNode(d[i].section));
            td4.appendChild(document.createTextNode(d[i].marks));

        }
    })
    document.querySelector('#AllRecords').style.display = 'flex';


}