// Updated script.js with fixes, cleanups, and new features
let students = [];
let currentExpandedRow = null;
let currentExpandedExam = null;
let chartInstances = {};

const subjectNames = { chem: 'CHEMISTRY', phy: 'PHYSICS', bio: 'BIOLOGY', math: 'MATHS' };

// Compute cumulatives for a student (percentages, strong/weak subjects)
function computeCumulatives(student) {
    let cumObt = 0;
    let cumMax = 0;
    let subjectTotals = { chem: 0, phy: 0, bio: 0, math: 0 };
    let subjectMaxTotals = { chem: 0, phy: 0, bio: 0, math: 0 };

    student.exams.forEach(ex => {
        if (ex.maxTotal > 0) {
            cumObt += ex.total;
            cumMax += ex.maxTotal;
            for (let sub in ex.scores) {
                subjectTotals[sub] += ex.scores[sub];
                subjectMaxTotals[sub] += ex.maxScores[sub] || 0;
            }
        }
    });

    student.cumTotal = cumObt;
    student.cumMax = cumMax;
    student.cumPercent = cumMax > 0 ? (cumObt / cumMax * 100).toFixed(2) : 0;
    student.subjectTotals = subjectTotals;
    student.subjectMaxTotals = subjectMaxTotals;
    student.examsAttempted = student.exams.filter(ex => ex.maxTotal > 0).length;

    // Average percentage per subject
    const averages = {};
    for (let sub in subjectTotals) {
        averages[sub] = subjectMaxTotals[sub] > 0 ? ((subjectTotals[sub] / subjectMaxTotals[sub]) * 100).toFixed(2) : 0;
    }
    student.subjectAverages = averages;

    // Determine strong/weak subjects
    const subjects = ['chem', 'phy', 'bio', 'math'];
    if (student.examsAttempted > 0) {
        let maxAvg = -Infinity, minAvg = Infinity;
        let strongSubjects = [], weakSubjects = [];
        subjects.forEach(sub => {
            const avg = parseFloat(averages[sub]);
            if (avg > maxAvg) { maxAvg = avg; strongSubjects = [sub]; } else if (avg === maxAvg) { strongSubjects.push(sub); }
            if (avg < minAvg) { minAvg = avg; weakSubjects = [sub]; } else if (avg === minAvg) { weakSubjects.push(sub); }
        });
        student.strongSubject = strongSubjects.length > 0 ? strongSubjects : ['N/A'];
        student.weakSubject = weakSubjects.length > 0 ? weakSubjects : ['N/A'];
    } else {
        student.strongSubject = ['N/A'];
        student.weakSubject = ['N/A'];
    }
}

document.getElementById('logoutBtn').addEventListener('click', function() {
    // Clear any session storage or localStorage if used for login state
    sessionStorage.clear();
    localStorage.removeItem('loggedInUser'); // if used
    // Redirect to student-login.html
    window.location.href = 'student-login.html';
  });
  
// Populate overall ranklist
function populateOverall() {
    const tbody = document.querySelector('#rankTable tbody');
    tbody.innerHTML = '';
    const sorted = [...students].sort((a, b) => b.cumTotal - a.cumTotal || a.roll.localeCompare(b.roll));
    sorted.forEach((stu, i) => {
        const rank = stu.cumTotal > 0 ? i + 1 : '-';
        const tr = document.createElement('tr');
        if (rank >= 1 && rank <= 3) tr.classList.add('top-performer');
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

// Populate last 3 exams ranklist (disable clickable names)
function populateLast3() {
    const tbody = document.querySelector('#last3Table tbody');
    tbody.innerHTML = '';
    const last3Students = students.map(stu => {
        const last3Exams = stu.exams.filter(ex => ex.maxTotal > 0).slice(-3);
        let total = 0, maxTotal = 0;
        last3Exams.forEach(ex => { total += ex.total; maxTotal += ex.maxTotal; });
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
        if (rank >= 1 && rank <= 3) tr.classList.add('top-performer');
        tr.innerHTML = `
            <td>${rank}</td>
            <td>${stu.roll}</td>
            <td>${stu.name}</td>
            <td>${stu.last3ExamsAttempted}</td>
            <td>${stu.last3Total}</td>
            <td>${stu.last3Percent}%</td>
        `;
        tbody.appendChild(tr);
    });
    // No addClickListeners() call here to disable clickable names
}

// Populate subject ranklist
function populateSubject(tableId, sub) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = '';
    
    const sorted = [...students]
        .filter(s => s.subjectTotals[sub] > 0)
        .sort((a, b) => b.subjectTotals[sub] - a.subjectTotals[sub] || a.roll.localeCompare(b.roll));
    
    sorted.forEach((stu, i) => {
        const rank = i + 1;
        const tr = document.createElement('tr');
        if (rank >= 1 && rank <= 3) tr.classList.add('top-performer');
        
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

// Populate overall stats and details tables
function populateStats() {
    // Total exams and students
    const allExams = [...new Set(students.flatMap(stu => stu.exams.filter(ex => ex.maxTotal > 0).map(ex => ex.exam)))];
    const totalExams = allExams.length;
    const totalStudents = students.length;
    document.querySelector('#totalExams').textContent = `TOTAL EXAMS CONDUCTED: ${totalExams}`;
    document.querySelector('#totalStudents').textContent = `TOTAL STUDENTS: ${totalStudents}`;

    // Class average % per subject and most difficult (lowest avg %)
    const subjectAverages = { chem: 0, phy: 0, bio: 0, math: 0 };
    students.forEach(stu => {
        for (let sub in stu.subjectAverages) {
            subjectAverages[sub] += parseFloat(stu.subjectAverages[sub]);
        }
    });
    let mostDifficult = 'N/A';
    let minAvg = Infinity;
    for (let sub in subjectAverages) {
        subjectAverages[sub] = totalStudents > 0 ? (subjectAverages[sub] / totalStudents).toFixed(2) : 0;
        const avg = parseFloat(subjectAverages[sub]);
        if (avg < minAvg && avg > 0) {
            minAvg = avg;
            mostDifficult = subjectNames[sub];
        }
    }

    // Populate subject difficulty table (using % as per request)
    const subjectTbody = document.querySelector('#subjectDifficultyDetails tbody');
    subjectTbody.innerHTML = '';
    ['chem', 'phy', 'bio', 'math'].forEach(sub => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${subjectNames[sub]}</td><td>${subjectAverages[sub]}%</td>`;
        subjectTbody.appendChild(tr);
    });
    const mostTr = document.createElement('tr');
    mostTr.innerHTML = `<td>MOST DIFFICULT</td><td>${mostDifficult}</td>`;
    subjectTbody.appendChild(mostTr);

    // Populate exam participation table
    const examTbody = document.querySelector('#examDetails tbody');
    examTbody.innerHTML = '';
    allExams.sort().forEach(exam => {
        const attempted = students.filter(stu => stu.exams.some(ex => ex.exam === exam && ex.maxTotal > 0)).length;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="exam-name" data-exam="${exam}">${exam}</td>
            <td>${attempted}</td>
        `;
        examTbody.appendChild(tr);
    });
    addClickListeners(); // Re-add for exam names

    // Populate student details table with strong and weak subjects
    const studentTbody = document.querySelector('#studentDetails tbody');
    studentTbody.innerHTML = '';
    const sortedStudents = [...students].sort((a, b) => a.roll.localeCompare(b.roll));
    sortedStudents.forEach((stu, i) => {
        const strongLabel = stu.strongSubject[0] === 'N/A' ? 'N/A' : stu.strongSubject.map(sub => `${subjectNames[sub]} (${stu.subjectAverages[sub]}%)`).join(', ');
        const weakLabel = stu.weakSubject[0] === 'N/A' ? 'N/A' : stu.weakSubject.map(sub => `${subjectNames[sub]} (${stu.subjectAverages[sub]}%)`).join(', ');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${stu.roll}</td>
            <td class="name" data-roll="${stu.roll}">${stu.name}</td>
            <td class="improved">${strongLabel}</td>
            <td class="declined">${weakLabel}</td>
        `;
        studentTbody.appendChild(tr);
    });
    addClickListeners();
}

// Add click listeners for names and exams
function addClickListeners() {
    document.querySelectorAll('.name').forEach(name => {
        name.removeEventListener('click', handleNameClick);
        name.addEventListener('click', handleNameClick);
    });
    document.querySelectorAll('.exam-name').forEach(name => {
        name.removeEventListener('click', handleExamClick);
        name.addEventListener('click', handleExamClick);
    });
}

// Handle student name click (toggle details)
function handleNameClick(event) {
    const roll = event.target.dataset.roll;
    const stu = students.find(s => s.roll === roll);
    const tr = event.target.parentNode;

    if (currentExpandedRow && currentExpandedRow !== tr.nextElementSibling) {
        currentExpandedRow.style.display = 'none';
        const prevCanvasId = currentExpandedRow.querySelector('canvas')?.id;
        if (prevCanvasId && chartInstances[prevCanvasId]) {
            chartInstances[prevCanvasId].destroy();
            delete chartInstances[prevCanvasId];
        }
    }

    let next = tr.nextElementSibling;
    if (next && next.classList.contains('details-row')) {
        next.style.display = next.style.display === 'none' ? '' : 'none';
        if (next.style.display === 'none') {
            const canvasId = `chart-${stu.roll}`;
            if (chartInstances[canvasId]) {
                chartInstances[canvasId].destroy();
                delete chartInstances[canvasId];
            }
        }
        currentExpandedRow = next.style.display !== 'none' ? next : null;
        return;
    }

    const detailsTr = document.createElement('tr');
    detailsTr.classList.add('details-row');
    const td = document.createElement('td');
    td.colSpan = tr.children.length;
    const div = document.createElement('div');
    div.classList.add('details');

    // Build content (cleaned up)
    let content = `<h3>${stu.name} (ROLL: ${stu.roll})</h3>`;
    const overallRank = stu.cumTotal > 0 ? [...students].sort((a, b) => b.cumTotal - a.cumTotal || a.roll.localeCompare(b.roll)).findIndex(s => s.roll === stu.roll) + 1 : 'N/A';
    content += `<p>OVERALL RANK: ${overallRank}</p><p>TOTAL SCORE: ${stu.cumTotal}</p><p>PERCENTAGE: ${stu.cumPercent}%</p><p>EXAMS ATTEMPTED: ${stu.examsAttempted}</p>`;

    const strongLabel = stu.strongSubject[0] === 'N/A' ? 'N/A' : stu.strongSubject.map(sub => `${subjectNames[sub]} (${stu.subjectAverages[sub]}%)`).join(', ');
    const weakLabel = stu.weakSubject[0] === 'N/A' ? 'N/A' : stu.weakSubject.map(sub => `${subjectNames[sub]} (${stu.subjectAverages[sub]}%)`).join(', ');
    content += `<p><strong>STRONGEST SUBJECT:</strong> <span class="improved">${strongLabel}</span></p>`;
    content += `<p><strong>WEAKEST SUBJECT:</strong> <span class="declined">${weakLabel}</span></p>`;

    // Subject ranks
    const { ranks } = getSubjectRanks(stu);
    content += '<h3>SUBJECT-WISE RANKS</h3>';
    if (stu.examsAttempted > 0) {
        content += '<table class="subject-rank-table"><thead><tr><th>SUBJECT</th><th>RANK</th><th>TOTAL SCORE</th><th>AVG %</th></tr></thead><tbody>';
        ['chem', 'phy', 'bio', 'math'].forEach(sub => {
            const avgPct = stu.subjectAverages[sub];
            const rowClass = stu.strongSubject.includes(sub) ? 'improved' : stu.weakSubject.includes(sub) ? 'declined' : '';
            content += `<tr class="${rowClass}"><td>${subjectNames[sub]}</td><td>${ranks[sub].rank}</td><td>${ranks[sub].total}</td><td>${avgPct}%</td></tr>`;
        });
        content += '</tbody></table>';
    } else {
        content += '<p>NO SUBJECT RANKS AVAILABLE (NO EXAMS ATTENDED).</p>';
    }

    // Previous marks
    const validExams = stu.exams.filter(ex => ex.maxTotal > 0);
    content += '<h3>ALL PREVIOUS MARKS</h3>';
    if (validExams.length > 0) {
        content += '<table><thead><tr><th>EXAM</th><th>RANK</th><th>CHEM (raw | %)</th><th>PHY (raw | %)</th><th>BIO (raw | %)</th><th>MATH (raw | %)</th><th>TOTAL</th><th>%</th></tr></thead><tbody>';
        validExams.forEach(ex => {
            const rank = getExamRank(stu, ex.exam);
            const cPct = ex.maxScores.chem ? (ex.scores.chem / ex.maxScores.chem * 100).toFixed(2) : '0.00';
            const pPct = ex.maxScores.phy ? (ex.scores.phy / ex.maxScores.phy * 100).toFixed(2) : '0.00';
            const bPct = ex.maxScores.bio ? (ex.scores.bio / ex.maxScores.bio * 100).toFixed(2) : '0.00';
            const mPct = ex.maxScores.math ? (ex.scores.math / ex.maxScores.math * 100).toFixed(2) : '0.00';
            content += `<tr><td>${ex.exam}</td><td>${rank}</td><td>${ex.scores.chem} | ${cPct}%</td><td>${ex.scores.phy} | ${pPct}%</td><td>${ex.scores.bio} | ${bPct}%</td><td>${ex.scores.math} | ${mPct}%</td><td>${ex.total}</td><td>${(ex.total / ex.maxTotal * 100).toFixed(2)}%</td></tr>`;
        });
        content += '</tbody></table>';
    } else {
        content += '<p>NO EXAMS ATTENDED.</p>';
    }

    // Progress
    content += '<h3>PROGRESS TRACKING</h3>';
    const progress = computeProgress(stu);
    if (progress.length > 0) {
        content += '<table class="progress-table"><thead><tr><th>EXAM</th><th>RANK</th><th>RANK CHANGE</th><th>TOTAL SCORE</th><th>SCORE CHANGE</th></tr></thead><tbody>';
        progress.forEach(p => {
            const rankChangeText = p.rankChange > 0 ? `+${p.rankChange} (Improved)` : p.rankChange < 0 ? `${p.rankChange} (Declined)` : 'No Change';
            const scoreChangeText = p.scoreChange > 0 ? `+${p.scoreChange} (Improved)` : p.scoreChange < 0 ? `${p.scoreChange} (Declined)` : 'No Change';
            const rankClass = p.rankChange > 0 ? 'improved' : p.rankChange < 0 ? 'declined' : '';
            const scoreClass = p.scoreChange > 0 ? 'improved' : p.scoreChange < 0 ? 'declined' : '';
            content += `<tr><td>${p.exam}</td><td>${p.rank}</td><td class="${rankClass}">${rankChangeText}</td><td>${p.score}</td><td class="${scoreClass}">${scoreChangeText}</td></tr>`;
        });
        content += '</tbody></table>';
    } else {
        content += '<p>INSUFFICIENT DATA FOR PROGRESS TRACKING (NEEDS AT LEAST 2 EXAMS).</p>';
    }

    // Chart
    content += `<h3>EXAM MARKS LINE CHART</h3><div class="chart-container"><button id="chartToggle-${stu.roll}">SHOW SUBJECT-WISE %</button><canvas id="chart-${stu.roll}"></canvas></div>`;
    div.innerHTML = content;
    td.appendChild(div);
    detailsTr.appendChild(td);
    tr.after(detailsTr);
    currentExpandedRow = detailsTr;

    createChart(stu, `chart-${stu.roll}`, 'total');
    document.getElementById(`chartToggle-${stu.roll}`).addEventListener('click', function () {
        const mode = this.textContent.includes('SUBJECT-WISE') ? 'subjects' : 'total';
        this.textContent = mode === 'total' ? 'SHOW SUBJECT-WISE %' : 'SHOW TOTAL %';
        createChart(stu, `chart-${stu.roll}`, mode);
    });
}

// Handle exam click (toggle ranklist)
function handleExamClick(event) {
    const exam = event.target.dataset.exam;
    const tr = event.target.parentNode;

    if (currentExpandedExam && currentExpandedExam !== tr.nextElementSibling) {
        currentExpandedExam.style.display = 'none';
    }

    let next = tr.nextElementSibling;
    if (next && next.classList.contains('exam-details-row')) {
        next.style.display = next.style.display === 'none' ? '' : 'none';
        currentExpandedExam = next.style.display !== 'none' ? next : null;
        return;
    }

    const detailsTr = document.createElement('tr');
    detailsTr.classList.add('exam-details-row');
    const td = document.createElement('td');
    td.colSpan = tr.children.length;
    const div = document.createElement('div');
    div.classList.add('details');

    const examStudents = students
        .filter(stu => stu.exams.some(ex => ex.exam === exam && ex.maxTotal > 0))
        .map(stu => {
            const examData = stu.exams.find(ex => ex.exam === exam);
            return { ...stu, examTotal: examData.total, examPercent: (examData.total / examData.maxTotal * 100).toFixed(2), examData };
        })
        .sort((a, b) => b.examTotal - a.examTotal || a.roll.localeCompare(b.roll));

    let content = `<h3>RANKLIST FOR ${exam}</h3><table class="exam-ranklist"><thead><tr><th>RANK</th><th>ROLL NO</th><th>NAME</th><th>CHEM (raw | %)</th><th>PHY (raw | %)</th><th>BIO (raw | %)</th><th>MATH (raw | %)</th><th>TOTAL</th><th>%</th></tr></thead><tbody>`;
    examStudents.forEach((stu, i) => {
        const rank = stu.examTotal > 0 ? i + 1 : '-';
        const ex = stu.examData;
        const cPct = ex.maxScores.chem ? (ex.scores.chem / ex.maxScores.chem * 100).toFixed(2) : '0.00';
        const pPct = ex.maxScores.phy ? (ex.scores.phy / ex.maxScores.phy * 100).toFixed(2) : '0.00';
        const bPct = ex.maxScores.bio ? (ex.scores.bio / ex.maxScores.bio * 100).toFixed(2) : '0.00';
        const mPct = ex.maxScores.math ? (ex.scores.math / ex.maxScores.math * 100).toFixed(2) : '0.00';
        content += `<tr${rank <= 3 ? ' class="top-performer"' : ''}><td>${rank}</td><td>${stu.roll}</td><td>${stu.name}</td><td>${ex.scores.chem} | ${cPct}%</td><td>${ex.scores.phy} | ${pPct}%</td><td>${ex.scores.bio} | ${bPct}%</td><td>${ex.scores.math} | ${mPct}%</td><td>${stu.examTotal}</td><td>${stu.examPercent}%</td></tr>`;
    });
    content += '</tbody></table>';
    div.innerHTML = content;
    td.appendChild(div);
    detailsTr.appendChild(td);
    tr.after(detailsTr);
    currentExpandedExam = detailsTr;
}

// Compute progress
function computeProgress(student) {
    const validExams = student.exams.filter(ex => ex.maxTotal > 0);
    const progress = [];
    if (validExams.length < 2) return progress;

    for (let i = 1; i < validExams.length; i++) {
        const exam = validExams[i];
        const prevExam = validExams[i - 1];

        const currRank = getExamRank(student, exam.exam);
        const prevRank = getExamRank(student, prevExam.exam);
        const rankChange = prevRank - currRank;
        const scoreChange = exam.total - prevExam.total;

        progress.push({ exam: exam.exam, rank: currRank, rankChange, score: exam.total, scoreChange });
    }
    return progress;
}

// Get exam rank
function getExamRank(student, examName) {
    const examStudents = students
        .filter(stu => stu.exams.some(ex => ex.exam === examName && ex.maxTotal > 0))
        .map(stu => ({ ...stu, examTotal: stu.exams.find(ex => ex.exam === examName).total }))
        .sort((a, b) => b.examTotal - a.examTotal || a.roll.localeCompare(b.roll));
    return examStudents.findIndex(s => s.roll === student.roll) + 1;
}

// Get subject ranks
function getSubjectRanks(student) {
    const ranks = {};
    ['chem', 'phy', 'bio', 'math'].forEach(sub => {
        const sorted = [...students].sort((a, b) => {
            const percB = b.subjectMaxTotals[sub] > 0 ? b.subjectTotals[sub] / b.subjectMaxTotals[sub] : 0;
            const percA = a.subjectMaxTotals[sub] > 0 ? a.subjectTotals[sub] / a.subjectMaxTotals[sub] : 0;
            return percB - percA || a.roll.localeCompare(b.roll);
        });
        ranks[sub] = {
            rank: student.subjectMaxTotals[sub] > 0 ? sorted.findIndex(s => s.roll === student.roll) + 1 : '-',
            total: student.subjectTotals[sub]
        };
    });
    return { ranks };
}

// Create chart
function createChart(stu, canvasId, mode) {
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();
    const ctx = document.getElementById(canvasId).getContext('2d');
    const validExams = stu.exams.filter(ex => ex.maxTotal > 0);
    const labels = validExams.map(ex => ex.exam);
    let datasets = [];

    if (validExams.length === 0) {
        datasets = [{ label: 'NO DATA', data: [], borderColor: '#ffeb3b', fill: false }];
    } else if (mode === 'total') {
        datasets = [{ label: 'TOTAL %', data: validExams.map(ex => (ex.total / ex.maxTotal * 100).toFixed(2)), borderColor: '#ffeb3b', fill: false }];
    } else {
        datasets = [
            { label: 'CHEMISTRY %', data: validExams.map(ex => (ex.scores.chem / ex.maxScores.chem * 100).toFixed(2) || 0), borderColor: '#f44336', fill: false },
            { label: 'PHYSICS %', data: validExams.map(ex => (ex.scores.phy / ex.maxScores.phy * 100).toFixed(2) || 0), borderColor: '#2196f3', fill: false },
            { label: 'BIOLOGY %', data: validExams.map(ex => (ex.scores.bio / ex.maxScores.bio * 100).toFixed(2) || 0), borderColor: '#4caf50', fill: false },
            { label: 'MATHS %', data: validExams.map(ex => (ex.scores.math / ex.maxScores.math * 100).toFixed(2) || 0), borderColor: '#ffeb3b', fill: false }
        ];
    }

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0', font: { size: 10 } } } },
            scales: {
                x: { ticks: { color: document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0', font: { size: 10 }, maxRotation: 45, minRotation: 45 }, grid: { color: document.body.classList.contains('light-theme') ? '#ccc' : '#333' } },
                y: { beginAtZero: true, max: 100, ticks: { color: document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0', font: { size: 10 }, stepSize: 10 }, grid: { color: document.body.classList.contains('light-theme') ? '#ccc' : '#333' } }
            }
        }
    });
}

// Show tab
function showTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.style.display = 'none');
    document.getElementById(tab).style.display = 'block';
}

// Process CSV
function processCSVData(data) {
    if (!data.every(row => row.roll && row.name && row.exam && 'chem' in row && 'phy' in row && 'bio' in row && 'math' in row && 'total' in row && 'percent' in row && 'maxTotal' in row && 'maxChem' in row && 'maxPhy' in row && 'maxBio' in row && 'maxMath' in row)) {
        throw new Error('Invalid CSV format. Missing required fields.');
    }

    const studentMap = {};
    data.forEach(row => {
        const roll = row.roll.trim();
        const name = row.name.trim();
        if (!studentMap[roll]) studentMap[roll] = { roll, name, exams: [] };
        studentMap[roll].name = name;
        studentMap[roll].exams.push({
            exam: row.exam.trim(),
            scores: { chem: parseFloat(row.chem) || 0, phy: parseFloat(row.phy) || 0, bio: parseFloat(row.bio) || 0, math: parseFloat(row.math) || 0 },
            maxScores: { chem: parseFloat(row.maxChem) || 0, phy: parseFloat(row.maxPhy) || 0, bio: parseFloat(row.maxBio) || 0, math: parseFloat(row.maxMath) || 0 },
            total: parseFloat(row.total) || 0,
            percent: parseFloat(row.percent) || 0,
            maxTotal: parseFloat(row.maxTotal) || 0
        });
    });

    students = Object.values(studentMap);
    students.forEach(computeCumulatives);
    populateOverall();
    populateLast3();
    ['chem', 'phy', 'bio', 'math'].forEach(sub => populateSubject(`${sub}Table`, sub));
    populateStats();
    showTab('overall');
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    document.getElementById('themeToggle').textContent = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
    Object.values(chartInstances).forEach(chart => {
        chart.options.plugins.legend.labels.color = document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0';
        chart.options.scales.x.ticks.color = document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0';
        chart.options.scales.y.ticks.color = document.body.classList.contains('light-theme') ? '#333' : '#e0e0e0';
        chart.options.scales.x.grid.color = document.body.classList.contains('light-theme') ? '#ccc' : '#333';
        chart.options.scales.y.grid.color = document.body.classList.contains('light-theme') ? '#ccc' : '#333';
        chart.update();
    });
}

// Implement search
function performSearch() {
    const query = document.getElementById('search').value.trim().toLowerCase();
    if (!query) return clearSearch();

    const results = students.filter(stu => stu.name.toLowerCase().includes(query) || stu.roll.toLowerCase().includes(query));
    const tbody = document.querySelector('#searchTable tbody');
    tbody.innerHTML = '';
    const sorted = [...results].sort((a, b) => b.cumTotal - a.cumTotal || a.roll.localeCompare(b.roll));
    sorted.forEach((stu, i) => {
        const rank = stu.cumTotal > 0 ? i + 1 : '-';
        const tr = document.createElement('tr');
        if (rank >= 1 && rank <= 3) tr.classList.add('top-performer');
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
    document.getElementById('searchResults').style.display = 'block';
}

function clearSearch() {
    document.getElementById('search').value = '';
    document.getElementById('searchResults').style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') toggleTheme();

    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('dataFile').addEventListener('change', event => {
        const file = event.target.files[0];
        if (file) Papa.parse(file, { header: true, skipEmptyLines: true, complete: results => { try { processCSVData(results.data); } catch (e) { alert(e.message); } } });
    });

    // Stats buttons
    document.getElementById('subjectDifficultyBtn').addEventListener('click', () => {
        document.getElementById('subjectDifficultyDetails').style.display = document.getElementById('subjectDifficultyDetails').style.display === 'none' ? 'block' : 'none';
    });
    document.getElementById('examDetailsBtn').addEventListener('click', () => {
        document.getElementById('examDetails').style.display = document.getElementById('examDetails').style.display === 'none' ? 'block' : 'none';
    });
    document.getElementById('studentDetailsBtn').addEventListener('click', () => {
        document.getElementById('studentDetails').style.display = document.getElementById('studentDetails').style.display === 'none' ? 'block' : 'none';
    });

    // Search
    document.getElementById('searchButton').addEventListener('click', performSearch);
    document.getElementById('clearSearchButton').addEventListener('click', clearSearch);
    document.getElementById('search').addEventListener('keypress', e => { if (e.key === 'Enter') performSearch(); });
});

processCSVData([]);
