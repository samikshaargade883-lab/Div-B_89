
const API = "/students";

const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");

// Register student
if (form) {
    form.onsubmit = async function (e) {
        e.preventDefault();

        const student = {
            name: document.getElementById("name").value,
            roll: document.getElementById("roll").value,
            branch: document.getElementById("branch").value,
            exam: document.getElementById("exam").value,
            date: document.getElementById("date").value
        };

        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        });

        const data = await res.json();
        document.getElementById("message").innerText = data.message;
        form.reset();
    };
}

// Display students
async function loadStudents() {
    const res = await fetch(API);
    const students = await res.json();

    list.innerHTML = "";
    
const search = document.getElementById("search");

const keyword = search ? search.value.toLowerCase() : "";

const filtered = students.filter(s =>
    s.name.toLowerCase().includes(keyword) ||
    String(s.roll).toLowerCase().includes(keyword)
);


    filtered.forEach(s => {
        const row = list.insertRow();

        [s.name, s.roll, s.branch, s.exam, s.date, s.hall, s.seat]
            .forEach(value => {
                row.insertCell().innerText = value ?? "";
            });

        const cell = row.insertCell();
        const btn = document.createElement("button");
        btn.innerText = "Delete";

        btn.onclick = async () => {
            const res = await fetch(API + "/" + s.roll, {
                method: "DELETE"
            });

            if (res.ok) loadStudents();
            else alert("Unable to delete student!");
        };

        cell.appendChild(btn);
    });
}

if (list) loadStudents();
