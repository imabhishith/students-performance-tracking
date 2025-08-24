let students = [];
let currentExpandedRow = null;
let currentExpandedExam = null; // Track the currently expanded exam

function computeCumulatives(student) {
    let cumObt = 0;
    let cumMax = 0;
    let subjectTotals = { chem: 0, phy: 0, bio: 0, math: 0 };
    student.exams.forEach(ex => {
        if (ex.maxTotal > 0) {
            cumObt += ex.total;
            cumMax += ex.maxTotal;
            for (let sub in ex.scores) {
                subjectTotals[sub] += ex.scores[sub];
            }
        }
    });
    student.cumTotal = cumObt;
    student.cumMax = cumMax;
    student.cumPercent = cumMax > 0 ? (cumObt / cumMax * 100).toFixed(2) : 0;
    student.subjectTotals = subjectTotals;
    student.examsAttempted = student.exams.filter(ex => ex.maxTotal > 0).length;

    const averages = {};
    for (let sub in subjectTotals) {
        averages[sub] = student.examsAttempted > 0 ? (subjectTotals[sub] / student.examsAttempted).toFixed(2) : 0;
    }
    const subjects = ['chem', 'phy', 'bio', 'math'];
    student.strongSubject = student.examsAttempted > 0 ? subjects.reduce((a, b) => averages[a] > averages[b] ? a : b, subjects[0]) : 'N/A';
    student.weakSubject = student.examsAttempted > 0 ? subjects.reduce((a, b) => averages[a] < averages[b] ? a : b, subjects[0]) : 'N/A';
    student.subjectAverages = averages;
}

function populateOverall() {
    const tbody = document.querySelector('#rankTable tbody');
    tbody.innerHTML = '';
    const sorted = [...students].sort((a, b) => b.cumTotal - a.cumTotal || a.roll.localeCompare(b.roll));
    sorted.forEach((stu, i) => {
        const rank = stu.cumTotal > 0 ? i + 1 : '-';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${rank}</td>
            <td>${stu.roll}</td>
            <td class="name" data-roll="${stu.roll}">${stu.name}</td>
            <td>${stu.examsAttempted}</td>
            <td>${stu.cumTotal}</td>
            <td>${stu.cumPercent}%</td>
        `;
        tbody.appendChild(tr);
    });
    addClickListeners();
}

function populateLast3() {
    const tbody = document.querySelector('#last3Table tbody');
    tbody.innerHTML = '';
    const last3Students = students.map(stu => {
        const last3Exams = stu.exams.filter(ex => ex.maxTotal > 0).slice(-3);
        let total = 0;
        let maxTotal = 0;
        last3Exams.forEach(ex => {
            total += ex.total;
            maxTotal += ex.maxTotal;
        });
        return {
            ...stu,
            last3Total: total,
            last3Percent: maxTotal > 0 ? (total / maxTotal * 100).toFixed(2) : 0,
            last3ExamsAttempted: last3Exams.length
        };
    });
    const sorted = last3Students.sort((a, b) => b.last3Total - a.last3Total || a.roll.localeCompare(b.roll));
    sorted.forEach((stu, i) => {
        const rank = stu.last3Total > 0 ? i + 1 : '-';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${rank}</td>
            <td>${stu.roll}</td>
            <td class="name" data-roll="${stu.roll}">${stu.name}</td>
            <td>${stu.last3ExamsAttempted}</td>
            <td>${stu.last3Total}</td>
            <td>${stu.last3Percent}%</td>
        `;
        tbody.appendChild(tr);
    });
    addClickListeners();
}

function populateSubject(tableId, sub) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = '';
    const sorted = [...students].sort((a, b) => b.subjectTotals[sub] - a.subjectTotals[sub] || a.roll.localeCompare(b.roll));
    sorted.forEach((stu, i) => {
        const rank = stu.subjectTotals[sub] > 0 ? i + 1 : '-';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${rank}</td>
            <td>${stu.roll}</td>
            <td>${stu.name}</td>
            <td>${stu.examsAttempted}</td>
            <td>${stu.subjectTotals[sub]}</td>
        `;
        tbody.appendChild(tr);
    });
}

function populateStats() {
    const totalExams = [...new Set(students.flatMap(stu => stu.exams.filter(ex => ex.maxTotal > 0).map(ex => ex.exam)))].length;
    const totalStudents = students.length;
    document.querySelector('#totalExams span').textContent = totalExams;
    document.querySelector('#totalStudents span').textContent = totalStudents;

    const examCounts = {};
    students.forEach(stu => {
        stu.exams.forEach(ex => {
            if (ex.maxTotal > 0) {
                examCounts[ex.exam] = (examCounts[ex.exam] || 0) + 1;
            }
        });
    });
    const examTbody = document.querySelector('#examStatsTable tbody');
    examTbody.innerHTML = '';
    Object.entries(examCounts).sort().forEach(([exam, count]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="exam-name" data-exam="${exam}">${exam}</td>
            <td>${count}</td>
        `;
        examTbody.appendChild(tr);
    });

    // Add click listeners for exam names
    document.querySelectorAll('.exam-name').forEach(name => {
        name.addEventListener('click', handleExamClick);
    });

    const studentTbody = document.querySelector('#studentDetailsTable tbody');
    studentTbody.innerHTML = '';
    const sortedStudents = [...students].sort((a, b) => a.roll.localeCompare(b.roll));
    sortedStudents.forEach((stu, i) => {
        const serial = i + 1;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${serial}</td>
            <td>${stu.roll}</td>
            <td>${stu.name}</td>
        `;
        studentTbody.appendChild(tr);
    });
}

function handleExamClick(event) {
    const exam = event.target.dataset.exam;
    const tr = event.target.parentNode;
    if (currentExpandedExam && currentExpandedExam !== exam) {
        const prevRow = document.querySelector(`tr[data-exam-row="${currentExpandedExam}"]`);
        if (prevRow) {
            prevRow.style.display = 'none';
        }
    }
    toggleExamDetails(tr, exam);
    currentExpandedExam = tr.nextElementSibling && tr.nextElementSibling.classList.contains('exam-details-row') ? exam : null;
}

function toggleExamDetails(tr, exam) {
    let next = tr.nextElementSibling;
    if (next && next.classList.contains('exam-details-row')) {
        next.style.display = next.style.display === 'none' ? '' : 'none';
        return;
    }
    const detailsTr = document.createElement('tr');
    detailsTr.classList.add('exam-details-row');
    detailsTr.dataset.examRow = exam;
    const td = document.createElement('td');
    td.colSpan = 2;
    const div = document.createElement('div');
    div.classList.add('details');

    // Generate ranklist for the specific exam
    const examStudents = students
        .filter(stu => stu.exams.some(ex => ex.exam === exam && ex.maxTotal > 0))
        .map(stu => {
            const examData = stu.exams.find(ex => ex.exam === exam);
            return {
                ...stu,
                examTotal: examData.total,
                examPercent: examData.percent
            };
        });
    const sorted = examStudents.sort((a, b) => b.examTotal - a.examTotal || a.roll.localeCompare(b.roll));

    let content = `<h3>RANKLIST FOR ${exam}</h3>`;
    content += `
        <table class="exam-ranklist">
            <thead>
                <tr>
                    <th>RANK</th>
                    <th>ROLL NO</th>
                    <th>NAME</th>
                    <th>CHEM</th>
                    <th>PHY</th>
                    <th>BIO</th>
                    <th>MATH</th>
                    <th>TOTAL</th>
                    <th>%</th>
                </tr>
            </thead>
            <tbody>
    `;
    sorted.forEach((stu, i) => {
        const rank = stu.examTotal > 0 ? i + 1 : '-';
        const examData = stu.exams.find(ex => ex.exam === exam);
        content += `
            <tr>
                <td>${rank}</td>
                <td>${stu.roll}</td>
                <td>${stu.name}</td>
                <td>${examData.scores.chem}</td>
                <td>${examData.scores.phy}</td>
                <td>${examData.scores.bio}</td>
                <td>${examData.scores.math}</td>
                <td>${stu.examTotal}</td>
                <td>${stu.examPercent}%</td>
            </tr>
        `;
    });
    content += '</tbody></table>';

    div.innerHTML = content;
    td.appendChild(div);
    detailsTr.appendChild(td);
    tr.after(detailsTr);
}

function addClickListeners() {
    document.querySelectorAll('.name').forEach(name => {
        name.removeEventListener('click', handleNameClick);
        name.addEventListener('click', handleNameClick);
    });
}

function handleNameClick(event) {
    const roll = event.target.dataset.roll;
    const stu = students.find(s => s.roll === roll);
    const tr = event.target.parentNode;
    if (currentExpandedRow && currentExpandedRow !== tr.nextElementSibling) {
        currentExpandedRow.style.display = 'none';
    }
    toggleDetails(tr, stu);
    currentExpandedRow = tr.nextElementSibling && tr.nextElementSibling.classList.contains('details-row') ? tr.nextElementSibling : null;
}

function toggleDetails(tr, stu) {
    let next = tr.nextElementSibling;
    if (next && next.classList.contains('details-row')) {
        next.style.display = next.style.display === 'none' ? '' : 'none';
        if (next.style.display === 'none' && chartInstances[stu.roll]) {
            chartInstances[stu.roll].destroy();
            delete chartInstances[stu.roll];
        }
        return;
    }
    const detailsTr = document.createElement('tr');
    detailsTr.classList.add('details-row');
    const td = document.createElement('td');
    td.colSpan = 6;
    const div = document.createElement('div');
    div.classList.add('details');

    const overallRank = stu.cumTotal > 0 ? [...students].sort((a, b) => b.cumTotal - a.cumTotal || a.roll.localeCompare(b.roll)).findIndex(s => s.roll === stu.roll) + 1 : 'N/A';
    const last3Rank = [...students.map(s => {
        const last3Exams = s.exams.filter(ex => ex.maxTotal > 0).slice(-3);
        let total = 0;
        let maxTotal = 0;
        last3Exams.forEach(ex => { total += ex.total; maxTotal += ex.maxTotal; });
        return { ...s, last3Total: total };
    })].sort((a, b) => b.last3Total - a.last3Total || a.roll.localeCompare(b.roll)).findIndex(s => s.roll === stu.roll) + 1;
    const last3RankDisplay = stu.examsAttempted > 0 ? last3Rank : 'N/A';

    let content = `<h3>${stu.name} (ROLL: ${stu.roll})</h3>`;
    content += `<p>OVERALL RANK: ${overallRank}</p>`;
    content += `<p>TOTAL SCORE: ${stu.cumTotal}</p>`;
    content += `<p>PERCENTAGE: ${stu.cumPercent}%</p>`;
    content += `<p>EXAMS ATTEMPTED: ${stu.examsAttempted}</p>`;
    const subjectNames = { chem: 'CHEMISTRY', phy: 'PHYSICS', bio: 'BIOLOGY', math: 'MATHS' };
    content += `<p><strong>STRONGEST SUBJECT:</strong> ${stu.strongSubject === 'N/A' ? 'N/A' : `${subjectNames[stu.strongSubject]} (${stu.subjectAverages[stu.strongSubject]})`}</p>`;
    content += `<p><strong>WEAKEST SUBJECT:</strong> ${stu.weakSubject === 'N/A' ? 'N/A' : `${subjectNames[stu.weakSubject]} (${stu.subjectAverages[stu.weakSubject]})`}</p>`;
    content += `<p>LAST 3 EXAMS RANK: ${last3RankDisplay}</p>`;

    const validExams = stu.exams.filter(ex => ex.maxTotal > 0);
    content += '<h3>ALL PREVIOUS MARKS</h3>';
    if (validExams.length > 0) {
        content += '<table><thead><tr><th>EXAM</th><th>CHEM</th><th>PHY</th><th>BIO</th><th>MATH</th><th>TOTAL</th><th>%</th></tr></thead><tbody>';
        validExams.forEach(ex => {
            content += `<tr><td>${ex.exam}</td><td>${ex.scores.chem}</td><td>${ex.scores.phy}</td><td>${ex.scores.bio}</td><td>${ex.scores.math}</td><td>${ex.total}</td><td>${ex.percent}</td></tr>`;
        });
        content += '</tbody></table>';
    } else {
        content += '<p>NO EXAMS ATTENDED.</p>';
    }

    const last3 = validExams.slice(-3);
    content += '<h3>LAST 3 EXAMS</h3>';
    if (last3.length > 0) {
        content += '<table><thead><tr><th>EXAM</th><th>CHEM</th><th>PHY</th><th>BIO</th><th>MATH</th><th>TOTAL</th><th>%</th></tr></thead><tbody>';
        last3.forEach(ex => {
            content += `<tr><td>${ex.exam}</td><td>${ex.scores.chem}</td><td>${ex.scores.phy}</td><td>${ex.scores.bio}</td><td>${ex.scores.math}</td><td>${ex.total}</td><td>${ex.percent}</td></tr>`;
        });
        content += '</tbody></table>';
    } else {
        content += '<p>NO EXAMS ATTENDED IN LAST 3.</p>';
    }

    content += `<h3>EXAM MARKS LINE CHART</h3>`;
    content += `<div class="chart-container"><button id="chartToggle-${stu.roll}">SHOW SUBJECT-WISE MARKS</button><canvas id="chart-${stu.roll}"></canvas></div>`;
    div.innerHTML = content;

    td.appendChild(div);
    detailsTr.appendChild(td);
    tr.after(detailsTr);

    createChart(stu, `chart-${stu.roll}`, 'total');
    document.getElementById(`chartToggle-${stu.roll}`).addEventListener('click', function() {
        const mode = this.textContent === 'SHOW SUBJECT-WISE MARKS' ? 'subjects' : 'total';
        this.textContent = mode === 'total' ? 'SHOW SUBJECT-WISE MARKS' : 'SHOW TOTAL MARKS';
        createChart(stu, `chart-${stu.roll}`, mode);
    });
}

function searchStudent() {
    const val = document.getElementById('search').value.toLowerCase();
    const searchDetails = document.getElementById('searchDetails');
    searchDetails.innerHTML = '';
    const stu = students.find(s => s.roll.toLowerCase() === val || s.name.split(' ')[0].toLowerCase() === val);
    if (stu) {
        showTab('searchResult');
        const overallRank = stu.cumTotal > 0 ? [...students].sort((a, b) => b.cumTotal - a.cumTotal || a.roll.localeCompare(b.roll)).findIndex(s => s.roll === stu.roll) + 1 : 'N/A';
        const last3Rank = [...students.map(s => {
            const last3Exams = s.exams.filter(ex => ex.maxTotal > 0).slice(-3);
            let total = 0;
            let maxTotal = 0;
            last3Exams.forEach(ex => { total += ex.total; maxTotal += ex.maxTotal; });
            return { ...s, last3Total: total };
        })].sort((a, b) => b.last3Total - a.last3Total || a.roll.localeCompare(b.roll)).findIndex(s => s.roll === stu.roll) + 1;
        const last3RankDisplay = stu.examsAttempted > 0 ? last3Rank : 'N/A';

        let content = `<h3>${stu.name} (ROLL: ${stu.roll})</h3>`;
        content += `<p>OVERALL RANK: ${overallRank}</p>`;
        content += `<p>TOTAL SCORE: ${stu.cumTotal}</p>`;
        content += `<p>PERCENTAGE: ${stu.cumPercent}%</p>`;
        content += `<p>EXAMS ATTEMPTED: ${stu.examsAttempted}</p>`;
        const subjectNames = { chem: 'CHEMISTRY', phy: 'PHYSICS', bio: 'BIOLOGY', math: 'MATHS' };
        content += `<p><strong>STRONGEST SUBJECT:</strong> ${stu.strongSubject === 'N/A' ? 'N/A' : `${subjectNames[stu.strongSubject]} (${stu.subjectAverages[stu.strongSubject]})`}</p>`;
        content += `<p><strong>WEAKEST SUBJECT:</strong> ${stu.weakSubject === 'N/A' ? 'N/A' : `${subjectNames[stu.weakSubject]} (${stu.subjectAverages[stu.weakSubject]})`}</p>`;
        content += `<p>LAST 3 EXAMS RANK: ${last3RankDisplay}</p>`;

        const validExams = stu.exams.filter(ex => ex.maxTotal > 0);
        content += '<h3>ALL PREVIOUS MARKS</h3>';
        if (validExams.length > 0) {
            content += '<table><thead><tr><th>EXAM</th><th>CHEM</th><th>PHY</th><th>BIO</th><th>MATH</th><th>TOTAL</th><th>%</th></tr></thead><tbody>';
            validExams.forEach(ex => {
                content += `<tr><td>${ex.exam}</td><td>${ex.scores.chem}</td><td>${ex.scores.phy}</td><td>${ex.scores.bio}</td><td>${ex.scores.math}</td><td>${ex.total}</td><td>${ex.percent}</td></tr>`;
            });
            content += '</tbody></table>';
        } else {
            content += '<p>NO EXAMS ATTENDED.</p>';
        }

        const last3 = validExams.slice(-3);
        content += '<h3>LAST 3 EXAMS</h3>';
        if (last3.length > 0) {
            content += '<table><thead><tr><th>EXAM</th><th>CHEM</th><th>PHY</th><th>BIO</th><th>MATH</th><th>TOTAL</th><th>%</th></tr></thead><tbody>';
            last3.forEach(ex => {
                content += `<tr><td>${ex.exam}</td><td>${ex.scores.chem}</td><td>${ex.scores.phy}</td><td>${ex.scores.bio}</td><td>${ex.scores.math}</td><td>${ex.total}</td><td>${ex.percent}</td></tr>`;
            });
            content += '</tbody></table>';
        } else {
            content += '<p>NO EXAMS ATTENDED IN LAST 3.</p>';
        }

        content += `<h3>EXAM MARKS LINE CHART</h3>`;
        content += `<div class="chart-container"><button id="chartToggle-${stu.roll}">SHOW SUBJECT-WISE MARKS</button><canvas id="searchChart-${stu.roll}"></canvas></div>`;
        searchDetails.innerHTML = content;

        createChart(stu, `searchChart-${stu.roll}`, 'total');
        document.getElementById(`chartToggle-${stu.roll}`).addEventListener('click', function() {
            const mode = this.textContent === 'SHOW SUBJECT-WISE MARKS' ? 'subjects' : 'total';
            this.textContent = mode === 'total' ? 'SHOW SUBJECT-WISE MARKS' : 'SHOW TOTAL MARKS';
            createChart(stu, `searchChart-${stu.roll}`, mode);
        });
    } else {
        searchDetails.innerHTML = '<p>NO STUDENT FOUND.</p>';
        showTab('searchResult');
    }
}

function createChart(stu, canvasId, mode) {
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    const ctx = document.getElementById(canvasId);
    const validExams = stu.exams.filter(ex => ex.maxTotal > 0);
    const examLabels = validExams.map(ex => ex.exam);
    let datasets = [];
    let yAxisMax = mode === 'total' ? 400 : 100;

    if (validExams.length === 0) {
        datasets = [{
            label: 'NO DATA',
            data: [],
            borderColor: '#ffeb3b',
            fill: false
        }];
    } else if (mode === 'total') {
        datasets = [{
            label: 'TOTAL MARKS',
            data: validExams.map(ex => ex.total),
            borderColor: '#ffeb3b',
            fill: false
        }];
    } else {
        datasets = [
            { label: 'CHEMISTRY', data: validExams.map(ex => ex.scores.chem), borderColor: '#f44336', fill: false },
            { label: 'PHYSICS', data: validExams.map(ex => ex.scores.phy), borderColor: '#2196f3', fill: false },
            { label: 'BIOLOGY', data: validExams.map(ex => ex.scores.bio), borderColor: '#4caf50', fill: false },
            { label: 'MATHS', data: validExams.map(ex => ex.scores.math), borderColor: '#ffeb3b', fill: false }
        ];
    }

    const tooltipFormat = {
        title: (tooltipItems) => validExams.length > 0 ? `Exam: ${tooltipItems[0].label}` : 'No Data Available',
        label: (context) => {
            if (validExams.length === 0) return ['No exams attended.'];
            const exam = validExams[context.dataIndex];
            return [
                `Total: ${exam.total}`,
                `Chemistry: ${exam.scores.chem}`,
                `Physics: ${exam.scores.phy}`,
                `Biology: ${exam.scores.bio}`,
                `Maths: ${exam.scores.math}`
            ];
        }
    };

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'line',
        data: { labels: examLabels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    labels: { 
                        color: '#e0e0e0',
                        font: { size: 10 }
                    } 
                },
                tooltip: tooltipFormat
            },
            scales: {
                x: { 
                    ticks: { 
                        color: '#e0e0e0',
                        font: { size: 10 },
                        maxRotation: 45,
                        minRotation: 45
                    }, 
                    grid: { color: '#333' } 
                },
                y: { 
                    ticks: { 
                        color: '#e0e0e0',
                        font: { size: 10 },
                        stepSize: mode === 'total' ? 50 : 20
                    }, 
                    grid: { color: '#333' },
                    beginAtZero: true,
                    max: yAxisMax
                }
            },
            elements: {
                point: { radius: 3 },
                line: { borderWidth: 2 }
            }
        }
    });
}

function showTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.style.display = 'none');
    document.getElementById(tab).style.display = 'block';
}

document.getElementById('searchButton').addEventListener('click', searchStudent);
document.getElementById('search').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchStudent();
});

document.getElementById('search').addEventListener('keyup', function() {
    const val = this.value.toLowerCase();
    const tables = ['rankTable', 'chemTable', 'phyTable', 'bioTable', 'mathTable', 'last3Table', 'studentDetailsTable'];
    tables.forEach(tableId => {
        const rows = document.querySelector(`#${tableId} tbody`)?.querySelectorAll('tr:not(.details-row):not(.exam-details-row)');
        if (rows) {
            rows.forEach(row => {
                const rollTd = row.querySelector('td:nth-child(2)');
                const nameTd = row.querySelector('td:nth-child(3)');
                if (rollTd && nameTd) {
                    const roll = rollTd.textContent.toLowerCase();
                    const firstName = nameTd.textContent.split(' ')[0].toLowerCase();
                    if (roll.includes(val) || firstName.includes(val)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                }
            });
        }
    });
});

document.getElementById('dataFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                processCSVData(results.data);
            }
        });
    }
});

document.getElementById('examDetailsBtn').addEventListener('click', function() {
    const details = document.getElementById('examDetails');
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('studentDetailsBtn').addEventListener('click', function() {
    const details = document.getElementById('studentDetails');
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
});

function processCSVData(data) {
    const studentMap = {};
    data.forEach(row => {
        const roll = row.roll.trim();
        const name = row.name.trim();
        if (!studentMap[roll]) {
            studentMap[roll] = { roll, name, exams: [] };
        }
        studentMap[roll].name = name;
        const maxTotal = parseFloat(row.maxTotal) || 0;
        const exam = {
            exam: row.exam.trim(),
            scores: {
                chem: parseFloat(row.chem) || 0,
                phy: parseFloat(row.phy) || 0,
                bio: parseFloat(row.bio) || 0,
                math: parseFloat(row.math) || 0
            },
            total: parseFloat(row.total) || 0,
            percent: parseFloat(row.percent) || 0,
            maxTotal: maxTotal
        };
        studentMap[roll].exams.push(exam);
    });
    students = Object.values(studentMap);
    students.forEach(stu => {
        stu.exams = stu.exams.filter(ex => ex.maxTotal > 0);
        stu.exams.sort((a, b) => a.exam.localeCompare(b.exam));
        computeCumulatives(stu);
    });
    populateOverall();
    populateLast3();
    populateSubject('chemTable', 'chem');
    populateSubject('phyTable', 'phy');
    populateSubject('bioTable', 'bio');
    populateSubject('mathTable', 'math');
    populateStats();
    showTab('overall');
}

processCSVData([]);
