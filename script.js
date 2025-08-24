let students = [];
let currentExpandedRow = null;
let chartInstances = {};

function computeCumulatives(student) {
    let cumObt = 0;
    let cumMax = 0;
    let subjectTotals = { chem: 0, phy: 0, bio: 0, math: 0 };
    student.exams.forEach(ex => {
        cumObt += ex.total;
        cumMax += ex.maxTotal;
        for (let sub in ex.scores) {
            subjectTotals[sub] += ex.scores[sub];
        }
    });
    student.cumTotal = cumObt;
    student.cumMax = cumMax;
    student.cumPercent = cumMax > 0 ? (cumObt / cumMax * 100).toFixed(2) : 0;
    student.subjectTotals = subjectTotals;
    student.examsAttempted = student.exams.length;

    const averages = {};
    for (let sub in subjectTotals) {
        averages[sub] = student.examsAttempted > 0 ? (subjectTotals[sub] / student.examsAttempted).toFixed(2) : 0;
    }
    const subjects = ['chem', 'phy', 'bio', 'math'];
    student.strongSubject = subjects.reduce((a, b) => averages[a] > averages[b] ? a : b, subjects[0]);
    student.weakSubject = subjects.reduce((a, b) => averages[a] < averages[b] ? a : b, subjects[0]);
    student.subjectAverages = averages;
}

function populateOverall() {
    const tbody = document.querySelector('#rankTable tbody');
    tbody.innerHTML = '';
    const sorted = [...students].sort((a, b) => b.cumTotal - a.cumTotal);
    sorted.forEach((stu, i) => {
        const rank = i + 1;
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
        const last3Exams = stu.exams.slice(-3);
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
    }).filter(stu => stu.last3ExamsAttempted > 0);
    const sorted = last3Students.sort((a, b) => b.last3Total - a.last3Total);
    sorted.forEach((stu, i) => {
        const rank = i + 1;
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
    const sorted = [...students].sort((a, b) => b.subjectTotals[sub] - a.subjectTotals[sub]);
    sorted.forEach((stu, i) => {
        const rank = i + 1;
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
    const totalExams = [...new Set(students.flatMap(stu => stu.exams.map(ex => ex.exam)))].length;
    const totalStudents = students.length;
    document.querySelector('#totalExams span').textContent = totalExams;
    document.querySelector('#totalStudents span').textContent = totalStudents;

    const examCounts = {};
    students.forEach(stu => {
        stu.exams.forEach(ex => {
            examCounts[ex.exam] = (examCounts[ex.exam] || 0) + 1;
        });
    });
    const examTbody = document.querySelector('#examStatsTable tbody');
    examTbody.innerHTML = '';
    Object.entries(examCounts).forEach(([exam, count]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${exam}</td><td>${count}</td>`;
        examTbody.appendChild(tr);
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

    const overallRank = [...students].sort((a, b) => b.cumTotal - a.cumTotal).findIndex(s => s.roll === stu.roll) + 1;
    const last3Rank = [...students.map(s => {
        const last3Exams = s.exams.slice(-3);
        let total = 0;
        let maxTotal = 0;
        last3Exams.forEach(ex => { total += ex.total; maxTotal += ex.maxTotal; });
        return { ...s, last3Total: total };
    })].sort((a, b) => b.last3Total - a.last3Total).findIndex(s => s.roll === stu.roll) + 1;

    let content = `<h3>${stu.name} (ROLL: ${stu.roll})</h3>`;
    content += `<p>OVERALL RANK: ${overallRank}</p>`;
    content += `<p>TOTAL SCORE: ${stu.cumTotal}</p>`;
    content += `<p>PERCENTAGE: ${stu.cumPercent}%</p>`;
    content += `<p>EXAMS ATTEMPTED: ${stu.examsAttempted}</p>`;
    const subjectNames = { chem: 'CHEMISTRY', phy: 'PHYSICS', bio: 'BIOLOGY', math: 'MATHS' };
    content += `<p><strong>STRONGEST SUBJECT:</strong> ${subjectNames[stu.strongSubject]} (${stu.subjectAverages[stu.strongSubject]})</p>`;
    content += `<p><strong>WEAKEST SUBJECT:</strong> ${subjectNames[stu.weakSubject]} (${stu.subjectAverages[stu.weakSubject]})</p>`;
    content += `<p>LAST 3 EXAMS RANK: ${last3Rank}</p>`;

    content += '<h3>ALL PREVIOUS MARKS</h3><table><thead><tr><th>EXAM</th><th>CHEM</th><th>PHY</th><th>BIO</th><th>MATH</th><th>TOTAL</th><th>%</th></tr></thead><tbody>';
    stu.exams.forEach(ex => {
        content += `<tr><td>${ex.exam}</td><td>${ex.scores.chem}</td><td>${ex.scores.phy}</td><td>${ex.scores.bio}</td><td>${ex.scores.math}</td><td>${ex.total}</td><td>${ex.percent}</td></tr>`;
    });
    content += '</tbody></table>';

    const last3 = stu.exams.slice(-3);
    content += '<h3>LAST 3 EXAMS</h3><table><thead><tr><th>EXAM</th><th>CHEM</th><th>PHY</th><th>BIO</th><th>MATH</th><th>TOTAL</th><th>%</th></tr></thead><tbody>';
    last3.forEach(ex => {
        content += `<tr><td>${ex.exam}</td><td>${ex.scores.chem}</td><td>${ex.scores.phy}</td><td>${ex.scores.bio}</td><td>${ex.scores.math}</td><td>${ex.total}</td><td>${ex.percent}</td></tr>`;
    });
    content += '</tbody></table>';

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
        const overallRank = [...students].sort((a, b) => b.cumTotal - a.cumTotal).findIndex(s => s.roll === stu.roll) + 1;
        const last3Rank = [...students.map(s => {
            const last3Exams = s.exams.slice(-3);
            let total = 0;
            let maxTotal = 0;
            last3Exams.forEach(ex => { total += ex.total; maxTotal += ex.maxTotal; });
            return { ...s, last3Total: total };
        })].sort((a, b) => b.last3Total - a.last3Total).findIndex(s => s.roll === stu.roll) + 1;
        let content = `<h3>${stu.name} (ROLL: ${stu.roll})</h3>`;
        content += `<p>OVERALL RANK: ${overallRank}</p>`;
        content += `<p>TOTAL SCORE: ${stu.cumTotal}</p>`;
        content += `<p>PERCENTAGE: ${stu.cumPercent}%</p>`;
        content += `<p>EXAMS ATTEMPTED: ${stu.examsAttempted}</p>`;
        const subjectNames = { chem: 'CHEMISTRY', phy: 'PHYSICS', bio: 'BIOLOGY', math: 'MATHS' };
        content += `<p><strong>STRONGEST SUBJECT:</strong> ${subjectNames[stu.strongSubject]} (${stu.subjectAverages[stu.strongSubject]})</p>`;
        content += `<p><strong>WEAKEST SUBJECT:</strong> ${subjectNames[stu.weakSubject]} (${stu.subjectAverages[stu.weakSubject]})</p>`;
        content += `<p>LAST 3 EXAMS RANK: ${last3Rank}</p>`;

        content += '<h3>ALL PREVIOUS MARKS</h3><table><thead><tr><th>EXAM</th><th>CHEM</th><th>PHY</th><th>BIO</th><th>MATH</th><th>TOTAL</th><th>%</th></tr></thead><tbody>';
        stu.exams.forEach(ex => {
            content += `<tr><td>${ex.exam}</td><td>${ex.scores.chem}</td><td>${ex.scores.phy}</td><td>${ex.scores.bio}</td><td>${ex.scores.math}</td><td>${ex.total}</td><td>${ex.percent}</td></tr>`;
        });
        content += '</tbody></table>';

        const last3 = stu.exams.slice(-3);
        content += '<h3>LAST 3 EXAMS</h3><table><thead><tr><th>EXAM</th><th>CHEM</th><th>PHY</th><th>BIO</th><th>MATH</th><th>TOTAL</th><th>%</th></tr></thead><tbody>';
        last3.forEach(ex => {
            content += `<tr><td>${ex.exam}</td><td>${ex.scores.chem}</td><td>${ex.scores.phy}</td><td>${ex.scores.bio}</td><td>${ex.scores.math}</td><td>${ex.total}</td><td>${ex.percent}</td></tr>`;
        });
        content += '</tbody></table>';

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
    const examLabels = stu.exams.map(ex => ex.exam);
    let datasets = [];
    let yAxisMax = mode === 'total' ? 400 : 100;

    if (mode === 'total') {
        datasets = [{
            label: 'TOTAL MARKS',
            data: stu.exams.map(ex => ex.total),
            borderColor: '#ffeb3b',
            fill: false
        }];
    } else {
        datasets = [
            { label: 'CHEMISTRY', data: stu.exams.map(ex => ex.scores.chem), borderColor: '#f44336', fill: false },
            { label: 'PHYSICS', data: stu.exams.map(ex => ex.scores.phy), borderColor: '#2196f3', fill: false },
            { label: 'BIOLOGY', data: stu.exams.map(ex => ex.scores.bio), borderColor: '#4caf50', fill: false },
            { label: 'MATHS', data: stu.exams.map(ex => ex.scores.math), borderColor: '#ffeb3b', fill: false }
        ];
    }

    const tooltipFormat = {
        title: (tooltipItems) => `Exam: ${tooltipItems[0].label}`,
        label: (context) => {
            const exam = stu.exams[context.dataIndex];
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
        const rows = document.querySelector(`#${tableId} tbody`)?.querySelectorAll('tr:not(.details-row)');
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
            maxTotal: parseFloat(row.maxTotal) || 400
        };
        studentMap[roll].exams.push(exam);
    });
    students = Object.values(studentMap);
    students.forEach(stu => {
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
