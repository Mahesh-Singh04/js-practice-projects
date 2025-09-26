let students = [];

function saveToLocalStorage() {
    localStorage.setItem("studentsData", JSON.stringify(students));
}

function loadFromLocalStorage() {
    let storedData = localStorage.getItem("studentsData");
    if (storedData) {
        students = JSON.parse(storedData);
    }
}

function displayStudents(list) {
    let studentList = document.getElementById("studentList");
    studentList.innerHTML = "";
    list.forEach(student => {
        let li = document.createElement("li");
        li.textContent = `${student.name} - ${student.score}`;
        studentList.appendChild(li);
    });
}

function addStudent() {
    let name = document.getElementById("studentName").value.trim();
    let score = Number(document.getElementById("studentScore").value);

    if (name && score >= 0) {
        students.push({name, score});
        saveToLocalStorage();
        displayStudents(students);

        document.getElementById("studentName").value = "";
        document.getElementById("studentScore").value = "";
        document.getElementById("result").innerHTML = "";
    } else {
        alert("Please enter a valid name and score.");
    }
}

function showPassed() {
    let passed = students.filter(student => student.score >= 50);
    displayStudents(passed);

    let resultList = document.getElementById("result");
    resultList.innerHTML = "<h3>Passed Students:</h3>";

    let ul = document.createElement("ul");
    passed.forEach(student => {
        let li = document.createElement("li");
        li.textContent = `${student.name} (${student.score})`;
        ul.appendChild(li);
    });

    resultList.appendChild(ul);
}

function showTopScorer() {
    if (students.length === 0) return;

    let top = students.reduce((max, student) => student.score > max.score ? student : max, students[0]);
    let resultList = document.getElementById("result");
    resultList.innerHTML = `<h3>🏆 Top Scorer:</h3><p>${top.name} (${top.score})</p>`;
}

function showAverage() {
    if (students.length === 0) return;

    let average = students.reduce((sum, student) => sum + student.score, 0) / students.length;
    let resultList = document.getElementById("result");
    resultList.innerHTML = `<h3>📊 Average Score:</h3><p>${average.toFixed(2)}</p>`;
}

function clearStudents() {
    localStorage.removeItem("studentsData");
    students = [];
    displayStudents(students);
    document.getElementById("result").innerHTML = "";
}

// Load students on page load
loadFromLocalStorage();
displayStudents(students);
