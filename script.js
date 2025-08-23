// script.js
let students = []; // Start empty; load from CSV

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
            <td>${stu.cumTotal}</td>
            <td>${stu.cumPercent}%</td>
        `;
        tbody.appendChild(tr);
    });
    addClickListeners();
}

function addClickListeners() {
    document.querySelectorAll('.name').forEach(name => {
        name.addEventListener('click', () => {
            const roll = name.dataset.roll;
            const stu = students.find(s => s.roll === roll);
            const tr = name.parentNode;
            toggleDetails(tr, stu);
        });
    });
}

function toggleDetails(tr, stu) {
    let next = tr.nextElementSibling;
    if (next && next.classList.contains('details-row')) {
        next.style.display = next.style.display === 'none' ? '' : 'none';
        return;
    }
    const detailsTr = document.createElement('tr');
    detailsTr.classList.add('details-row');
    const td = document.createElement('td');
    td.colSpan = 5;
    const div = document.createElement('div');
    div.classList.add('details');

    // All previous marks
    let prevMarks = '<h3>All Previous Marks</h3><table><thead><tr><th>Exam</th><th>Chem</th><th>Phy</th><th>Bio</th><th>Math</th><th>Total</th><th>%</th></tr></thead><tbody>';
    stu.exams.forEach(ex => {
        prevMarks += `<tr><td>${ex.exam}</td><td>${ex.scores.chem}</td><td>${ex.scores.phy}</td><td>${ex.scores.bio}</td><td>${ex.scores.math}</td><td>${ex.total}</td><td>${ex.percent}</td></tr>`;
    });
    prevMarks += '</tbody></table>';
    div.innerHTML += prevMarks;

    // Last 3 exams
    const last3 = stu.exams.slice(-3);
    let lastTable = '<h3>Last 3 Exams</h3><table><thead><tr><th>Exam</th><th>Chem</th><th>Phy</th><th>Bio</th><th>Math</th><th>Total</th><th>%</th></tr></thead><tbody>';
    last3.forEach(ex => {
        lastTable += `<tr><td>${ex.exam}</td><td>${ex.scores.chem}</td><td>${ex.scores.phy}</td><td>${ex.scores.bio}</td><td>${ex.scores.math}</td><td>${ex.total}</td><td>${ex.percent}</td></tr>`;
    });
    lastTable += '</tbody></table>';
    div.innerHTML += lastTable;

    // Subject-wise line chart
    div.innerHTML += `<h3>Subject-wise Marks Line Chart</h3><canvas id="chart-${stu.roll}" width="600" height="300"></canvas>`;

    td.appendChild(div);
    detailsTr.appendChild(td);
    tr.after(detailsTr);

    // Create chart
    const ctx = document.getElementById(`chart-${stu.roll}`);
    const examLabels = stu.exams.map(ex => ex.exam);
    const datasets = [
        { label: 'Chemistry', data: stu.exams.map(ex => ex.scores.chem), borderColor: '#f44336', fill: false },
        { label: 'Physics', data: stu.exams.map(ex => ex.scores.phy), borderColor: '#2196f3', fill: false },
        { label: 'Biology', data: stu.exams.map(ex => ex.scores.bio), borderColor: '#4caf50', fill: false },
        { label: 'Maths', data: stu.exams.map(ex => ex.scores.math), borderColor: '#ffeb3b', fill: false }
    ];
    new Chart(ctx, {
        type: 'line',
        data: { labels: examLabels, datasets },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#e0e0e0' } } },
            scales: {
                x: { ticks: { color: '#e0e0e0' }, grid: { color: '#333' } },
                y: { ticks: { color: '#e0e0e0' }, grid: { color: '#333' }, beginAtZero: true }
            }
        }
    });
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
            <td>${stu.subjectTotals[sub]}</td>
        `;
        tbody.appendChild(tr);
    });
}

function showTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.style.display = 'none');
    document.getElementById(tab).style.display = 'block';
}

document.getElementById('search').addEventListener('keyup', function() {
    const val = this.value.toLowerCase();
    const tables = ['rankTable', 'chemTable', 'phyTable', 'bioTable', 'mathTable'];
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

function processCSVData(data) {
    const studentMap = {};
    data.forEach(row => {
        const roll = row.roll.trim();
        const name = row.name.trim();
        if (!studentMap[roll]) {
            studentMap[roll] = { roll, name, exams: [] };
        }
        // Use the last name if multiple, but assume consistent
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
            maxTotal: parseFloat(row.maxTotal) || 400 // Default if missing
        };
        studentMap[roll].exams.push(exam);
    });
    students = Object.values(studentMap);
    // Sort exams chronologically if needed (assume already sorted in CSV)
    students.forEach(stu => {
        stu.exams.sort((a, b) => a.exam.localeCompare(b.exam)); // Simple sort by exam name
        computeCumulatives(stu);
    });
    populateOverall();
    populateSubject('chemTable', 'chem');
    populateSubject('phyTable', 'phy');
    populateSubject('bioTable', 'bio');
    populateSubject('mathTable', 'math');
    showTab('overall');
}

// Initial load (empty or sample; here empty)
processCSVData([]); // To initialize empty tables