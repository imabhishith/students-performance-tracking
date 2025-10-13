let students = [];
let currentExpandedRow = null;
let currentExpandedExam = null;
let chartInstances = {};

const subjectNames = {
  chem: 'CHEMISTRY',
  phy: 'PHYSICS',
  bio: 'BIOLOGY',
  math: 'MATHEMATICS'
};

// data
const sampleData = [
  {"roll": "CYL12", "name": "FARHAN M", "exam": "WE 1", "chem": -5, "phy": 5, "bio": 15, "math": 5, "total": 20, "percent": 12.5, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL07", "name": "ASJAN LAHAR", "exam": "WE 1", "chem": -2, "phy": 4, "bio": 16, "math": 0, "total": 18, "percent": 11.25, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL10", "name": "DAKSHA PILLAI", "exam": "WE 1", "chem": 10, "phy": -10, "bio": 30, "math": 10, "total": 40, "percent": 25, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL32", "name": "VYDEHI NAIR", "exam": "WE 1", "chem": 4, "phy": 15, "bio": 40, "math": 28, "total": 87, "percent": 54.38, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL25", "name": "PARVATHY N P", "exam": "WE 1", "chem": 4, "phy": -3, "bio": 30, "math": 19, "total": 50, "percent": 31.25, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL02", "name": "ABHIRAMI K M", "exam": "WE 1", "chem": 4, "phy": 0, "bio": 1, "math": 8, "total": 13, "percent": 8.13, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL13", "name": "GAURAV S KRISHNAN", "exam": "WE 1", "chem": 16, "phy": 18, "bio": 26, "math": -4, "total": 56, "percent": 35, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL24", "name": "NIVEDITHA P RAVI", "exam": "WE 1", "chem": 19, "phy": 12, "bio": 30, "math": 16, "total": 77, "percent": 48.13, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL19", "name": "MIDHUN P", "exam": "WE 1", "chem": 3, "phy": 6, "bio": 30, "math": 14, "total": 53, "percent": 33.13, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL03", "name": "AISHA SHARAF S", "exam": "WE 1", "chem": 3, "phy": 0, "bio": 22, "math": 4, "total": 29, "percent": 18.13, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL06", "name": "ARAVIND R CHANDRAN", "exam": "WE 1", "chem": 32, "phy": 32, "bio": 35, "math": 18, "total": 117, "percent": 73.13, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL31", "name": "VIDHU NAMBIAR A V", "exam": "WE 1", "chem": 32, "phy": 31, "bio": 40, "math": 22, "total": 125, "percent": 78.13, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL18", "name": "KAVERY VISWANATHAN", "exam": "WE 1", "chem": 12, "phy": 20, "bio": 35, "math": 11, "total": 78, "percent": 48.75, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL21", "name": "NIDHA FATHIMA V N", "exam": "WE 1", "chem": 0, "phy": 5, "bio": 30, "math": -5, "total": 30, "percent": 18.75, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL26", "name": "PRAJUL KRISHNA", "exam": "WE 1", "chem": 6, "phy": 7, "bio": 31, "math": 15, "total": 59, "percent": 36.88, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL01", "name": "ABHI A", "exam": "WE 1", "chem": 0, "phy": -1, "bio": 4, "math": 10, "total": 13, "percent": 8.13, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL27", "name": "RAFA HANOON K", "exam": "WE 1", "chem": 13, "phy": 16, "bio": 40, "math": 17, "total": 86, "percent": 53.75, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL22", "name": "NIDHA T P", "exam": "WE 1", "chem": 8, "phy": 20, "bio": 40, "math": 20, "total": 88, "percent": 55, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL29", "name": "SHAZA FATHIMA P V", "exam": "WE 1", "chem": 24, "phy": 23, "bio": 40, "math": 23, "total": 110, "percent": 68.75, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL08", "name": "ASWITHA C K", "exam": "WE 1", "chem": 16, "phy": 12, "bio": 21, "math": 14, "total": 63, "percent": 39.38, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL23", "name": "NIMITHA K J", "exam": "WE 1", "chem": 6, "phy": 20, "bio": 35, "math": 13, "total": 74, "percent": 46.25, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL15", "name": "IHSAN HUSSAIN", "exam": "WE 1", "chem": 12, "phy": 16, "bio": 31, "math": 13, "total": 72, "percent": 45, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL20", "name": "MUHAMMED AFRAJ LATHEEF", "exam": "WE 1", "chem": 0, "phy": 3, "bio": 16, "math": 5, "total": 24, "percent": 15, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL28", "name": "RHIDHI", "exam": "WE 1", "chem": 7, "phy": 5, "bio": 27, "math": 2, "total": 41, "percent": 25.63, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL30", "name": "SUKANYA V S", "exam": "WE 1", "chem": 35, "phy": 27, "bio": 35, "math": 26, "total": 123, "percent": 76.88, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL14", "name": "GOWRI KRISHNAN M", "exam": "WE 1", "chem": 4, "phy": 8, "bio": 40, "math": 20, "total": 72, "percent": 45, "maxTotal": 160, "maxChem": 40, "maxPhy": 40, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL04", "name": "ALEENA ELIZABETH MATHEW", "exam": "WE 1", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL05", "name": "ANJANA PRASAD", "exam": "WE 1", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL09", "name": "ATUL RAJESH K", "exam": "WE 1", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL11", "name": "EESHA NAIR", "exam": "WE 1", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL16", "name": "KAILAS", "exam": "WE 1", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL17", "name": "KARTHIK SHINOJ", "exam": "WE 1", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL33", "name": "RIDHA FATHIMA", "exam": "WE 1", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL34", "name": "THAHSEEN THAJUDHEEN", "exam": "WE 1", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL35", "name": "G VRINDA", "exam": "WE 1", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL36", "name": "SREYA K SUNIL", "exam": "WE 1", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL36", "name": "SREYA K SUNIL", "exam": "WE 2", "chem": -1, "phy": 0, "bio": 26, "math": 0, "total": 25, "percent": 16.03, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL07", "name": "ASJAN LAHAR", "exam": "WE 2", "chem": 2, "phy": 6, "bio": 22, "math": 0, "total": 30, "percent": 19.23, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL12", "name": "FARHAN M", "exam": "WE 2", "chem": 15, "phy": 0, "bio": 25, "math": -4, "total": 36, "percent": 23.08, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL13", "name": "GAURAV S KRISHNAN", "exam": "WE 2", "chem": -4, "phy": 14, "bio": 27, "math": 13, "total": 50, "percent": 32.05, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL09", "name": "ATUL RAJESH K", "exam": "WE 2", "chem": 15, "phy": 14, "bio": 30, "math": -1, "total": 58, "percent": 37.18, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL01", "name": "ABHI A", "exam": "WE 2", "chem": 0, "phy": 4, "bio": 27, "math": 8, "total": 39, "percent": 25, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL25", "name": "PARVATHY N P", "exam": "WE 2", "chem": 2, "phy": 2, "bio": 25, "math": 11, "total": 40, "percent": 25.64, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL11", "name": "EESHA NAIR", "exam": "WE 2", "chem": 26, "phy": 22, "bio": 36, "math": 18, "total": 102, "percent": 65.38, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL24", "name": "NIVEDITHA P RAVI", "exam": "WE 2", "chem": 17, "phy": 19, "bio": 35, "math": 16, "total": 87, "percent": 55.77, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL32", "name": "VYDEHI NAIR", "exam": "WE 2", "chem": 24, "phy": 9, "bio": 30, "math": 7, "total": 70, "percent": 44.87, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL19", "name": "MIDHUN P", "exam": "WE 2", "chem": 12, "phy": -4, "bio": 35, "math": 3, "total": 46, "percent": 29.49, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL18", "name": "KAVERY VISWANATHAN", "exam": "WE 2", "chem": 16, "phy": 16, "bio": 35, "math": 3, "total": 70, "percent": 44.87, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL10", "name": "DAKSHA PILLAI", "exam": "WE 2", "chem": -3, "phy": 10, "bio": 15, "math": 6, "total": 28, "percent": 17.95, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL20", "name": "MUHAMMED AFRAJ LATHEEF", "exam": "WE 2", "chem": 5, "phy": 1, "bio": 10, "math": 2, "total": 18, "percent": 11.54, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL06", "name": "ARAVIND R CHANDRAN", "exam": "WE 2", "chem": 40, "phy": 27, "bio": 30, "math": 20, "total": 117, "percent": 75, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL03", "name": "AISHA SHARAF S", "exam": "WE 2", "chem": 18, "phy": 18, "bio": 30, "math": 2, "total": 68, "percent": 43.59, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL08", "name": "ASWITHA C K", "exam": "WE 2", "chem": 24, "phy": 11, "bio": 35, "math": 20, "total": 90, "percent": 57.69, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL23", "name": "NIMITHA K J", "exam": "WE 2", "chem": 22, "phy": -3, "bio": 30, "math": -1, "total": 48, "percent": 30.77, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL31", "name": "VIDHU NAMBIAR A V", "exam": "WE 2", "chem": 31, "phy": 31, "bio": 40, "math": 15, "total": 117, "percent": 75, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL29", "name": "SHAZA FATHIMA P V", "exam": "WE 2", "chem": 30, "phy": 17, "bio": 35, "math": 14, "total": 96, "percent": 61.54, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL04", "name": "ALEENA ELIZABETH MATHEW", "exam": "WE 2", "chem": 31, "phy": 19, "bio": 40, "math": 11, "total": 101, "percent": 64.74, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL22", "name": "NIDHA T P", "exam": "WE 2", "chem": 2, "phy": 13, "bio": 20, "math": -4, "total": 31, "percent": 19.87, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL28", "name": "RHIDHI", "exam": "WE 2", "chem": 19, "phy": 6, "bio": 13, "math": 2, "total": 40, "percent": 25.64, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL34", "name": "THAHSEEN THAJUDHEEN", "exam": "WE 2", "chem": 10, "phy": 0, "bio": 20, "math": -9, "total": 21, "percent": 13.46, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL27", "name": "RAFA HANOON K", "exam": "WE 2", "chem": 30, "phy": 24, "bio": 35, "math": 0, "total": 89, "percent": 57.05, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL30", "name": "SUKANYA V S", "exam": "WE 2", "chem": 31, "phy": 31, "bio": 40, "math": 26, "total": 128, "percent": 82.05, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL26", "name": "PRAJUL KRISHNA", "exam": "WE 2", "chem": 15, "phy": 9, "bio": 20, "math": 2, "total": 46, "percent": 29.49, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL16", "name": "KAILAS", "exam": "WE 2", "chem": 15, "phy": 6, "bio": 25, "math": 3, "total": 49, "percent": 31.41, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL15", "name": "IHSAN HUSSAIN", "exam": "WE 2", "chem": 27, "phy": 11, "bio": 21, "math": 3, "total": 62, "percent": 39.74, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL17", "name": "KARTHIK SHINOJ", "exam": "WE 2", "chem": 26, "phy": 13, "bio": 15, "math": 0, "total": 54, "percent": 34.62, "maxTotal": 156, "maxChem": 40, "maxPhy": 36, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL02", "name": "ABHIRAMI K M", "exam": "WE 2", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL05", "name": "ANJANA PRASAD", "exam": "WE 2", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL14", "name": "GOWRI KRISHNAN M", "exam": "WE 2", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL21", "name": "NIDHA FATHIMA V N", "exam": "WE 2", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL33", "name": "RIDHA FATHIMA", "exam": "WE 2", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL35", "name": "G VRINDA", "exam": "WE 2", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL30", "name": "SUKANYA V S", "exam": "WE 3", "chem": 35, "phy": 10, "bio": 35, "math": 25, "total": 105, "percent": 75, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL31", "name": "VIDHU NAMBIAR A V", "exam": "WE 3", "chem": 36, "phy": 16, "bio": 35, "math": 16, "total": 103, "percent": 73.57, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL29", "name": "SHAZA FATHIMA P V", "exam": "WE 3", "chem": 40, "phy": 12, "bio": 35, "math": 16, "total": 103, "percent": 73.57, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL11", "name": "EESHA NAIR", "exam": "WE 3", "chem": 36, "phy": 2, "bio": 31, "math": 28, "total": 97, "percent": 69.29, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL27", "name": "RAFA HANOON K", "exam": "WE 3", "chem": 31, "phy": 8, "bio": 28, "math": 19, "total": 86, "percent": 61.43, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL04", "name": "ALEENA ELIZABETH MATHEW", "exam": "WE 3", "chem": 35, "phy": 4, "bio": 27, "math": 20, "total": 86, "percent": 61.43, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL08", "name": "ASWITHA C K", "exam": "WE 3", "chem": 35, "phy": 0, "bio": 32, "math": 15, "total": 82, "percent": 58.57, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL28", "name": "RHIDHI", "exam": "WE 3", "chem": 15, "phy": 4, "bio": 36, "math": 23, "total": 78, "percent": 55.71, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL06", "name": "ARAVIND R CHANDRAN", "exam": "WE 3", "chem": 30, "phy": 4, "bio": 32, "math": 11, "total": 77, "percent": 55, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL15", "name": "IHSAN HUSSAIN", "exam": "WE 3", "chem": 36, "phy": 0, "bio": 30, "math": 7, "total": 73, "percent": 52.14, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL19", "name": "MIDHUN P", "exam": "WE 3", "chem": 30, "phy": 7, "bio": 13, "math": 20, "total": 70, "percent": 50, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL17", "name": "KARTHIK SHINOJ", "exam": "WE 3", "chem": 35, "phy": 4, "bio": 21, "math": 8, "total": 68, "percent": 48.57, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL26", "name": "PRAJUL KRISHNA", "exam": "WE 3", "chem": 26, "phy": 0, "bio": 23, "math": 19, "total": 68, "percent": 48.57, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL22", "name": "NIDHA T P", "exam": "WE 3", "chem": 20, "phy": 3, "bio": 30, "math": 14, "total": 67, "percent": 47.86, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL32", "name": "VYDEHI NAIR", "exam": "WE 3", "chem": 27, "phy": 4, "bio": 16, "math": 16, "total": 63, "percent": 45, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL18", "name": "KAVERY VISWANATHAN", "exam": "WE 3", "chem": 25, "phy": 0, "bio": 27, "math": 11, "total": 63, "percent": 45, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL24", "name": "NIVEDITHA P RAVI", "exam": "WE 3", "chem": 26, "phy": 3, "bio": 16, "math": 16, "total": 61, "percent": 43.57, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL33", "name": "RIDHA FATHIMA", "exam": "WE 3", "chem": 23, "phy": 4, "bio": 31, "math": 3, "total": 61, "percent": 43.57, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL13", "name": "GAURAV S KRISHNAN", "exam": "WE 3", "chem": 20, "phy": 3, "bio": 16, "math": 17, "total": 56, "percent": 40, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL23", "name": "NIMITHA K J", "exam": "WE 3", "chem": 15, "phy": -1, "bio": 26, "math": 7, "total": 47, "percent": 33.57, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL20", "name": "MUHAMMED AFRAJ LATHEEF", "exam": "WE 3", "chem": 16, "phy": 5, "bio": 15, "math": 6, "total": 42, "percent": 30, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL12", "name": "FARHAN M", "exam": "WE 3", "chem": 30, "phy": 5, "bio": 5, "math": 0, "total": 40, "percent": 28.57, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL10", "name": "DAKSHA PILLAI", "exam": "WE 3", "chem": 10, "phy": 10, "bio": 15, "math": 5, "total": 40, "percent": 28.57, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL01", "name": "ABHI A", "exam": "WE 3", "chem": 12, "phy": 0, "bio": 27, "math": 0, "total": 39, "percent": 27.86, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL03", "name": "AISHA SHARAF S", "exam": "WE 3", "chem": 21, "phy": -3, "bio": 13, "math": 0, "total": 31, "percent": 22.14, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL14", "name": "GOWRI KRISHNAN M", "exam": "WE 3", "chem": 11, "phy": 0, "bio": 13, "math": 0, "total": 24, "percent": 17.14, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL36", "name": "SREYA K SUNIL", "exam": "WE 3", "chem": 0, "phy": 0, "bio": 16, "math": 0, "total": 16, "percent": 11.43, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL34", "name": "THAHSEEN THAJUDHEEN", "exam": "WE 3", "chem": 6, "phy": 3, "bio": 2, "math": -6, "total": 5, "percent": 3.57, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL02", "name": "ABHIRAMI K M", "exam": "WE 3", "chem": -3, "phy": 7, "bio": -8, "math": -6, "total": -10, "percent": -7.14, "maxTotal": 140, "maxChem": 40, "maxPhy": 20, "maxBio": 40, "maxMath": 40},
  {"roll": "CYL35", "name": "G VRINDA", "exam": "WE 3", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL25", "name": "PARVATHY N P", "exam": "WE 3", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL21", "name": "NIDHA FATHIMA V N", "exam": "WE 3", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL16", "name": "KAILAS", "exam": "WE 3", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL09", "name": "ATUL RAJESH K", "exam": "WE 3", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL07", "name": "ASJAN LAHAR", "exam": "WE 3", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll": "CYL05", "name": "ANJANA PRASAD", "exam": "WE 3", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0},
  {"roll":"CYL01","name":"ABHI A","exam":"RT 1","chem":0,"phy":0,"bio":20,"math":0,"total":20,"percent":8.77,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL03","name":"AISHA SHARAF S","exam":"RT 1","chem":24,"phy":11,"bio":34,"math":6,"total":75,"percent":32.89,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL04","name":"ALEENA ELIZABETH MATHEW","exam":"RT 1","chem":33,"phy":21,"bio":46,"math":20,"total":120,"percent":52.63,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL06","name":"ARAVIND R CHANDRAN","exam":"RT 1","chem":48,"phy":44,"bio":51,"math":28,"total":171,"percent":75,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL08","name":"ASWITHA C K","exam":"RT 1","chem":48,"phy":32,"bio":50,"math":18,"total":148,"percent":64.91,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL09","name":"ATUL RAJESH K","exam":"RT 1","chem":30,"phy":15,"bio":47,"math":21,"total":113,"percent":49.56,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL10","name":"DAKSHA PILLAI","exam":"RT 1","chem":-5,"phy":-2,"bio":15,"math":12,"total":20,"percent":8.77,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL11","name":"EESHA NAIR","exam":"RT 1","chem":40,"phy":31,"bio":23,"math":36,"total":130,"percent":57.02,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL12","name":"FARHAN M","exam":"RT 1","chem":5,"phy":-4,"bio":20,"math":17,"total":38,"percent":16.67,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL13","name":"GAURAV S KRISHNAN","exam":"RT 1","chem":27,"phy":24,"bio":39,"math":16,"total":106,"percent":46.49,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL14","name":"GOWRI KRISHNAN M","exam":"RT 1","chem":15,"phy":2,"bio":28,"math":13,"total":58,"percent":25.44,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL15","name":"IHSAN HUSSAIN","exam":"RT 1","chem":47,"phy":13,"bio":40,"math":27,"total":127,"percent":55.7,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL17","name":"KARTHIK SHINOJ","exam":"RT 1","chem":43,"phy":15,"bio":31,"math":4,"total":93,"percent":40.79,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL18","name":"KAVERY VISWANATHAN","exam":"RT 1","chem":35,"phy":32,"bio":46,"math":36,"total":149,"percent":65.35,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL19","name":"MIDHUN P","exam":"RT 1","chem":23,"phy":17,"bio":20,"math":10,"total":70,"percent":30.7,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL20","name":"MUHAMMED AFRAJ LATHEEF","exam":"RT 1","chem":15,"phy":10,"bio":30,"math":1,"total":56,"percent":24.56,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL21","name":"NIDHA FATHIMA V N","exam":"RT 1","chem":10,"phy":11,"bio":25,"math":2,"total":48,"percent":21.05,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL22","name":"NIDHA T P","exam":"RT 1","chem":41,"phy":28,"bio":40,"math":40,"total":149,"percent":65.35,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL23","name":"NIMITHA K J","exam":"RT 1","chem":20,"phy":17,"bio":13,"math":18,"total":68,"percent":29.82,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL24","name":"NIVEDITHA P RAVI","exam":"RT 1","chem":45,"phy":26,"bio":40,"math":22,"total":133,"percent":58.33,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL26","name":"PRAJUL KRISHNA","exam":"RT 1","chem":26,"phy":32,"bio":45,"math":11,"total":114,"percent":50,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL27","name":"RAFA HANOON K","exam":"RT 1","chem":46,"phy":19,"bio":36,"math":39,"total":140,"percent":61.4,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL28","name":"RHIDHI","exam":"RT 1","chem":15,"phy":26,"bio":8,"math":35,"total":84,"percent":36.84,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL29","name":"SHAZA FATHIMA P V","exam":"RT 1","chem":52,"phy":34,"bio":45,"math":35,"total":166,"percent":72.81,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL30","name":"SUKANYA V S","exam":"RT 1","chem":40,"phy":41,"bio":55,"math":52,"total":188,"percent":82.46,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL31","name":"VIDHU NAMBIAR A V","exam":"RT 1","chem":22,"phy":36,"bio":32,"math":44,"total":134,"percent":58.77,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL32","name":"VYDEHI NAIR","exam":"RT 1","chem":40,"phy":2,"bio":42,"math":19,"total":103,"percent":45.18,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL33","name":"RIDHA FATHIMA","exam":"RT 1","chem":33,"phy":0,"bio":41,"math":8,"total":82,"percent":35.96,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL34","name":"THAHSEEN THAJUDHEEN","exam":"RT 1","chem":7,"phy":20,"bio":9,"math":-1,"total":35,"percent":15.35,"maxTotal":228,"maxChem":60,"maxPhy":56,"maxBio":60,"maxMath":52},
  {"roll":"CYL02","name":"ABHIRAMI K M","exam":"RT 1","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL05","name":"ANJANA PRASAD","exam":"RT 1","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL07","name":"ASJAN LAHAR","exam":"RT 1","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL16","name":"KAILAS","exam":"RT 1","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL25","name":"PARVATHY N P","exam":"RT 1","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL35","name":"G VRINDA","exam":"RT 1","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL36","name":"SREYA K SUNIL","exam":"RT 1","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL02","name":"ABHIRAMI K M","exam":"WE 4","chem":17,"phy":19,"bio":18,"math":14,"total":68,"percent":42.5,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL03","name":"AISHA SHARAF S","exam":"WE 4","chem":24,"phy":4,"bio":23,"math":0,"total":51,"percent":31.88,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL04","name":"ALEENA ELIZABETH MATHEW","exam":"WE 4","chem":32,"phy":20,"bio":36,"math":16,"total":104,"percent":65,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL06","name":"ARAVIND R CHANDRAN","exam":"WE 4","chem":32,"phy":23,"bio":24,"math":20,"total":99,"percent":61.88,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL08","name":"ASWITHA C K","exam":"WE 4","chem":32,"phy":16,"bio":31,"math":4,"total":83,"percent":51.88,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL09","name":"ATUL RAJESH K","exam":"WE 4","chem":27,"phy":24,"bio":26,"math":27,"total":104,"percent":65,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL10","name":"DAKSHA PILLAI","exam":"WE 4","chem":5,"phy":0,"bio":5,"math":-5,"total":5,"percent":3.13,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL12","name":"FARHAN M","exam":"WE 4","chem":0,"phy":0,"bio":15,"math":-5,"total":10,"percent":6.25,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL15","name":"IHSAN HUSSAIN","exam":"WE 4","chem":36,"phy":12,"bio":24,"math":6,"total":78,"percent":48.75,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL18","name":"KAVERY VISWANATHAN","exam":"WE 4","chem":31,"phy":4,"bio":28,"math":20,"total":83,"percent":51.88,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL19","name":"MIDHUN P","exam":"WE 4","chem":16,"phy":7,"bio":2,"math":2,"total":27,"percent":16.88,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL23","name":"NIMITHA K J","exam":"WE 4","chem":19,"phy":10,"bio":18,"math":4,"total":51,"percent":31.88,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL24","name":"NIVEDITHA P RAVI","exam":"WE 4","chem":32,"phy":27,"bio":31,"math":13,"total":103,"percent":64.38,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL26","name":"PRAJUL KRISHNA","exam":"WE 4","chem":20,"phy":16,"bio":24,"math":8,"total":68,"percent":42.5,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL27","name":"RAFA HANOON K","exam":"WE 4","chem":31,"phy":6,"bio":21,"math":20,"total":78,"percent":48.75,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL28","name":"RHIDHI","exam":"WE 4","chem":19,"phy":10,"bio":27,"math":7,"total":63,"percent":39.38,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL29","name":"SHAZA FATHIMA P V","exam":"WE 4","chem":40,"phy":19,"bio":35,"math":19,"total":113,"percent":70.63,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL30","name":"SUKANYA V S","exam":"WE 4","chem":35,"phy":30,"bio":40,"math":35,"total":140,"percent":87.5,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL31","name":"VIDHU NAMBIAR A V","exam":"WE 4","chem":31,"phy":27,"bio":40,"math":32,"total":130,"percent":81.25,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL32","name":"VYDEHI NAIR","exam":"WE 4","chem":28,"phy":20,"bio":24,"math":16,"total":88,"percent":55,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL33","name":"RIDHA FATHIMA","exam":"WE 4","chem":17,"phy":8,"bio":11,"math":0,"total":36,"percent":22.5,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL34","name":"THAHSEEN THAJUDHEEN","exam":"WE 4","chem":9,"phy":2,"bio":13,"math":9,"total":33,"percent":20.63,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL35","name":"G VRINDA","exam":"WE 4","chem":12,"phy":2,"bio":15,"math":-2,"total":27,"percent":16.88,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL36","name":"SREYA K SUNIL","exam":"WE 4","chem":0,"phy":0,"bio":13,"math":0,"total":13,"percent":8.13,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL01","name":"ABHI A","exam":"WE 4","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL05","name":"ANJANA PRASAD","exam":"WE 4","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL07","name":"ASJAN LAHAR","exam":"WE 4","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL11","name":"EESHA NAIR","exam":"WE 4","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL13","name":"GAURAV S KRISHNAN","exam":"WE 4","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL14","name":"GOWRI KRISHNAN M","exam":"WE 4","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL16","name":"KAILAS","exam":"WE 4","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL17","name":"KARTHIK SHINOJ","exam":"WE 4","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL20","name":"MUHAMMED AFRAJ LATHEEF","exam":"WE 4","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL21","name":"NIDHA FATHIMA V N","exam":"WE 4","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL22","name":"NIDHA T P","exam":"WE 4","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL25","name":"PARVATHY N P","exam":"WE 4","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL01","name":"ABHI A","exam":"WE 5","chem":0,"phy":0,"bio":11,"math":0,"total":11,"percent":6.88,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL03","name":"AISHA SHARAF S","exam":"WE 5","chem":4,"phy":16,"bio":25,"math":-1,"total":44,"percent":27.5,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL04","name":"ALEENA ELIZABETH MATHEW","exam":"WE 5","chem":16,"phy":8,"bio":40,"math":23,"total":87,"percent":54.38,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL06","name":"ARAVIND R CHANDRAN","exam":"WE 5","chem":32,"phy":36,"bio":36,"math":16,"total":120,"percent":75,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL08","name":"ASWITHA C K","exam":"WE 5","chem":22,"phy":24,"bio":40,"math":11,"total":97,"percent":60.63,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL10","name":"DAKSHA PILLAI","exam":"WE 5","chem":20,"phy":20,"bio":30,"math":10,"total":80,"percent":50,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL12","name":"FARHAN M","exam":"WE 5","chem":10,"phy":0,"bio":10,"math":15,"total":35,"percent":21.88,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL13","name":"GAURAV S KRISHNAN","exam":"WE 5","chem":15,"phy":13,"bio":36,"math":20,"total":84,"percent":52.5,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL14","name":"GOWRI KRISHNAN M","exam":"WE 5","chem":2,"phy":4,"bio":32,"math":0,"total":38,"percent":23.75,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL15","name":"IHSAN HUSSAIN","exam":"WE 5","chem":22,"phy":22,"bio":30,"math":2,"total":76,"percent":47.5,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL17","name":"KARTHIK SHINOJ","exam":"WE 5","chem":22,"phy":7,"bio":30,"math":0,"total":59,"percent":36.88,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL18","name":"KAVERY VISWANATHAN","exam":"WE 5","chem":28,"phy":28,"bio":40,"math":8,"total":104,"percent":65,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL19","name":"MIDHUN P","exam":"WE 5","chem":6,"phy":19,"bio":22,"math":1,"total":48,"percent":30,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL22","name":"NIDHA T P","exam":"WE 5","chem":27,"phy":32,"bio":40,"math":15,"total":114,"percent":71.25,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL23","name":"NIMITHA K J","exam":"WE 5","chem":14,"phy":24,"bio":26,"math":7,"total":71,"percent":44.38,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL24","name":"NIVEDITHA P RAVI","exam":"WE 5","chem":22,"phy":27,"bio":40,"math":12,"total":101,"percent":63.13,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL27","name":"RAFA HANOON K","exam":"WE 5","chem":32,"phy":27,"bio":40,"math":10,"total":109,"percent":68.13,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL28","name":"RHIDHI","exam":"WE 5","chem":28,"phy":31,"bio":31,"math":4,"total":94,"percent":58.75,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL29","name":"SHAZA FATHIMA P V","exam":"WE 5","chem":35,"phy":22,"bio":40,"math":3,"total":100,"percent":62.5,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL30","name":"SUKANYA V S","exam":"WE 5","chem":31,"phy":22,"bio":40,"math":31,"total":124,"percent":77.5,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL31","name":"VIDHU NAMBIAR A V","exam":"WE 5","chem":14,"phy":32,"bio":35,"math":32,"total":113,"percent":70.63,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL32","name":"VYDEHI NAIR","exam":"WE 5","chem":18,"phy":28,"bio":36,"math":15,"total":97,"percent":60.63,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL33","name":"RIDHA FATHIMA","exam":"WE 5","chem":16,"phy":-1,"bio":35,"math":0,"total":50,"percent":31.25,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL35","name":"G VRINDA","exam":"WE 5","chem":0,"phy":8,"bio":36,"math":4,"total":48,"percent":30,"maxTotal":160,"maxChem":40,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL02","name":"ABHIRAMI K M","exam":"WE 5","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL05","name":"ANJANA PRASAD","exam":"WE 5","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL07","name":"ASJAN LAHAR","exam":"WE 5","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL09","name":"ATUL RAJESH K","exam":"WE 5","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL11","name":"EESHA NAIR","exam":"WE 5","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL16","name":"KAILAS","exam":"WE 5","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL20","name":"MUHAMMED AFRAJ LATHEEF","exam":"WE 5","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL21","name":"NIDHA FATHIMA V N","exam":"WE 5","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL25","name":"PARVATHY N P","exam":"WE 5","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL26","name":"PRAJUL KRISHNA","exam":"WE 5","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL34","name":"THAHSEEN THAJUDHEEN","exam":"WE 5","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL36","name":"SREYA K SUNIL","exam":"WE 5","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL02","name":"ABHIRAMI K M","exam":"WE 6","chem":32,"phy":1,"bio":11,"math":1,"total":45,"percent":28.85,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL03","name":"AISHA SHARAF S","exam":"WE 6","chem":6,"phy":2,"bio":36,"math":0,"total":44,"percent":28.21,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL04","name":"ALEENA ELIZABETH MATHEW","exam":"WE 6","chem":20,"phy":3,"bio":40,"math":18,"total":81,"percent":51.92,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL06","name":"ARAVIND R CHANDRAN","exam":"WE 6","chem":31,"phy":23,"bio":23,"math":10,"total":87,"percent":55.77,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL08","name":"ASWITHA C K","exam":"WE 6","chem":28,"phy":16,"bio":36,"math":24,"total":104,"percent":66.67,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL10","name":"DAKSHA PILLAI","exam":"WE 6","chem":31,"phy":15,"bio":25,"math":10,"total":81,"percent":51.92,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL12","name":"FARHAN M","exam":"WE 6","chem":7,"phy":0,"bio":25,"math":5,"total":37,"percent":23.72,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL13","name":"GAURAV S KRISHNAN","exam":"WE 6","chem":24,"phy":7,"bio":32,"math":19,"total":82,"percent":52.56,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL14","name":"GOWRI KRISHNAN M","exam":"WE 6","chem":19,"phy":7,"bio":6,"math":1,"total":33,"percent":21.15,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL15","name":"IHSAN HUSSAIN","exam":"WE 6","chem":23,"phy":18,"bio":35,"math":1,"total":77,"percent":49.36,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL16","name":"KAILAS","exam":"WE 6","chem":35,"phy":19,"bio":32,"math":4,"total":90,"percent":57.69,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL17","name":"KARTHIK SHINOJ","exam":"WE 6","chem":35,"phy":27,"bio":32,"math":0,"total":94,"percent":60.26,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL18","name":"KAVERY VISWANATHAN","exam":"WE 6","chem":32,"phy":24,"bio":35,"math":24,"total":115,"percent":73.72,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL19","name":"MIDHUN P","exam":"WE 6","chem":27,"phy":16,"bio":22,"math":-1,"total":64,"percent":41.03,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL20","name":"MUHAMMED AFRAJ LATHEEF","exam":"WE 6","chem":30,"phy":-1,"bio":27,"math":2,"total":58,"percent":37.18,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL21","name":"NIDHA FATHIMA V N","exam":"WE 6","chem":21,"phy":0,"bio":20,"math":-5,"total":36,"percent":23.08,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL22","name":"NIDHA T P","exam":"WE 6","chem":27,"phy":28,"bio":40,"math":20,"total":115,"percent":73.72,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL23","name":"NIMITHA K J","exam":"WE 6","chem":13,"phy":2,"bio":27,"math":-1,"total":41,"percent":26.28,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL25","name":"PARVATHY N P","exam":"WE 6","chem":22,"phy":0,"bio":6,"math":4,"total":32,"percent":20.51,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL26","name":"PRAJUL KRISHNA","exam":"WE 6","chem":23,"phy":16,"bio":31,"math":4,"total":74,"percent":47.44,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL27","name":"RAFA HANOON K","exam":"WE 6","chem":40,"phy":20,"bio":36,"math":19,"total":115,"percent":73.72,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL28","name":"RHIDHI","exam":"WE 6","chem":24,"phy":28,"bio":40,"math":8,"total":100,"percent":64.1,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL29","name":"SHAZA FATHIMA P V","exam":"WE 6","chem":32,"phy":36,"bio":40,"math":27,"total":135,"percent":86.54,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL30","name":"SUKANYA V S","exam":"WE 6","chem":35,"phy":36,"bio":27,"math":30,"total":128,"percent":82.05,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL31","name":"VIDHU NAMBIAR A V","exam":"WE 6","chem":31,"phy":27,"bio":35,"math":28,"total":121,"percent":77.56,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL32","name":"VYDEHI NAIR","exam":"WE 6","chem":16,"phy":19,"bio":40,"math":20,"total":95,"percent":60.9,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL33","name":"RIDHA FATHIMA","exam":"WE 6","chem":0,"phy":7,"bio":19,"math":0,"total":26,"percent":16.67,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL34","name":"THAHSEEN THAJUDHEEN","exam":"WE 6","chem":16,"phy":4,"bio":25,"math":2,"total":47,"percent":30.13,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL35","name":"G VRINDA","exam":"WE 6","chem":5,"phy":-1,"bio":30,"math":4,"total":38,"percent":24.36,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL36","name":"SREYA K SUNIL","exam":"WE 6","chem":0,"phy":4,"bio":32,"math":0,"total":36,"percent":23.08,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL38","name":"SHARON BINU","exam":"WE 6","chem":19,"phy":-1,"bio":4,"math":-1,"total":21,"percent":13.46,"maxTotal":156,"maxChem":36,"maxPhy":40,"maxBio":40,"maxMath":40},
  {"roll":"CYL01","name":"ABHI A","exam":"WE 6","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL05","name":"ANJANA PRASAD","exam":"WE 6","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL07","name":"ASJAN LAHAR","exam":"WE 6","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL09","name":"ATUL RAJESH K","exam":"WE 6","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL11","name":"EESHA NAIR","exam":"WE 6","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL24","name":"NIVEDITHA P RAVI","exam":"WE 6","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL02","name":"ABHIRAMI K M","exam":"RT 2","chem":40,"phy":11,"bio":30,"math":32,"total":113,"percent":47.08,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL04","name":"ALEENA ELIZABETH MATHEW","exam":"RT 2","chem":23,"phy":32,"bio":60,"math":55,"total":170,"percent":70.83,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL06","name":"ARAVIND R CHANDRAN","exam":"RT 2","chem":34,"phy":26,"bio":43,"math":44,"total":147,"percent":61.25,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL08","name":"ASWITHA C K","exam":"RT 2","chem":28,"phy":48,"bio":56,"math":47,"total":179,"percent":74.58,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL09","name":"ATUL RAJESH K","exam":"RT 2","chem":25,"phy":39,"bio":45,"math":29,"total":138,"percent":57.5,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL10","name":"DAKSHA PILLAI","exam":"RT 2","chem":45,"phy":0,"bio":26,"math":0,"total":71,"percent":29.58,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL12","name":"FARHAN M","exam":"RT 2","chem":20,"phy":10,"bio":10,"math":30,"total":70,"percent":29.17,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL13","name":"GAURAV S KRISHNAN","exam":"RT 2","chem":2,"phy":22,"bio":41,"math":26,"total":91,"percent":37.92,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL14","name":"GOWRI KRISHNAN M","exam":"RT 2","chem":0,"phy":11,"bio":31,"math":24,"total":66,"percent":27.5,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL15","name":"IHSAN HUSSAIN","exam":"RT 2","chem":17,"phy":48,"bio":40,"math":42,"total":147,"percent":61.25,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL17","name":"KARTHIK SHINOJ","exam":"RT 2","chem":34,"phy":31,"bio":50,"math":0,"total":115,"percent":47.92,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL18","name":"KAVERY VISWANATHAN","exam":"RT 2","chem":27,"phy":22,"bio":52,"math":32,"total":133,"percent":55.42,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL19","name":"MIDHUN P","exam":"RT 2","chem":5,"phy":12,"bio":42,"math":13,"total":72,"percent":30,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL20","name":"MUHAMMED AFRAJ LATHEEF","exam":"RT 2","chem":11,"phy":1,"bio":45,"math":7,"total":64,"percent":26.67,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL21","name":"NIDHA FATHIMA V N","exam":"RT 2","chem":3,"phy":-3,"bio":21,"math":8,"total":29,"percent":12.08,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL22","name":"NIDHA T P","exam":"RT 2","chem":30,"phy":18,"bio":51,"math":34,"total":133,"percent":55.42,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL24","name":"NIVEDITHA P RAVI","exam":"RT 2","chem":37,"phy":37,"bio":45,"math":48,"total":167,"percent":69.58,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL26","name":"PRAJUL KRISHNA","exam":"RT 2","chem":31,"phy":48,"bio":44,"math":23,"total":146,"percent":60.83,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL27","name":"RAFA HANOON K","exam":"RT 2","chem":39,"phy":36,"bio":56,"math":50,"total":181,"percent":75.42,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL28","name":"RHIDHI","exam":"RT 2","chem":32,"phy":48,"bio":38,"math":19,"total":137,"percent":57.08,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL29","name":"SHAZA FATHIMA P V","exam":"RT 2","chem":51,"phy":51,"bio":56,"math":51,"total":209,"percent":87.08,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL30","name":"SUKANYA V S","exam":"RT 2","chem":52,"phy":51,"bio":50,"math":41,"total":194,"percent":80.83,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL31","name":"VIDHU NAMBIAR A V","exam":"RT 2","chem":52,"phy":60,"bio":60,"math":55,"total":227,"percent":94.58,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL32","name":"VYDEHI NAIR","exam":"RT 2","chem":36,"phy":43,"bio":44,"math":48,"total":171,"percent":71.25,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL34","name":"THAHSEEN THAJUDHEEN","exam":"RT 2","chem":-5,"phy":28,"bio":21,"math":10,"total":54,"percent":22.5,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL35","name":"G VRINDA","exam":"RT 2","chem":-3,"phy":11,"bio":29,"math":3,"total":40,"percent":16.67,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL38","name":"SHARON BINU","exam":"RT 2","chem":-1,"phy":0,"bio":-1,"math":11,"total":9,"percent":3.75,"maxTotal":240,"maxChem":60,"maxPhy":60,"maxBio":60,"maxMath":60},
  {"roll":"CYL01","name":"ABHI A","exam":"RT 2","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL03","name":"AISHA SHARAF S","exam":"RT 2","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL05","name":"ANJANA PRASAD","exam":"RT 2","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL07","name":"ASJAN LAHAR","exam":"RT 2","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL11","name":"EESHA NAIR","exam":"RT 2","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL16","name":"KAILAS","exam":"RT 2","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL23","name":"NIMITHA K J","exam":"RT 2","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL25","name":"PARVATHY N P","exam":"RT 2","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL33","name":"RIDHA FATHIMA","exam":"RT 2","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL36","name":"SREYA K SUNIL","exam":"RT 2","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL37","name":"AMRITHA SURESH","exam":"RT 2","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL02","name":"ABHIRAMI K M","exam":"WE 7","chem":51,"phy":4,"bio":0,"math":9,"total":64,"percent":40,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL03","name":"AISHA SHARAF S","exam":"WE 7","chem":2,"phy":-3,"bio":0,"math":0,"total":-1,"percent":-0.63,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL08","name":"ASWITHA C K","exam":"WE 7","chem":59,"phy":16,"bio":0,"math":4,"total":79,"percent":49.38,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL10","name":"DAKSHA PILLAI","exam":"WE 7","chem":40,"phy":25,"bio":0,"math":30,"total":95,"percent":59.38,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL12","name":"FARHAN M","exam":"WE 7","chem":10,"phy":5,"bio":0,"math":0,"total":15,"percent":9.38,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL13","name":"GAURAV S KRISHNAN","exam":"WE 7","chem":51,"phy":22,"bio":0,"math":15,"total":88,"percent":55,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL14","name":"GOWRI KRISHNAN M","exam":"WE 7","chem":24,"phy":4,"bio":0,"math":4,"total":32,"percent":20,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL15","name":"IHSAN HUSSAIN","exam":"WE 7","chem":55,"phy":20,"bio":0,"math":4,"total":79,"percent":49.38,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL17","name":"KARTHIK SHINOJ","exam":"WE 7","chem":60,"phy":14,"bio":0,"math":0,"total":74,"percent":46.25,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL19","name":"MIDHUN P","exam":"WE 7","chem":44,"phy":3,"bio":0,"math":5,"total":52,"percent":32.5,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL20","name":"MUHAMMED AFRAJ LATHEEF","exam":"WE 7","chem":37,"phy":-3,"bio":0,"math":14,"total":48,"percent":30,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL22","name":"NIDHA T P","exam":"WE 7","chem":50,"phy":15,"bio":0,"math":16,"total":81,"percent":50.63,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL23","name":"NIMITHA K J","exam":"WE 7","chem":17,"phy":15,"bio":0,"math":-3,"total":29,"percent":18.13,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL24","name":"NIVEDITHA P RAVI","exam":"WE 7","chem":35,"phy":20,"bio":0,"math":10,"total":65,"percent":40.63,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL26","name":"PRAJUL KRISHNA","exam":"WE 7","chem":52,"phy":20,"bio":0,"math":4,"total":76,"percent":47.5,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL27","name":"RAFA HANOON K","exam":"WE 7","chem":66,"phy":22,"bio":0,"math":16,"total":104,"percent":65,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL28","name":"RHIDHI","exam":"WE 7","chem":45,"phy":20,"bio":0,"math":3,"total":68,"percent":42.5,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL29","name":"SHAZA FATHIMA P V","exam":"WE 7","chem":80,"phy":27,"bio":0,"math":30,"total":137,"percent":85.63,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL30","name":"SUKANYA V S","exam":"WE 7","chem":60,"phy":35,"bio":0,"math":36,"total":131,"percent":81.88,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL31","name":"VIDHU NAMBIAR A V","exam":"WE 7","chem":58,"phy":32,"bio":0,"math":36,"total":126,"percent":78.75,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL32","name":"VYDEHI NAIR","exam":"WE 7","chem":67,"phy":24,"bio":0,"math":16,"total":107,"percent":66.88,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL33","name":"RIDHA FATHIMA","exam":"WE 7","chem":58,"phy":0,"bio":0,"math":0,"total":58,"percent":36.25,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL35","name":"G VRINDA","exam":"WE 7","chem":10,"phy":2,"bio":0,"math":0,"total":12,"percent":7.5,"maxTotal":160,"maxChem":80,"maxPhy":40,"maxBio":0,"maxMath":40},
  {"roll":"CYL01","name":"ABHI A","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL04","name":"ALEENA ELIZABETH MATHEW","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL05","name":"ANJANA PRASAD","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL06","name":"ARAVIND R CHANDRAN","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL07","name":"ASJAN LAHAR","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL09","name":"ATUL RAJESH K","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL11","name":"EESHA NAIR","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL16","name":"KAILAS","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL18","name":"KAVERY VISWANATHAN","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL21","name":"NIDHA FATHIMA V N","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL25","name":"PARVATHY N P","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL34","name":"THAHSEEN THAJUDHEEN","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL36","name":"SREYA K SUNIL","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL37","name":"AMRITHA SURESH","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL38","name":"SHARON BINU","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0},
  {"roll":"CYL39","name":"NIRANJANA SAJEEV","exam":"WE 7","chem":0,"phy":0,"bio":0,"math":0,"total":0,"percent":0,"maxTotal":0,"maxChem":0,"maxPhy":0,"maxBio":0,"maxMath":0}
];

const last3Exams = ['WE 6', 'RT 2', 'WE 7'];
const examOrder = ['WE 1', 'WE 2', 'WE 3', 'RT 1', 'WE 4', 'WE 5', 'WE 6', 'RT 2', 'WE 7'];

window.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    // Delay a bit to make sure page is ready
    setTimeout(() => {
        themeToggleBtn.click();
      // Hide loading overlay after theme toggle
      setTimeout(() => {
        document.getElementById('loadingOverlay').style.display = 'none';
      }, 1);
    }, 1);
  }
});

// NEW: Filter functions
function filterOverallRanklist(filterType) {
    currentOverallFilter = filterType;

    // Update button states
    document.getElementById('overallAllBtn').classList.toggle('active', filterType === 'all');
    document.getElementById('overallRTBtn').classList.toggle('active', filterType === 'RT');
    document.getElementById('overallWEBtn').classList.toggle('active', filterType === 'WE');

    // Repopulate the overall ranklist with filtered data
    populateOverallFiltered(filterType);
}

function filterLast3Ranklist(filterType) {
    currentLast3Filter = filterType;

    // Update button states
    document.getElementById('last3AllBtn').classList.toggle('active', filterType === 'all');
    document.getElementById('last3RTBtn').classList.toggle('active', filterType === 'RT');
    document.getElementById('last3WEBtn').classList.toggle('active', filterType === 'WE');

    // Repopulate the last 3 ranklist with filtered data
    populateLast3Filtered(filterType);
}

function getFilteredExamsForOverall(filterType) {
    if (filterType === 'all') {
        return examOrder; // All exams
    } else if (filterType === 'RT') {
        return examOrder.filter(exam => exam.startsWith('RT')); // Only RT exams
    } else if (filterType === 'WE') {
        return examOrder.filter(exam => exam.startsWith('WE')); // Only WE exams
    }
    return examOrder;
}

function getFilteredExamsForLast3(filterType) {
    if (filterType === 'all') {
        return last3Exams; // WE 6, RT 2, WE 7
    } else if (filterType === 'RT') {
        // Get last 3 RT exams - but only RT 1 and RT 2 exist
        const rtExams = examOrder.filter(exam => exam.startsWith('RT'));
        return rtExams; // Will return ['RT 1', 'RT 2'] - all available RTs
    } else if (filterType === 'WE') {
        // Get last 3 WE exams - WE 5, WE 6, WE 7
        const weExams = examOrder.filter(exam => exam.startsWith('WE'));
        return weExams.slice(-3); // Last 3 WEs: ['WE 5', 'WE 6', 'WE 7']
    }
    return last3Exams;
}

function populateOverallFiltered(filterType) {
    const tbody = document.querySelector('#rankTable tbody');
    tbody.innerHTML = '';

    const filteredExams = getFilteredExamsForOverall(filterType);

    // Calculate cumulative totals based on filtered exams
    const filteredStudents = students.map(stu => {
        let cumTotal = 0;
        let cumMax = 0;
        let examsAttempted = 0;

        stu.exams.forEach(ex => {
            if (ex.maxTotal > 0 && filteredExams.includes(ex.exam)) {
                cumTotal += ex.total;
                cumMax += ex.maxTotal;
                examsAttempted++;
            }
        });

        const cumPercent = cumMax > 0 ? ((cumTotal / cumMax) * 100).toFixed(2) : '0';

        return {
            ...stu,
            filteredCumTotal: cumTotal,
            filteredCumMax: cumMax,
            filteredCumPercent: cumPercent,
            filteredExamsAttempted: examsAttempted
        };
    });

    // Sort by filtered cumulative total
    const sorted = [...filteredStudents].sort((a, b) => {
        if (b.filteredCumTotal !== a.filteredCumTotal) {
            return b.filteredCumTotal - a.filteredCumTotal;
        }
        return a.roll.localeCompare(b.roll);
    });

    sorted.forEach((stu, i) => {
        const rank = stu.filteredCumTotal > 0 ? i + 1 : '-';
        const tr = document.createElement('tr');

        if (rank <= 3 && rank !== '-' && stu.filteredCumTotal > 0) {
            tr.classList.add('top-performer');
        }

        tr.innerHTML = `
            <td>${rank}</td>
            <td>${stu.roll}</td>
            <td class="name" data-roll="${stu.roll}">${stu.name}</td>
            <td>${stu.filteredExamsAttempted}</td>
            <td>${stu.filteredCumTotal}</td>
            <td>${stu.filteredCumPercent}%</td>
        `;

        tbody.appendChild(tr);
    });

    document.getElementById('overallCount').textContent = `${students.length} students`;
    addClickListeners();
}

function populateLast3Filtered(filterType) {
    const tbody = document.querySelector('#last3Table tbody');
    tbody.innerHTML = '';

    const filteredExams = getFilteredExamsForLast3(filterType);

    // Calculate last 3 totals based on filtered exams
    const last3Students = students.map(stu => {
        let total = 0;
        let maxTotal = 0;
        let examsAttempted = 0;

        filteredExams.forEach(examName => {
            const examData = stu.exams.find(ex => ex.exam === examName && ex.maxTotal > 0);
            if (examData) {
                total += examData.total;
                maxTotal += examData.maxTotal;
                examsAttempted++;
            }
        });

        const last3Percent = maxTotal > 0 ? ((total / maxTotal) * 100).toFixed(2) : '0.00';

        return {
            ...stu,
            last3Total: total,
            last3Percent: last3Percent,
            last3ExamsAttempted: examsAttempted,
            last3MaxTotal: maxTotal
        };
    });

    // Sort by last 3 total
    const sorted = last3Students.sort((a, b) => {
        if (b.last3Total !== a.last3Total) {
            return b.last3Total - a.last3Total;
        }
        return a.roll.localeCompare(b.roll);
    });

    sorted.forEach((stu, i) => {
        const rank = stu.last3Total > 0 ? i + 1 : '-';
        const tr = document.createElement('tr');

        if (rank <= 3 && rank !== '-') {
            tr.classList.add('top-performer');
        }

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

    document.getElementById('last3Count').textContent = `${students.length} students`;
    addClickListeners();
}

// Utility functions
function showLoading() {
  document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
  document.getElementById('loadingOverlay').style.display = 'none';
}

function showStatus(message, type) {
  const statusEl = document.getElementById('dataStatus');
  statusEl.textContent = message;
  statusEl.className = `status-message ${type}`;
  statusEl.style.display = 'block';

  if (type === 'success') {
    setTimeout(() => {
      statusEl.style.display = 'none';
    }, 5000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  processJsonData(sampleData);
});

function processJsonData(data) {
  showLoading();

  try {
    const studentMap = {};

    data.forEach(row => {
      const roll = row.roll.trim();
      const name = row.name.trim();

      if (!studentMap[roll]) {
        studentMap[roll] = { roll, name, exams: [] };
      }

      studentMap[roll].name = name;
      studentMap[roll].exams.push({
        exam: row.exam.trim(),
        scores: {
          chem: parseFloat(row.chem) || 0,
          phy: parseFloat(row.phy) || 0,
          bio: parseFloat(row.bio) || 0,
          math: parseFloat(row.math) || 0
        },
        maxScores: {
          chem: parseFloat(row.maxChem) || 0,
          phy: parseFloat(row.maxPhy) || 0,
          bio: parseFloat(row.maxBio) || 0,
          math: parseFloat(row.maxMath) || 0
        },
        total: parseFloat(row.total) || 0,
        percent: parseFloat(row.percent) || 0,
        maxTotal: parseFloat(row.maxTotal) || 0
      });
    });

    students = Object.values(studentMap);
    students.forEach(computeCumulatives);

    // Populate all tables
    populateOverall();
    populateLast3();
    ['chem', 'phy', 'bio', 'math'].forEach(sub => populateSubject(`${sub}Table`, sub));
    populateStats();

    showTab('overall');

  } catch (error) {
    showStatus(`Error processing data: ${error.message}`, 'error');
    console.error('Data processing error:', error);
  } finally {
    hideLoading();
  }
}

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
      if (avg > maxAvg) {
        maxAvg = avg;
        strongSubjects = [sub];
      } else if (avg === maxAvg) {
        strongSubjects.push(sub);
      }

      if (avg < minAvg) {
        minAvg = avg;
        weakSubjects = [sub];
      } else if (avg === minAvg) {
        weakSubjects.push(sub);
      }
    });

    student.strongSubject = strongSubjects.length > 0 ? strongSubjects : ['N/A'];
    student.weakSubject = weakSubjects.length > 0 ? weakSubjects : ['N/A'];
  } else {
    student.strongSubject = ['N/A'];
    student.weakSubject = ['N/A'];
  }
}

// Populate overall ranklist
function populateOverall() {
  const tbody = document.querySelector('#rankTable tbody');
  tbody.innerHTML = '';

  const sorted = [...students].sort((a, b) => b.cumTotal - a.cumTotal || a.roll.localeCompare(b.roll));

  sorted.forEach((stu, i) => {
    const rank = stu.cumTotal > 0 ? i + 1 : '-';
    const tr = document.createElement('tr');

    if (rank >= 1 && rank <= 3 && stu.cumTotal > 0) {
      tr.classList.add('top-performer');
    }

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

  document.getElementById('overallCount').textContent = `${students.length} students`;
  addClickListeners();
}

// Populate subject ranklist
function populateSubject(tableId, sub) {
  const tbody = document.querySelector(`#${tableId} tbody`);
  tbody.innerHTML = '';

  const sorted = [...students]
  .filter(s => s.subjectMaxTotals[sub] > 0)
  .sort((a, b) => {
    const totalB = b.subjectTotals[sub] || 0;
    const totalA = a.subjectTotals[sub] || 0;
    return totalB - totalA || a.roll.localeCompare(b.roll);
  });

  sorted.forEach((stu, i) => {
    const rank = i + 1;
    const tr = document.createElement('tr');

    if (rank >= 1 && rank <= 3) {
      tr.classList.add('top-performer');
    }

    const avgPercent = stu.subjectAverages[sub];

    tr.innerHTML = `
    <td>${rank}</td>
    <td>${stu.roll}</td>
    <td>${stu.name}</td>
    <td>${stu.examsAttempted}</td>
    <td>${stu.subjectTotals[sub]}</td>
    <td>${avgPercent}%</td>
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

  document.querySelector('#totalExams').textContent = totalExams;
  document.querySelector('#totalStudents').textContent = totalStudents;

  // Overall average
  const overallAvg = students.length > 0 ?
  (students.reduce((sum, stu) => sum + parseFloat(stu.cumPercent), 0) / students.length).toFixed(2) : 0;
  document.querySelector('#avgScore').textContent = `${overallAvg}%`;

  // Class average % per subject
  const subjectAverages = { chem: 0, phy: 0, bio: 0, math: 0 };
  const subjectCounts = { chem: 0, phy: 0, bio: 0, math: 0 };

  students.forEach(stu => {
    for (let sub in stu.subjectAverages) {
      const avg = parseFloat(stu.subjectAverages[sub]);
      if (avg > 0) {
        subjectAverages[sub] += avg;
        subjectCounts[sub]++;
      }
    }
  });

  // Calculate final averages
  let mostDifficult = 'N/A';
  let minAvg = Infinity;

  for (let sub in subjectAverages) {
    subjectAverages[sub] = subjectCounts[sub] > 0 ? (subjectAverages[sub] / subjectCounts[sub]).toFixed(2) : 0;
    const avg = parseFloat(subjectAverages[sub]);
    if (avg < minAvg && avg > 0) {
      minAvg = avg;
      mostDifficult = subjectNames[sub];
    }
  }

  // Populate subject difficulty table
  const subjectTbody = document.querySelector('#subjectDifficultyDetails tbody');
  subjectTbody.innerHTML = '';

  ['chem', 'phy', 'bio', 'math'].forEach(sub => {
    const tr = document.createElement('tr');
    const avg = parseFloat(subjectAverages[sub]);
    let status = '';
    let statusClass = '';

    if (avg >= 70) {
      status = 'Easy';
      statusClass = 'improved';
    } else if (avg >= 50) {
      status = 'Moderate';
    } else if (avg > 0) {
      status = 'Difficult';
      statusClass = 'declined';
    } else {
      status = 'No Data';
    }

    tr.innerHTML = `
    <td>${subjectNames[sub]}</td>
    <td>${subjectAverages[sub]}%</td>
    <td class="${statusClass}">${status}</td>
    `;
    subjectTbody.appendChild(tr);
  });

  // Add most difficult subject row
  const mostTr = document.createElement('tr');
  mostTr.innerHTML = `
  <td><strong>MOST DIFFICULT</strong></td>
  <td colspan="2" class="declined"><strong>${mostDifficult}</strong></td>
  `;
  subjectTbody.appendChild(mostTr);

  // Populate exam participation table
  const examTbody = document.querySelector('#examDetails tbody');
  examTbody.innerHTML = '';

  examOrder.forEach(exam => {
    const attempted = students.filter(stu => stu.exams.some(ex => ex.exam === exam && ex.maxTotal > 0)).length;
    const participationRate = totalStudents > 0 ? ((attempted / totalStudents) * 100).toFixed(1) : 0;

    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td class="exam-name" data-exam="${exam}">${exam}</td>
    <td>${attempted}</td>
    <td>${participationRate}%</td>
    `;
    examTbody.appendChild(tr);
  });

  // Populate student details table
  const studentTbody = document.querySelector('#studentDetails tbody');
  studentTbody.innerHTML = '';

  const sortedStudents = [...students].sort((a, b) => a.roll.localeCompare(b.roll));

  sortedStudents.forEach((stu, i) => {
    const strongLabel = stu.strongSubject[0] === 'N/A' ? 'N/A' :
    stu.strongSubject.map(sub => `${subjectNames[sub]} (${stu.subjectAverages[sub]}%)`).join(', ');

    const weakLabel = stu.weakSubject[0] === 'N/A' ? 'N/A' :
    stu.weakSubject.map(sub => `${subjectNames[sub]} (${stu.subjectAverages[sub]}%)`).join(', ');

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

  // Close any existing expanded row
  if (currentExpandedRow && currentExpandedRow !== tr.nextElementSibling) {
    currentExpandedRow.remove();
    currentExpandedRow = null;
  }

  let next = tr.nextElementSibling;
  if (next && next.classList.contains('details-row')) {
    next.remove();
    currentExpandedRow = null;
    return;
  }

  // Create new details row
  const detailsTr = document.createElement('tr');
  detailsTr.classList.add('details-row');

  const td = document.createElement('td');
  td.colSpan = tr.children.length;

  const div = document.createElement('div');
  div.classList.add('details');

  // Build student details content
  let content = buildStudentDetailsContent(stu);

  div.innerHTML = content;
  td.appendChild(div);
  detailsTr.appendChild(td);
  tr.after(detailsTr);
  currentExpandedRow = detailsTr;

  // Add chart functionality
  createChart(stu, `chart-${stu.roll}`, 'total');

  const toggleBtn = document.getElementById(`chartToggle-${stu.roll}`);
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const mode = this.textContent.includes('SUBJECT-WISE') ? 'subjects' : 'total';
      this.textContent = mode === 'total' ? 'SHOW SUBJECT-WISE %' : 'SHOW TOTAL %';
      createChart(stu, `chart-${stu.roll}`, mode);
    });
  }
}

// Build student details content
function buildStudentDetailsContent(stu) {
  const overallRank = stu.cumTotal > 0 ?
  [...students].sort((a, b) => b.cumTotal - a.cumTotal || a.roll.localeCompare(b.roll))
  .findIndex(s => s.roll === stu.roll) + 1 : 'N/A';

  let content = `
  <div class="student-details-header">
  <h3>${stu.name} (ROLL: ${stu.roll})</h3>
  <div class="student-summary">
  <p><strong>Overall Rank:</strong> ${overallRank}</p>
  <p><strong>Total Score:</strong> ${stu.cumTotal}</p>
  <p><strong>Percentage:</strong> ${stu.cumPercent}%</p>
  <p><strong>Exams Attempted:</strong> ${stu.examsAttempted}</p>
  </div>
  </div>
  `;

  // Strong/weak subjects
  const strongLabel = stu.strongSubject[0] === 'N/A' ? 'N/A' :
  stu.strongSubject.map(sub => `${subjectNames[sub]} (${stu.subjectAverages[sub]}%)`).join(', ');

  const weakLabel = stu.weakSubject[0] === 'N/A' ? 'N/A' :
  stu.weakSubject.map(sub => `${subjectNames[sub]} (${stu.subjectAverages[sub]}%)`).join(', ');

  content += `
  <div class="subject-strengths">
  <p><strong>STRONGEST SUBJECT:</strong> <span class="improved">${strongLabel}</span></p>
  <p><strong>WEAKEST SUBJECT:</strong> <span class="declined">${weakLabel}</span></p>
  </div>
  `;

  // Subject ranks
  if (stu.examsAttempted > 0) {
    const { ranks } = getSubjectRanks(stu);
    content += `
    <h4>SUBJECT-WISE RANKS</h4>
    <table class="subject-rank-table">
    <thead>
    <tr>
    <th>SUBJECT</th>
    <th>RANK</th>
    <th>TOTAL SCORE</th>
    <th>AVG %</th>
    </tr>
    </thead>
    <tbody>
    `;

    ['chem', 'bio', 'math', 'phy'].forEach(sub => {
      const avgPct = stu.subjectAverages[sub];
      const rowClass = stu.strongSubject.includes(sub) ? 'improved' :
      stu.weakSubject.includes(sub) ? 'declined' : '';

      content += `
      <tr class="${rowClass}">
      <td>${subjectNames[sub]}</td>
      <td>${ranks[sub].rank}</td>
      <td>${ranks[sub].total}</td>
      <td>${avgPct}%</td>
      </tr>
      `;
    });

    content += '</tbody></table>';
  }

  // Previous marks
  const validExams = stu.exams.filter(ex => ex.maxTotal > 0);
  if (validExams.length > 0) {
    content += `
    <h4>ALL PREVIOUS MARKS</h4>
    <table class="previous-table">
    <thead>
    <tr>
    <th>EXAM</th>
    <th>RANK</th>
    <th>CHEM (raw | %)</th>
    <th>PHY (raw | %)</th>
    <th>BIO (raw | %)</th>
    <th>MATH (raw | %)</th>
    <th>TOTAL</th>
    <th>%</th>
    </tr>
    </thead>
    <tbody>
    `;

    validExams.forEach(ex => {
      const rank = getExamRank(stu, ex.exam);

      // Show "-" for subjects that have maxScore = 0, otherwise show score and percentage
      const chemDisplay = ex.maxScores.chem > 0 ? `${ex.scores.chem} | ${(ex.scores.chem / ex.maxScores.chem * 100).toFixed(2)}%` : '-';
      const phyDisplay = ex.maxScores.phy > 0 ? `${ex.scores.phy} | ${(ex.scores.phy / ex.maxScores.phy * 100).toFixed(2)}%` : '-';
      const bioDisplay = ex.maxScores.bio > 0 ? `${ex.scores.bio} | ${(ex.scores.bio / ex.maxScores.bio * 100).toFixed(2)}%` : '-';
      const mathDisplay = ex.maxScores.math > 0 ? `${ex.scores.math} | ${(ex.scores.math / ex.maxScores.math * 100).toFixed(2)}%` : '-';

      content += `
      <tr>
      <td>${ex.exam}</td>
      <td>${rank}</td>
      <td>${chemDisplay}</td>
      <td>${phyDisplay}</td>
      <td>${bioDisplay}</td>
      <td>${mathDisplay}</td>
      <td>${ex.total}</td>
      <td>${(ex.total / ex.maxTotal * 100).toFixed(2)}%</td>
      </tr>
      `;
    });

    content += '</tbody></table>';
  }

  // Progress tracking
  const progress = computeProgress(stu);
  if (progress.length > 0) {
    content += `
    <h4>PROGRESS TRACKING</h4>
    <table class="progress-table">
    <thead>
    <tr>
    <th>EXAM</th>
    <th>RANK</th>
    <th>RANK CHANGE</th>
    <th>TOTAL SCORE</th>
    <th>SCORE CHANGE</th>
    </tr>
    </thead>
    <tbody>
    `;

    progress.forEach(p => {
      const rankChangeText = p.rankChange > 0 ? `+${p.rankChange} (Improved)` :
      p.rankChange < 0 ? `${p.rankChange} (Declined)` : 'No Change';
      const scoreChangeText = p.scoreChange > 0 ? `+${p.scoreChange} (Improved)` :
      p.scoreChange < 0 ? `${p.scoreChange} (Declined)` : 'No Change';

      const rankClass = p.rankChange > 0 ? 'improved' : p.rankChange < 0 ? 'declined' : '';
      const scoreClass = p.scoreChange > 0 ? 'improved' : p.scoreChange < 0 ? 'declined' : '';

      content += `
      <tr>
      <td>${p.exam}</td>
      <td>${p.rank}</td>
      <td class="${rankClass}">${rankChangeText}</td>
      <td>${p.score}</td>
      <td class="${scoreClass}">${scoreChangeText}</td>
      </tr>
      `;
    });

    content += '</tbody></table>';
  }

  // Chart
  content += `
  <h4>EXAM MARKS LINE CHART</h4>
  <div class="chart-container">
  <button id="chartToggle-${stu.roll}">SHOW SUBJECT-WISE %</button>
  <canvas id="chart-${stu.roll}"></canvas>
  </div>
  `;

  return content;
}

// Handle exam click (toggle ranklist)
function handleExamClick(event) {
  const exam = event.target.dataset.exam;
  const tr = event.target.parentNode;

  if (currentExpandedExam && currentExpandedExam !== tr.nextElementSibling) {
    currentExpandedExam.remove();
    currentExpandedExam = null;
  }

  let next = tr.nextElementSibling;
  if (next && next.classList.contains('exam-details-row')) {
    next.remove();
    currentExpandedExam = null;
    return;
  }

  const detailsTr = document.createElement('tr');
  detailsTr.classList.add('exam-details-row');

  const td = document.createElement('td');
  td.colSpan = tr.children.length;

  const div = document.createElement('div');
  div.classList.add('details');

  // Build exam ranklist
  const examStudents = students
  .filter(stu => stu.exams.some(ex => ex.exam === exam && ex.maxTotal > 0))
  .map(stu => {
    const examData = stu.exams.find(ex => ex.exam === exam);
    return {
      ...stu,
      examTotal: examData.total,
      examPercent: (examData.total / examData.maxTotal * 100).toFixed(2),
      examData
    };
  })
  .sort((a, b) => b.examTotal - a.examTotal || a.roll.localeCompare(b.roll));

  let content = `
  <h3>RANKLIST FOR ${exam}</h3>
  <table class="exam-ranklist">
  <thead>
  <tr>
  <th>RANK</th>
  <th>ROLL NO</th>
  <th>NAME</th>
  <th>CHEM (raw | %)</th>
  <th>PHY (raw | %)</th>
  <th>BIO (raw | %)</th>
  <th>MATH (raw | %)</th>
  <th>TOTAL</th>
  <th>%</th>
  </tr>
  </thead>
  <tbody>
  `;

  examStudents.forEach((stu, i) => {
    const rank = stu.examTotal > 0 ? i + 1 : '-';
    const ex = stu.examData;

    // Show "-" for subjects that have maxScore = 0, otherwise show score and percentage
    const chemDisplay = ex.maxScores.chem > 0 ? `${ex.scores.chem} | ${(ex.scores.chem / ex.maxScores.chem * 100).toFixed(2)}%` : '-';
    const phyDisplay = ex.maxScores.phy > 0 ? `${ex.scores.phy} | ${(ex.scores.phy / ex.maxScores.phy * 100).toFixed(2)}%` : '-';
    const bioDisplay = ex.maxScores.bio > 0 ? `${ex.scores.bio} | ${(ex.scores.bio / ex.maxScores.bio * 100).toFixed(2)}%` : '-';
    const mathDisplay = ex.maxScores.math > 0 ? `${ex.scores.math} | ${(ex.scores.math / ex.maxScores.math * 100).toFixed(2)}%` : '-';

    const rowClass = rank <= 3 && rank !== '-' ? ' class="top-performer"' : '';

    content += `
    <tr${rowClass}>
    <td>${rank}</td>
    <td>${stu.roll}</td>
    <td>${stu.name}</td>
    <td>${chemDisplay}</td>
    <td>${phyDisplay}</td>
    <td>${bioDisplay}</td>
    <td>${mathDisplay}</td>
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
  currentExpandedExam = detailsTr;
}

// Helper functions
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

    progress.push({
      exam: exam.exam,
      rank: currRank,
      rankChange,
      score: exam.total,
      scoreChange
    });
  }

  return progress;
}

function getExamRank(student, examName) {
  const examStudents = students
  .filter(stu => stu.exams.some(ex => ex.exam === examName && ex.maxTotal > 0))
  .map(stu => ({ ...stu, examTotal: stu.exams.find(ex => ex.exam === examName).total }))
  .sort((a, b) => b.examTotal - a.examTotal || a.roll.localeCompare(b.roll));

  return examStudents.findIndex(s => s.roll === student.roll) + 1;
}

function getSubjectRanks(student) {
  const ranks = {};

  ['chem', 'phy', 'bio', 'math'].forEach(sub => {
    const sorted = [...students]
    .filter(s => s.subjectMaxTotals[sub] > 0)
    .sort((a, b) => {
      const percB = b.subjectMaxTotals[sub] > 0 ? (b.subjectTotals[sub] / b.subjectMaxTotals[sub]) * 100 : 0;
      const percA = a.subjectMaxTotals[sub] > 0 ? (a.subjectTotals[sub] / a.subjectMaxTotals[sub]) * 100 : 0;
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
  if (chartInstances[canvasId]) {
    chartInstances[canvasId].destroy();
  }

  const ctx = document.getElementById(canvasId).getContext('2d');
  const validExams = stu.exams.filter(ex => ex.maxTotal > 0);
  const labels = validExams.map(ex => ex.exam);
  let datasets = [];

  if (validExams.length === 0) {
    datasets = [{
      label: 'NO DATA',
      data: [],
      borderColor: '#bb86fc',
      backgroundColor: 'rgba(187, 134, 252, 0.1)',
      fill: false,
      tension: 0.4
    }];
  } else if (mode === 'total') {
    datasets = [{
      label: 'TOTAL %',
      data: validExams.map(ex => (ex.total / ex.maxTotal * 100).toFixed(2)),
      borderColor: '#bb86fc',
      backgroundColor: 'rgba(187, 134, 252, 0.1)',
      fill: false,
      tension: 0.4,
      pointRadius: 6,
      pointHoverRadius: 8
    }];
  } else {
    datasets = [
      {
        label: 'CHEMISTRY %',
        data: validExams.map(ex => (ex.scores.chem / ex.maxScores.chem * 100).toFixed(2) || 0),
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'PHYSICS %',
        data: validExams.map(ex => (ex.scores.phy / ex.maxScores.phy * 100).toFixed(2) || 0),
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'BIOLOGY %',
        data: validExams.map(ex => (ex.scores.bio / ex.maxScores.bio * 100).toFixed(2) || 0),
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'MATHS %',
        data: validExams.map(ex => (ex.scores.math / ex.maxScores.math * 100).toFixed(2) || 0),
        borderColor: '#ffeb3b',
        backgroundColor: 'rgba(255, 235, 59, 0.1)',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ];
  }

  const isDarkTheme = !document.body.classList.contains('light-theme');
  const textColor = isDarkTheme ? '#e0e0e0' : '#000000ff';
  const gridColor = isDarkTheme ? 'rgba(51, 51, 51, 0.5)' : 'rgba(105, 105, 105, 0.5)';

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: { size: 12, weight: '600' },
            padding: 20
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
            font: { size: 11 },
            maxRotation: 45,
            minRotation: 0
          },
          grid: {
            color: gridColor,
            drawBorder: false
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: textColor,
            font: { size: 11 },
            stepSize: 10,
            callback: function(value) {
              return value + '%';
            }
          },
          grid: {
            color: gridColor,
            drawBorder: false
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      animation: {
        duration: 800,
        easing: 'easeInOutQuart'
      }
    }
  });
}

// Tab and UI functions
function showTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tab === tabName) {
      btn.classList.add('active');
    }
  });

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });

  document.getElementById(tabName).classList.add('active');
}

function toggleSubject(subjectId) {
  const content = document.getElementById(subjectId);
  const arrow = content.parentNode.querySelector('.toggle-arrow');

  content.classList.toggle('active');

  if (content.classList.contains('active')) {
    arrow.style.transform = 'rotate(180deg)';
  } else {
    arrow.style.transform = 'rotate(0deg)';
  }
}

// Search functionality
function performSearch() {
  const query = document.getElementById('search').value.trim().toLowerCase();
  if (!query) return clearSearch();

  const results = students.filter(stu =>
  stu.name.toLowerCase().includes(query) ||
  stu.roll.toLowerCase().includes(query)
);

const tbody = document.querySelector('#searchTable tbody');
tbody.innerHTML = '';

const sorted = [...results].sort((a, b) => b.cumTotal - a.cumTotal || a.roll.localeCompare(b.roll));

sorted.forEach((stu, i) => {
  const rank = stu.cumTotal > 0 ? i + 1 : '-';
  const tr = document.createElement('tr');

  if (rank >= 1 && rank <= 3 && stu.cumTotal > 0) {
    tr.classList.add('top-performer');
  }

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

document.getElementById('searchCount').textContent = `${results.length} results`;
document.getElementById('searchResults').style.display = 'block';
addClickListeners();
}

function clearSearch() {
  document.getElementById('search').value = '';
  document.getElementById('searchResults').style.display = 'none';
}

// THEME TOGGLE FUNCTIONALITY - FIXED VERSION
function initializeTheme() {
  // Get saved theme from localStorage or default to 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Apply the theme
  setTheme(savedTheme);

  // Update toggle button
  updateThemeToggleButton(savedTheme);
}

function setTheme(theme) {
  const html = document.documentElement;

  // Set the data-color-scheme attribute for CSS targeting
  html.setAttribute('data-color-scheme', theme);

  // Also set a class for additional styling if needed
  document.body.className = document.body.className.replace(/light|dark-theme/g, '');
  document.body.classList.add(`${theme}-theme`);

  // Save to localStorage
  localStorage.setItem('theme', theme);

  // Force re-render of dynamic elements for the last 2 buttons
  setTimeout(() => {
    // Trigger re-styling of Student Categorization if it's visible
    const studentCat = document.getElementById('studentCategorization');
    if (studentCat && studentCat.style.display !== 'none') {
      const content = studentCat.querySelector('.categorization-content');
      if (content) {
        content.style.display = 'none';
        content.offsetHeight; // Force reflow
        content.style.display = 'block';
      }
    }

    // Trigger re-styling of Performance Alerts if it's visible
    const perfAlerts = document.getElementById('performanceAlerts');
    if (perfAlerts && perfAlerts.style.display !== 'none') {
      const content = perfAlerts.querySelector('.alerts-content');
      if (content) {
        content.style.display = 'none';
        content.offsetHeight; // Force reflow
        content.style.display = 'block';
      }
    }
  }, 50);

  console.log(`Theme set to: ${theme}`);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  // Apply new theme
  setTheme(newTheme);

  // Update button
  updateThemeToggleButton(newTheme);

  // Add a smooth transition effect
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

  // Remove transition after animation
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
}

function updateThemeToggleButton(theme) {
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    // Update button content based on theme with proper icons
    if (theme === 'light') {
      toggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for switching to dark mode
      toggleBtn.title = 'Switch to dark mode';
    } else {
      toggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for switching to light mode
      toggleBtn.title = 'Switch to light mode';
    }

    // Add visual feedback
    toggleBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      toggleBtn.style.transform = 'scale(1)';
    }, 150);
  }
}

// Event listener for theme toggle
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  initializeTheme();

  // Add event listener to theme toggle button
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Initialize other functionality
  initializeApp();
});

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Apply saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    toggleTheme();
  }

  // Button event listeners
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  document.getElementById('logoutBtn').addEventListener('click', function() {
    sessionStorage.clear();
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
  });

  // Stats buttons
  document.getElementById('subjectDifficultyBtn').addEventListener('click', () => {
    const panel = document.getElementById('subjectDifficultyDetails');
    const isHidden = window.getComputedStyle(panel).display === 'none';
    panel.style.display = isHidden ? 'block' : 'none';
  });

  document.getElementById('examDetailsBtn').addEventListener('click', () => {
    const panel = document.getElementById('examDetails');
    const currentDisplay = window.getComputedStyle(panel).display;
    panel.style.display = currentDisplay === 'none' ? 'block' : 'none';
  });

  document.getElementById('studentDetailsBtn').addEventListener('click', () => {
    const panel = document.getElementById('studentDetails');
    const currentDisplay = window.getComputedStyle(panel).display;
    panel.style.display = currentDisplay === 'none' ? 'block' : 'none';
  });

  // Search functionality
  document.getElementById('searchButton').addEventListener('click', performSearch);
  document.getElementById('clearSearchButton').addEventListener('click', clearSearch);
  document.getElementById('search').addEventListener('keypress', e => {
    if (e.key === 'Enter') performSearch();
  });

  document.addEventListener("DOMContentLoaded", function() {
    processJsonData(sampleData);
  });

  window.addEventListener('resize', () => {
    Object.values(chartInstances).forEach(chart => {
      chart.resize(); // if using Chart.js or similar
    });
  });

});

// ===============================================================================
// ENHANCED ADMIN PORTAL WITH COLOR-CODED DIFFICULTY SCORES AND IMPROVED UI/UX
// ===============================================================================

// Override populateLast3 to use RT 1, WE 4, WE 5 specifically
function populateLast3() {
  const tbody = document.querySelector('#last3Table tbody');
  tbody.innerHTML = '';

  // Define the last 3 exams that occurred (as specified by user)

  const last3Students = students.map(stu => {
    let total = 0, maxTotal = 0, examsAttempted = 0;

    last3Exams.forEach(examName => {
      const examData = stu.exams.find(ex => ex.exam === examName && ex.maxTotal > 0);
      if (examData) {
        total += examData.total;
        maxTotal += examData.maxTotal;
        examsAttempted++;
      }
    });

    return {
      ...stu,
      last3Total: total,
      last3Percent: maxTotal > 0 ? (total / maxTotal * 100).toFixed(2) : '0.00',
      last3ExamsAttempted: examsAttempted,
      last3MaxTotal: maxTotal
    };
  });

  const sorted = last3Students.sort((a, b) => {
    if (b.last3Total !== a.last3Total) {
      return b.last3Total - a.last3Total;
    }
    return a.roll.localeCompare(b.roll);
  });

  sorted.forEach((stu, i) => {
    const rank = stu.last3Total > 0 ? i + 1 : '-';
    const tr = document.createElement('tr');

    if (rank <= 3 && rank !== '-') {
      tr.classList.add('top-performer');
    }

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

  document.getElementById('last3Count').textContent = `${students.length} students`;
}

// EXAM DIFFICULTY ANALYSIS WITH COLOR CODING
function toggleExamDifficultyAnalysis() {
  const detailsDiv = document.getElementById('examDifficultyDetails');
  const isVisible = detailsDiv && detailsDiv.style.display === 'block';

  hideAllDetailPanels();

  if (!isVisible) {
    detailsDiv.style.display = 'block';
    populateExamDifficultyAnalysis();
  }
}

function populateExamDifficultyAnalysis() {
  const tbody = document.getElementById('examDifficultyTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const examAnalysis = calculateExamDifficulty();

  examAnalysis.forEach((exam) => {
    const tr = document.createElement('tr');

    // Use original table row styling with enhanced colors
    if (exam.difficultyScore >= 8) {
      tr.classList.add('low-performer'); // Reuse existing class
    } else if (exam.difficultyScore <= 3) {
      tr.classList.add('top-performer'); // Reuse existing class
    }

    // Get colors based on existing theme
    const difficultyColor = getDifficultyScoreColor(exam.difficultyScore);
    const remarkColor = getRemarkColor(exam.remark);

    tr.innerHTML = `
    <td style="font-weight: 600;">${exam.name}</td>
    <td>${exam.chemPercent}%</td>
    <td>${exam.phyPercent}%</td>
    <td>${exam.bioPercent}%</td>
    <td>${exam.mathPercent}%</td>
    <td style="font-weight: 700; color: ${difficultyColor}; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
    <span style="display: inline-block; padding: 4px 8px; border-radius: 6px; background: rgba(from ${difficultyColor} r g b / 0.1); border: 1px solid rgba(from ${difficultyColor} r g b / 0.3);">
    ${exam.difficultyScore}/10
    </span>
    </td>
    <td style="font-weight: 700; color: ${remarkColor}; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
    <span style="display: inline-block; padding: 4px 12px; border-radius: 6px; background: rgba(from ${remarkColor} r g b / 0.1); border: 1px solid rgba(from ${remarkColor} r g b / 0.3);">
    ${exam.remark}
    </span>
    </td>
    `;

    tbody.appendChild(tr);
  });
}

function getDifficultyScoreColor(score) {
  // Use existing theme colors for difficulty scoring
  if (score >= 9) return '#dc3545';        // Toughest - Deep Red
  else if (score >= 8) return '#fd7e14';   // Tough - Orange Red
  else if (score >= 7) return '#ffc107';   // Above Average - Yellow
  else if (score >= 6) return '#6f42c1';   // Above Average - Purple
  else if (score >= 5) return '#6c757d';   // Moderate - Gray
  else if (score >= 4) return '#0d6efd';   // Moderate - Blue
  else if (score >= 3) return '#20c997';   // Easy - Teal
  else return '#198754';                   // Very Easy - Green
}

function getRemarkColor(remark) {
  // Use existing theme colors for remarks
  switch (remark) {
    case 'Toughest':
    return '#dc3545'; // Red
    case 'Tough':
    return '#fd7e14'; // Orange Red
    case 'Above Average':
    return '#ffc107'; // Yellow
    case 'Moderate':
    return '#6c757d'; // Gray
    case 'Easy':
    return '#20c997'; // Teal
    case 'Very Easy':
    return '#198754'; // Green
    default:
    return 'var(--color-text)';
  }
}

function calculateExamDifficulty() {
  const examStats = {};

  students.forEach(student => {
    student.exams.forEach(exam => {
      if (exam.maxTotal > 0) {
        if (!examStats[exam.exam]) {
          examStats[exam.exam] = {
            name: exam.exam,
            chemScores: [],
            phyScores: [],
            bioScores: [],
            mathScores: [],
            totalStudents: 0,
            maxScores: exam.maxScores || { chem: 40, phy: 40, bio: 40, math: 40 }
          };
        }

        examStats[exam.exam].chemScores.push(exam.scores ? exam.scores.chem || 0 : 0);
        examStats[exam.exam].phyScores.push(exam.scores ? exam.scores.phy || 0 : 0);
        examStats[exam.exam].bioScores.push(exam.scores ? exam.scores.bio || 0 : 0);
        examStats[exam.exam].mathScores.push(exam.scores ? exam.scores.math || 0 : 0);
        examStats[exam.exam].totalStudents++;
      }
    });
  });

  const examAnalysis = [];
  Object.values(examStats).forEach(examStat => {
    if (examStat.totalStudents > 0) {
      const chemAvg = examStat.chemScores.reduce((sum, score) => sum + score, 0) / examStat.chemScores.length;
      const phyAvg = examStat.phyScores.reduce((sum, score) => sum + score, 0) / examStat.phyScores.length;
      const bioAvg = examStat.bioScores.reduce((sum, score) => sum + score, 0) / examStat.bioScores.length;
      const mathAvg = examStat.mathScores.reduce((sum, score) => sum + score, 0) / examStat.mathScores.length;

      // Only calculate percentages and consider subjects that have maxScore > 0
      let validSubjects = [];
      let totalPercent = 0;

      if (examStat.maxScores.chem > 0) {
        const chemPercent = ((chemAvg / examStat.maxScores.chem) * 100);
        validSubjects.push(chemPercent);
        totalPercent += chemPercent;
      }
      if (examStat.maxScores.phy > 0) {
        const phyPercent = ((phyAvg / examStat.maxScores.phy) * 100);
        validSubjects.push(phyPercent);
        totalPercent += phyPercent;
      }
      if (examStat.maxScores.bio > 0) {
        const bioPercent = ((bioAvg / examStat.maxScores.bio) * 100);
        validSubjects.push(bioPercent);
        totalPercent += bioPercent;
      }
      if (examStat.maxScores.math > 0) {
        const mathPercent = ((mathAvg / examStat.maxScores.math) * 100);
        validSubjects.push(mathPercent);
        totalPercent += mathPercent;
      }

      // Calculate percentages for display (showing "-" for subjects with maxScore = 0)
      const chemPercent = examStat.maxScores.chem > 0 ? ((chemAvg / examStat.maxScores.chem) * 100).toFixed(1) : '-';
      const phyPercent = examStat.maxScores.phy > 0 ? ((phyAvg / examStat.maxScores.phy) * 100).toFixed(1) : '-';
      const bioPercent = examStat.maxScores.bio > 0 ? ((bioAvg / examStat.maxScores.bio) * 100).toFixed(1) : '-';
      const mathPercent = examStat.maxScores.math > 0 ? ((mathAvg / examStat.maxScores.math) * 100).toFixed(1) : '-';

      // Calculate overall average only from valid subjects
      const overallAvg = validSubjects.length > 0 ? totalPercent / validSubjects.length : 0;

      let difficultyScore = 10;
      if (overallAvg >= 80) difficultyScore = 1;
      else if (overallAvg >= 70) difficultyScore = 2;
      else if (overallAvg >= 60) difficultyScore = 3;
      else if (overallAvg >= 50) difficultyScore = 4;
      else if (overallAvg >= 40) difficultyScore = 5;
      else if (overallAvg >= 30) difficultyScore = 6;
      else if (overallAvg >= 25) difficultyScore = 7;
      else if (overallAvg >= 20) difficultyScore = 8;
      else if (overallAvg >= 15) difficultyScore = 9;

      let remark = "Toughest";
      if (difficultyScore <= 2) remark = "Very Easy";
      else if (difficultyScore <= 3) remark = "Easy";
      else if (difficultyScore <= 5) remark = "Moderate";
      else if (difficultyScore <= 7) remark = "Above Average";
      else if (difficultyScore <= 8) remark = "Tough";

      examAnalysis.push({
        name: examStat.name,
        chemPercent,
        phyPercent,
        bioPercent,
        mathPercent,
        difficultyScore,
        remark
      });
    }
  });

  // Sort by exam order
  examAnalysis.sort((a, b) => {
    const indexA = examOrder.indexOf(a.name);
    const indexB = examOrder.indexOf(b.name);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1 && indexB === -1) return -1;
    if (indexA === -1 && indexB !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

  return examAnalysis;
}

// ENHANCED STUDENT CATEGORIZATION WITH IMPROVED UI/UX
function toggleStudentCategorization() {
  const detailsDiv = document.getElementById('studentCategorization');
  const isVisible = detailsDiv && detailsDiv.style.display === 'block';

  hideAllDetailPanels();

  if (!isVisible) {
    detailsDiv.style.display = 'block';
    showLoadingAnimation('studentCategorization');
    setTimeout(() => {
      populateStudentCategorization();
    }, 500);
  }
}

function populateStudentCategorization() {
  const categorization = performStudentCategorization();
  const container = document.querySelector('#studentCategorization .categorization-content');

  if (!container) return;

  // Enhanced UI with stats and animations
  container.innerHTML = `
  <div class="category-stats">
  <div class="stats-summary">
  <div class="stat-box high-performers">
  <div class="stat-number">${categorization.highPerformers.length}</div>
  <div class="stat-label">High Performers</div>
  <div class="stat-icon"><i class="fas fa-trophy"></i></div>
  </div>
  <div class="stat-box at-risk">
  <div class="stat-number">${categorization.atRiskStudents.length}</div>
  <div class="stat-label">At Risk</div>
  <div class="stat-icon"><i class="fas fa-exclamation-triangle"></i></div>
  </div>
  <div class="stat-box improving">
  <div class="stat-number">${categorization.improvingStudents.length}</div>
  <div class="stat-label">Improving</div>
  <div class="stat-icon"><i class="fas fa-angles-up"></i></div>
  </div>
  <div class="stat-box declining">
  <div class="stat-number">${categorization.decliningStudents.length}</div>
  <div class="stat-label">Declining</div>
  <div class="stat-icon"><i class="fas fa-angles-down"></i></div>
  </div>
  </div>
  </div>

  <div class="category-section">
  <h4 class="category-title"><i class="fas fa-trophy"></i> High Performers (${categorization.highPerformers.length})</h4>
  <div class="category-list">
  ${categorization.highPerformers.length === 0 ?
  '<div class="empty-state">No high performers found. Target: ≥70% overall average</div>' :
  categorization.highPerformers.map((student, index) =>
  `<div class="category-item high-performer" style="animation-delay: ${index * 0.1}s;">
  <div class="student-info">
  <strong class="student-name">${student.name}</strong>
  <span class="student-roll">(${student.roll})</span>
  </div>
  <div class="performance-badge high">${student.score.toFixed(1)}%</div>
  <span class="category-reason">${student.reason}</span>
  </div>`
).join('')}
</div>
</div>

<div class="category-section">
<h4 class="category-title"><i class="fas fa-exclamation-triangle"></i> Students at Risk (${categorization.atRiskStudents.length})</h4>
<div class="category-list">
${categorization.atRiskStudents.length === 0 ?
'<div class="empty-state">No students at risk. Keep monitoring!</div>' :
categorization.atRiskStudents.map((student, index) =>
`<div class="category-item at-risk" style="animation-delay: ${index * 0.1}s;">
<div class="student-info">
<strong class="student-name">${student.name}</strong>
<span class="student-roll">(${student.roll})</span>
</div>
<div class="performance-badge risk">${student.score.toFixed(1)}%</div>
<span class="category-reason">${student.reason}</span>
</div>`
).join('')}
</div>
</div>

<div class="category-section">
<h4 class="category-title"><i class="fas fa-chart-line"></i> Improving Students (${categorization.improvingStudents.length})</h4>
<div class="category-list">
${categorization.improvingStudents.length === 0 ?
'<div class="empty-state">No significant improvements detected</div>' :
categorization.improvingStudents.map((student, index) =>
`<div class="category-item improving" style="animation-delay: ${index * 0.1}s;">
<div class="student-info">
<strong class="student-name">${student.name}</strong>
<span class="student-roll">(${student.roll})</span>
</div>
<div class="performance-badge improving">↗️ +${student.improvement?.toFixed(1) || 'N/A'}%</div>
<span class="category-reason">${student.reason}</span>
</div>`
).join('')}
</div>
</div>

<div class="category-section">
<h4 class="category-title"><i class="fas fa-chart-line-down"></i> Declining Students (${categorization.decliningStudents.length})</h4>
<div class="category-list">
${categorization.decliningStudents.length === 0 ?
'<div class="empty-state">No significant declines detected</div>' :
categorization.decliningStudents.map((student, index) =>
`<div class="category-item declining" style="animation-delay: ${index * 0.1}s;">
<div class="student-info">
<strong class="student-name">${student.name}</strong>
<span class="student-roll">(${student.roll})</span>
</div>
<div class="performance-badge declining">↘️ -${student.decline?.toFixed(1) || 'N/A'}%</div>
<span class="category-reason">${student.reason}</span>
</div>`
).join('')}
</div>
</div>
`;
}

// ENHANCED PERFORMANCE ALERTS WITH IMPROVED UI/UX
function togglePerformanceAlerts() {
  const detailsDiv = document.getElementById('performanceAlerts');
  const isVisible = detailsDiv && detailsDiv.style.display === 'block';

  hideAllDetailPanels();

  if (!isVisible) {
    detailsDiv.style.display = 'block';
    showLoadingAnimation('performanceAlerts');
    setTimeout(() => {
      populatePerformanceAlerts();
    }, 500);
  }
}

function populatePerformanceAlerts() {
  const alerts = generatePerformanceAlerts();
  const container = document.querySelector('#performanceAlerts .alerts-content');
  const totalAlerts = Object.values(alerts).flat().length;

  if (!container) return;

  // Update header with enhanced styling
  const header = document.querySelector('#performanceAlerts .panel-header h3');
  if (header) {
    header.innerHTML = `🚨 Performance Alert System <span class="alert-count">(${totalAlerts} alerts)</span>`;
  }

  container.innerHTML = `
  <div class="alerts-summary">
  <div class="alert-stats">
  <div class="alert-stat high-alerts">
  <div class="alert-count-number">${alerts.lowPerformance.length + alerts.suddenDrop.length}</div>
  <div class="alert-count-label">Critical</div>
  </div>
  <div class="alert-stat medium-alerts">
  <div class="alert-count-number">${alerts.missingExam.length}</div>
  <div class="alert-count-label">Medium</div>
  </div>
  <div class="alert-stat positive-alerts">
  <div class="alert-count-number">${alerts.improvementRecognition.length}</div>
  <div class="alert-count-label">Positive</div>
  </div>
  </div>
  </div>

  ${Object.entries(alerts).map(([type, alertList]) =>
  alertList.length > 0 ? `
  <div class="alert-section">
  <h4 class="alert-type-title">${getAlertTypeTitle(type)} <span class="count-badge">${alertList.length}</span></h4>
  <div class="alert-list">
  ${alertList.map((alert, index) =>
  `<div class="alert-item ${alert.severity.toLowerCase()}" style="animation-delay: ${index * 0.1}s;">
  <div class="alert-header">
  <span class="severity-badge ${alert.severity.toLowerCase()}">${alert.severity}</span>
  <div class="alert-priority ${alert.severity.toLowerCase()}">
  ${getSeverityIcon(alert.severity)}
  </div>
  </div>
  <div class="alert-message">
  ${alert.message}
  </div>
  <div class="alert-action">
  <strong>Action Required:</strong> ${alert.action}
  </div>
  <div class="alert-timestamp">
  Generated: ${new Date().toLocaleString()}
  </div>
  </div>`
).join('')}
</div>
</div>` : ''
).join('')}

${totalAlerts === 0 ?
'<div class="no-alerts"><div class="success-icon"><i class="fas fa-check-circle"></i></div><h3>All Clear!</h3><p>No performance alerts detected. Students are performing well.</p></div>' : ''}
`;
}

function getSeverityIcon(severity) {
  switch (severity) {
    case 'HIGH': return '🚨';
    case 'MEDIUM': return '<i class="fas fa-exclamation-triangle"></i>';
    case 'POSITIVE': return '🎉';
    default: return 'ℹ️';
  }
}

function showLoadingAnimation(containerId) {
  const container = document.querySelector(`#${containerId} .${containerId === 'studentCategorization' ? 'categorization-content' : 'alerts-content'}`);
  if (container) {
    container.innerHTML = `
    <div class="loading-animation">
    <div class="spinner"></div>
    <p>Analyzing student data...</p>
    </div>
    `;
  }
}

// Enhanced calculation functions (keeping original logic but adding more detailed metrics)
function performStudentCategorization() {
  const categorization = {
    highPerformers: [],
    atRiskStudents: [],
    improvingStudents: [],
    decliningStudents: []
  };

  students.forEach(student => {
    const overallPercentage = parseFloat(student.cumPercent) || 0;
    const validExams = student.exams.filter(ex => ex.maxTotal > 0);

    // Calculate improvement based on last exam relative to overall average
    let improvementRate = 0;
    if (validExams.length >= 1) {
      const lastExam = validExams[validExams.length - 1];
      const lastPercent = (lastExam.total / lastExam.maxTotal) * 100;

      // Average percentage across all exams (student.cumPercent assumed as float or number)
      const avgPercent = typeof student.cumPercent === 'string' ? parseFloat(student.cumPercent) : student.cumPercent;

      improvementRate = lastPercent - avgPercent;
    }

    // High Performers (>= 70%)
    if (overallPercentage >= 70) {
      categorization.highPerformers.push({
        ...student,
        score: overallPercentage,
        reason: `Excellent overall performance: ${overallPercentage.toFixed(1)}%`
      });
    }

    // At-risk students (< 35% or declining > 15%)
    if (overallPercentage < 35 || improvementRate < -15) {
      categorization.atRiskStudents.push({
        ...student,
        score: overallPercentage,
        reason: overallPercentage < 35 ?
        `Critical performance level: ${overallPercentage.toFixed(2)}%` :
        `Significant performance decline: ${Math.abs(improvementRate).toFixed(1)}% drop`
      });
    }

    // Improving students (> 10% improvement)
    if (improvementRate > 5) {
      categorization.improvingStudents.push({
        ...student,
        improvement: improvementRate,
        reason: `Strong upward trend: ${improvementRate.toFixed(2)}% improvement`
      });
    }

    // Declining students (< -10% but not at-risk)
    if (improvementRate < -5 && overallPercentage >= 35) {
      categorization.decliningStudents.push({
        ...student,
        decline: Math.abs(improvementRate),
        reason: `Performance declining: ${Math.abs(improvementRate).toFixed(2)}% drop`
      });
    }
  });

  return categorization;
}

function generatePerformanceAlerts() {
  const alerts = {
    lowPerformance: [],
    suddenDrop: [],
    improvementRecognition: [],
    missingExam: []
  };

  students.forEach(student => {
    const overallPercentage = parseFloat(student.cumPercent) || 0;
    const validExams = student.exams.filter(ex => ex.maxTotal > 0);
    const attemptedExams = validExams.map(ex => ex.exam);
    const missedExams = examOrder.filter(exam => !attemptedExams.includes(exam));

    // Calculate recent decline
    let recentDecline = 0;
    if (validExams.length >= 1) {
      const lastExam = validExams[validExams.length - 1];
      const lastPercent = (lastExam.total / lastExam.maxTotal) * 100;

      // Average percentage across all exams (student.cumPercent assumed as float or number)
      const avgPercent = typeof student.cumPercent === 'string' ? parseFloat(student.cumPercent) : student.cumPercent;

      recentDecline = avgPercent - lastPercent;
    }

    // Low performance warnings
    if (overallPercentage < 35 && overallPercentage > 0) {
      alerts.lowPerformance.push({
        student,
        severity: overallPercentage < 25 ? 'HIGH' : 'MEDIUM',
        message: `${student.name} (${student.roll}) has critically low performance at ${overallPercentage.toFixed(2)}%`,
        action: overallPercentage < 25 ?
        'Immediate intervention required - schedule parent meeting and create recovery plan' :
        'Monitor closely and provide additional support resources'
      });
    }

    // Sudden drop alerts
    if (recentDecline > 10) {
      alerts.suddenDrop.push({
        student,
        severity: 'HIGH',
        message: `${student.name} (${student.roll}) has experienced a significant performance drop of ${recentDecline.toFixed(2)}%`,
        action: 'Investigate underlying causes, check attendance, and provide counseling support'
      });
    }

    // Calculate improvement by comparing last exam to student cumulative avg
    let improvementRate = 0;
    if (validExams.length >= 1) {
      const lastExam = validExams[validExams.length - 1];
      const lastPercent = (lastExam.total / lastExam.maxTotal) * 100;
      const avgPercent = student.cumPercent; // assuming this is the student's average % over all exams

      improvementRate = lastPercent - avgPercent;
    }

    // Use improvementRate for positive recognition alert
    if (improvementRate > 15) {
      alerts.improvementRecognition.push({
        student,
        severity: 'POSITIVE',
        message: `${student.name} (${student.roll}) has shown excellent improvement of ${improvementRate.toFixed(1)}%`,
        action: 'Acknowledge achievement and maintain current support strategies'
      });
    }
    // Missing exam alerts
    if (missedExams.length >= 2) {
      alerts.missingExam.push({
        student,
        severity: 'MEDIUM',
        message: `${student.name} (${student.roll}) has missed ${missedExams.length} exams: ${missedExams.join(', ')}`,
        action: 'Contact student/parents immediately and arrange makeup exams if possible'
      });
    }
  });

  return alerts;
}

function getAlertTypeTitle(type) {
  const titles = {
    lowPerformance: '📉 Critical Performance Warnings',
    suddenDrop: '⬇️ Sudden Performance Drop',
    improvementRecognition: '🎉 Outstanding Improvements',
    missingExam: '❌ Attendance Issues'
  };
  return titles[type] || type;
}

function hideAllDetailPanels() {
  const panels = [
    'subjectDifficultyDetails',
    'examDetails',
    'studentDetails',
    'examDifficultyDetails',
    'studentCategorization',
    'performanceAlerts'
  ];

  panels.forEach(panelId => {
    const panel = document.getElementById(panelId);
    if (panel) panel.style.display = 'none';
  });
}

// Mobile-friendly utility to open print window
function openPrintWindow(title, content) {
  // Create mobile-optimized print styles
  const printStyles = `
  <style>
  @media print {
    body * { visibility: hidden; }
    .print-content, .print-content * { visibility: visible; }
    .print-content { position: absolute; left: 0; top: 0; width: 100%; }
  }
  .print-content {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 97%;
    margin: 20px;
    background: white;
    color: black;
  }
  .print-header {
    text-align: center;
    border-bottom: 3px solid #2c5aa0;
    padding-bottom: 15px;
    margin-bottom: 25px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 10px;
    padding: 20px;
  }
  .print-header img {
    width: 150px;
    height: auto;
    margin-bottom: 10px;
  }
  .print-header h1 {
    margin: 12px 0;
    font-size: 20pt;
    color: #2c5aa0;
    font-weight: 700;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  }
  .enhanced-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 4px;
    font-size: 10pt;
    margin-top: 15px;
  }
  .enhanced-table thead tr {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: skew(-2deg);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  .enhanced-table thead th {
    padding: 12px 8px;
    font-weight: 700;
    text-align: center;
    border: none;
    font-size: 10pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transform: skew(2deg);
  }
  .enhanced-table tbody tr {
    background: white;
    transform: skew(-1deg);
    transition: all 0.3s ease;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    margin-bottom: 2px;
  }
  .enhanced-table tbody tr:nth-child(even) {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  }
  .enhanced-table tbody tr:nth-child(odd) {
    background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  }
  .enhanced-table tbody tr:hover {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    transform: skew(-1deg) translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  .enhanced-table tbody td {
    padding: 10px 8px;
    border: none;
    transform: skew(1deg);
    border-left: 3px solid transparent;
  }
  /* Rank column styling */
  .enhanced-table tbody td:nth-child(1) {
    text-align: center;
    font-weight: 700;
    color: #1e40af;
    background: rgba(59, 130, 246, 0.1);
    border-left: 3px solid #3b82f6;
    font-size: 11pt;
  }
  /* Roll number styling */
  .enhanced-table tbody td:nth-child(2) {
    text-align: center;
    font-weight: 600;
    color: #374151;
  }
  /* Name column - left aligned */
  .enhanced-table tbody td:nth-child(3) {
    text-align: left;
    font-weight: 600;
    color: #1f2937;
    padding-left: 12px;
  }
  /* Subject scores - center aligned */
  .enhanced-table tbody td:nth-child(4),
  .enhanced-table tbody td:nth-child(5),
  .enhanced-table tbody td:nth-child(6),
  .enhanced-table tbody td:nth-child(7) {
    text-align: center;
    color: #4b5563;
    font-weight: 500;
  }
  /* Total score column - bold and highlighted */
  .enhanced-table tbody td:nth-child(8) {
    text-align: center;
    font-weight: 700;
    color: #059669;
    background: rgba(16, 185, 129, 0.1);
    border-left: 3px solid #10b981;
    font-size: 11pt;
  }
  /* Percentage column - bold and highlighted */
  .enhanced-table tbody td:nth-child(9) {
    text-align: center;
    font-weight: 700;
    color: #dc2626;
    background: rgba(239, 68, 68, 0.1);
    border-left: 3px solid #ef4444;
    font-size: 11pt;
  }
  /* Top 3 rank special styling */
  .enhanced-table tbody tr:nth-child(1) td:nth-child(1) {
    background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
    color: #92400e;
    border-left: 4px solid #f59e0b;
  }
  .enhanced-table tbody tr:nth-child(2) td:nth-child(1) {
    background: linear-gradient(135deg, #c0c0c0 0%, #e5e7eb 100%);
    color: #374151;
    border-left: 4px solid #6b7280;
  }
  .enhanced-table tbody tr:nth-child(3) td:nth-child(1) {
    background: linear-gradient(135deg, #cd7f32 0%, #f97316 100%);
    color: #ffffff;
    border-left: 4px solid #ea580c;
  }
  @media (max-width: 600px) {
    .print-content { margin: 10px; }
    .enhanced-table { font-size: 9pt; }
    .enhanced-table th, .enhanced-table td { padding: 6px 4px; }
    .print-header img { width: 70px; }
    .print-header h1 { font-size: 16pt; }
  }

  </style>
  `;

  // Create new window for better mobile compatibility
  const printWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');

  if (!printWindow) {
    // Fallback for popup blockers
    alert('Please allow popups and try again, or use the download option.');
    return;
  }

  printWindow.document.write(`
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${printStyles}
  </head>
  <body>
  <div class="print-content">
  <div class="print-header">
  <img src="logo.png" alt="Logo">
  <h1>${title}</h1>
  </div>
  ${content}
  </div>
  </div>
  </body>
  </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  // Auto-print after a small delay (works better on mobile)
  setTimeout(() => {
    try {
      printWindow.print();
    } catch (e) {
      console.log('Auto-print failed, user can use manual button');
    }
  }, 1000);
}

// Updated functions remain the same, just call the improved openPrintWindow
function printOverallRanklist() {
  const table = document.querySelector("#overallRank table");
  if (!table) return alert("Overall ranklist not available!");
  openPrintWindow("OVERALL RANKLIST", table.outerHTML);
}

function printLast3Ranklist() {
  const table = document.querySelector("#last3Rank table");
  if (!table) return alert("Last 3 exams ranklist not available!");
  openPrintWindow("LAST 3 EXAMS RANKLIST", table.outerHTML);
}


// Enhanced Print Dialog Functions with Exam Selection Modal
let currentPrintType = '';

// Make sure filter variables exist
if (typeof currentOverallFilter === 'undefined') {
    var currentOverallFilter = 'all';
}
if (typeof currentLast3Filter === 'undefined') {
    var currentLast3Filter = 'all';
}

function openOverallPrintDialog() {
  currentPrintType = 'overall';
  document.getElementById('printDialogTitle').textContent = 'Print Overall Ranklist';
  document.getElementById('printFilterDialog').style.display = 'flex';
  // Reset to 'all' selection
  document.querySelector('input[name="printFilter"][value="all"]').checked = true;
}

function openLast3PrintDialog() {
  currentPrintType = 'last3';
  document.getElementById('printDialogTitle').textContent = 'Print Last 3 Exams Ranklist';
  document.getElementById('printFilterDialog').style.display = 'flex';
  // Reset to 'all' selection
  document.querySelector('input[name="printFilter"][value="all"]').checked = true;
}

function closePrintFilterDialog() {
  document.getElementById('printFilterDialog').style.display = 'none';
  currentPrintType = '';
}

function executePrint() {
  const selectedFilter = document.querySelector('input[name="printFilter"]:checked');
  if (!selectedFilter) {
    alert('Please select a filter option');
    return;
  }

  const filterValue = selectedFilter.value;

  if (currentPrintType === 'overall') {
    printOverallRanklistWithFilter(filterValue);
  } else if (currentPrintType === 'last3') {
    printLast3RanklistWithFilter(filterValue);
  }

  closePrintFilterDialog();
}

function printOverallRanklistWithFilter(filterType) {
  console.log('Printing overall ranklist with filter:', filterType);

  // Store the current filter to restore later
  const originalFilter = currentOverallFilter || 'all';

  // Apply the print filter if it's different from current
  if (filterType !== originalFilter) {
    console.log('Applying filter:', filterType);
    filterOverallRanklist(filterType);
  }

  // Wait a moment for the filter to be applied, then get the table
  setTimeout(() => {
    const table = document.querySelector("#overallRank table");
    if (!table) {
      alert("Overall ranklist not available!");
      return;
    }

    // Create title with filter info
    let title = "OVERALL RANKLIST";
    if (filterType === 'RT') {
      title += " (RT ONLY)";
    } else if (filterType === 'WE') {
      title += " (WE ONLY)";  
    }

    console.log('Opening print window with title:', title);
    openPrintWindow(title, table.outerHTML);

    // Restore original filter after a delay
    setTimeout(() => {
      if (originalFilter !== filterType) {
        console.log('Restoring original filter:', originalFilter);
        filterOverallRanklist(originalFilter);
      }
    }, 1000);
  }, 200);
}

function printLast3RanklistWithFilter(filterType) {
  console.log('Printing last 3 ranklist with filter:', filterType);

  // Store the current filter to restore later
  const originalFilter = currentLast3Filter || 'all';

  // Apply the print filter if it's different from current
  if (filterType !== originalFilter) {
    console.log('Applying filter:', filterType);
    filterLast3Ranklist(filterType);
  }

  // Wait a moment for the filter to be applied, then get the table
  setTimeout(() => {
    const table = document.querySelector("#last3Rank table");
    if (!table) {
      alert("Last 3 exams ranklist not available!");
      return;
    }

    // Create title with filter info
    let title = "LAST 3 EXAMS RANKLIST";
    if (filterType === 'RT') {
      title += " (RT ONLY)";
    } else if (filterType === 'WE') {
      title += " (WE ONLY)";
    }

    console.log('Opening print window with title:', title);
    openPrintWindow(title, table.outerHTML);

    // Restore original filter after a delay
    setTimeout(() => {
      if (originalFilter !== filterType) {
        console.log('Restoring original filter:', originalFilter);
        filterLast3Ranklist(originalFilter);
      }
    }, 1000);
  }, 200);
}

// Enhanced Exam Selection Modal Functions
function openExamSelectionDialog() {
  // Get available exams from the data
  const exams = [...new Set(sampleData.map(d => d.exam))];

  // Sort exams by the predefined order
  const examOrder = ['WE 1', 'WE 2', 'WE 3', 'RT 1', 'WE 4', 'WE 5', 'WE 6', 'RT 2', 'WE 7'];
  const sortedExams = exams.sort((a, b) => {
    const indexA = examOrder.indexOf(a);
    const indexB = examOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1 && indexB === -1) return -1;
    if (indexA === -1 && indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  // Populate the exam selection grid
  const grid = document.getElementById('examSelectionGrid');
  grid.innerHTML = '';

  sortedExams.forEach(exam => {
    // Check if this exam has data
    const examData = sampleData.filter(d => d.exam === exam && d.maxTotal > 0);
    const hasData = examData.length > 0;

    const examButton = document.createElement('button');
    examButton.className = hasData ? 'exam-option' : 'exam-option disabled';
    examButton.onclick = hasData ? () => selectAndPrintExam(exam) : null;
    examButton.disabled = !hasData;

    examButton.innerHTML = `
      <div class="exam-icon">
        <i class="fas ${exam.startsWith('RT') ? 'fa-clock' : 'fa-calendar-week'}"></i>
      </div>
      <div class="exam-info">
        <span class="exam-name">${exam}</span>
        <span class="exam-students">${examData.length} students</span>
      </div>
    `;

    grid.appendChild(examButton);
  });

  document.getElementById('examSelectionDialog').style.display = 'flex';
}

function closeExamSelectionDialog() {
  document.getElementById('examSelectionDialog').style.display = 'none';
}

function selectAndPrintExam(examName) {
  console.log('Printing exam:', examName);

  // Close the dialog first
  closeExamSelectionDialog();

  // Get exam data
  const examData = sampleData.filter(d => d.exam === examName && d.maxTotal > 0);
  if (examData.length === 0) {
    alert("No data available for selected exam");
    return;
  }

  // Create the ranklist HTML
  let html = `<table class='enhanced-table'><thead><tr>
  <th>Rank</th><th>R. No</th><th>Name</th><th>Chm</th><th>Phy</th><th>Bio</th><th>Mth</th><th>Total</th><th>%</th>
  </tr></thead><tbody>`;

  examData
  .sort((a, b) => b.percent - a.percent)
  .forEach((d, i) => {
    html += `<tr>
    <td>${i + 1}</td><td>${d.roll}</td><td>${d.name}</td>
    <td>${d.chem}</td><td>${d.phy}</td><td>${d.bio}</td><td>${d.math}</td>
    <td>${d.total}</td><td>${d.percent.toFixed(2)}%</td>
    </tr>`;
  });

  html += '</tbody></table>';

  openPrintWindow(`${examName} RANKLIST`, html);
}


// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    // Re-populate last3 with corrected logic
    if (typeof populateStats === 'function') {
      populateStats();
    }
  }, 100);
});

// Initialize app function
function initializeApp() {
  // Process data and initialize all components
  processJsonData(sampleData);

  // Add any additional initialization here
  console.log('Enhanced Admin Portal initialized successfully!');
}

// ============= PRINT & EXPORT FUNCTIONALITY =============

// Initialize Print & Export Feature
function initializePrintExport() {
  const printExportBtn = document.getElementById('printExportBtn');
  const printStudentProfileBtn = document.getElementById('printStudentProfileBtn');

  if (printExportBtn) {
    printExportBtn.addEventListener('click', openPrintExportModal);
  }

  if (printStudentProfileBtn) {
    printStudentProfileBtn.addEventListener('click', printSelectedStudentProfile);
  }
}

// Open Print & Export Modal
function openPrintExportModal() {
  const modal = document.getElementById('printExportModal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

// Close Print & Export Modal
function closePrintExportModal() {
  const modal = document.getElementById('printExportModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// PRINT EXPORT MODAL FUNCTIONS
function initializePrintExport() {
  const printExportBtn = document.getElementById('printExportBtn');
  if (printExportBtn) {
    printExportBtn.addEventListener('click', openPrintExportModal);
  }

  // Initialize print student profile button specifically
  const printStudentProfileBtn = document.getElementById('printStudentProfileBtn');
  if (printStudentProfileBtn) {
    printStudentProfileBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const select = document.getElementById('studentProfileSelect');
      if (!select || !select.value) {
        alert('Please select a student first!');
        return;
      }
      const roll = select.value;
      const student = students.find(s => s.roll === roll);
      if (!student) {
        alert('Student not found!');
        return;
      }
      printStudentProfileReport(student);
      closeStudentProfileModal();
    });
  }
}

function openPrintExportModal() {
  const modal = document.getElementById('printExportModal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closePrintExportModal() {
  const modal = document.getElementById('printExportModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function selectStudentForProfile() {
  closePrintExportModal();
  const modal = document.getElementById('studentProfileModal');
  const select = document.getElementById('studentProfileSelect');

  if (modal && select) {
    // Populate student dropdown sorted by roll number
    select.innerHTML = '<option value="">Select a student...</option>';

    if (students && students.length > 0) {
      // Sort students by roll ascending (numerically if roll contains numbers)
      const sortedStudents = [...students].sort((a, b) => {
        // Extract numeric part from roll if any, fallback to string
        const aNum = parseInt(a.roll.replace(/\D/g, ''), 10);
        const bNum = parseInt(b.roll.replace(/\D/g, ''), 10);

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return aNum - bNum;
        } else {
          return a.roll.localeCompare(b.roll);
        }
      });

      sortedStudents.forEach(student => {
        const option = document.createElement('option');
        option.value = student.roll;
        option.textContent = `${student.name} (${student.roll})`;
        select.appendChild(option);
      });
    }
    modal.style.display = 'flex';
  }

}

function closeStudentProfileModal() {
  const modal = document.getElementById('studentProfileModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function printStudentProfileReport(student) {
  const totalExams = student.exams.length;
  const totalScore = student.cumTotal;
  const maxPossibleScore = student.cumMax;
  const averagePercent = parseFloat(student.cumPercent);

  const printContent = `
  <div class="student-profile-print">
  <div class="print-header">
  <img src="logo.png" style="width:150px; margin:10px auto;display:block;" alt="Institute Logo">
  <h1 style="text-align:center;">REPEATERS BATCH 2025-26</h1>
  <i>Student Performance Report</i>
  <p><i>Generated on: ${new Date().toLocaleDateString()}</i></p>
  </div>

  <div class="profile-section">
  <h3>Student Information</h3>
  <p><strong>Name:</strong> ${student.name}</p>
  <p><strong>Roll Number:</strong> ${student.roll}</p>
  <p><strong>Total Exams Attempted:</strong> ${totalExams}</p>
  <p><strong>Overall Percentage:</strong> ${averagePercent.toFixed(2)}%</p>
  </div>

  <div class="profile-section">
  <h3>Performance Summary</h3>
  <div class="performance-summary">
  <p><strong>Total Score:</strong> ${totalScore} / ${maxPossibleScore}</p>
  <p><strong>Average Score:</strong> ${(totalScore / Math.max(totalExams, 1)).toFixed(2)}</p>
  <p><strong>Strong Subjects:</strong> <span style="color:green; font-weight:600;">${student.strongSubject.join(', ')}</span></p>
  <p><strong>Weak Subjects:</strong> <span style="color:red; font-weight:600;">${student.weakSubject.join(', ')}</span></p>
  </div>
  </div>

  <div class="profile-section">
  <h3>Subject-wise Performance</h3>
  <table style="width:100%;border-collapse:collapse;">
  <thead>
  <tr>
  <th style="border:1px solid #ccc;padding:8px;background:#f5f5f5;">SUBJECT</th>
  <th style="border:1px solid #ccc;padding:8px;background:#f5f5f5;">AVG %</th>
  <th style="border:1px solid #ccc;padding:8px;background:#f5f5f5;">PERFORMANCE</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td style="border:1px solid #ccc;padding:8px;">Chemistry</td>
  <td style="border:1px solid #ccc;padding:8px;">${student.subjectAverages.chem}%</td>
  <td style="border:1px solid #ccc;padding:8px;">${getPerformanceLevel(student.subjectAverages.chem)}</td>
  </tr>
  <tr>
  <td style="border:1px solid #ccc;padding:8px;">Physics</td>
  <td style="border:1px solid #ccc;padding:8px;">${student.subjectAverages.phy}%</td>
  <td style="border:1px solid #ccc;padding:8px;">${getPerformanceLevel(student.subjectAverages.phy)}</td>
  </tr>
  <tr>
  <td style="border:1px solid #ccc;padding:8px;">Biology</td>
  <td style="border:1px solid #ccc;padding:8px;">${student.subjectAverages.bio}%</td>
  <td style="border:1px solid #ccc;padding:8px;">${getPerformanceLevel(student.subjectAverages.bio)}</td>
  </tr>
  <tr>
  <td style="border:1px solid #ccc;padding:8px;">Mathematics</td>
  <td style="border:1px solid #ccc;padding:8px;">${student.subjectAverages.math}%</td>
  <td style="border:1px solid #ccc;padding:8px;">${getPerformanceLevel(student.subjectAverages.math)}</td>
  </tr>
  </tbody>
  </table>
  </div>

  <div class="profile-section">
  <h3>Exam-wise Performance</h3>
  <table style="width:100%;border-collapse:collapse;">
  <thead>
  <tr>
  <th style="border:1px solid #ccc;padding:8px;background:#f5f5f5;">Exam</th>
  <th style="border:1px solid #ccc;padding:8px;background:#f5f5f5;">Rank</th>
  <th style="border:1px solid #ccc;padding:8px;background:#f5f5f5;">Chm</th>
  <th style="border:1px solid #ccc;padding:8px;background:#f5f5f5;">Phy</th>
  <th style="border:1px solid #ccc;padding:8px;background:#f5f5f5;">Bio</th>
  <th style="border:1px solid #ccc;padding:8px;background:#f5f5f5;">Mth</th>
  <th style="border:1px solid #ccc;padding:8px;background:#f5f5f5;">Total</th>
  <th style="border:1px solid #ccc;padding:8px;background:#f5f5f5;">%</th>
  </tr>
  </thead>
  <tbody>
  ${student.exams.map(exam => `
  <tr>
  <td style="border:1px solid #ccc;padding:8px;">${exam.exam}</td>
  <td style="border:1px solid #ccc;padding:8px;">${getExamRank(student, exam.exam)}</td>
  ${exam.maxTotal === 0
  ? `<td colspan="6" style="border:1px solid #ccc;padding:8px;text-align:center; color:red">Not Attempted</td>`
  : `
  <td style="border:1px solid #ccc;padding:8px;">${exam.scores.chem}/${exam.maxScores.chem}</td>
  <td style="border:1px solid #ccc;padding:8px;">${exam.scores.phy}/${exam.maxScores.phy}</td>
  <td style="border:1px solid #ccc;padding:8px;">${exam.scores.bio}/${exam.maxScores.bio}</td>
  <td style="border:1px solid #ccc;padding:8px;">${exam.scores.math}/${exam.maxScores.math}</td>
  <td style="border:1px solid #ccc;padding:8px;">${exam.total}/${exam.maxTotal}</td>
  <td style="border:1px solid #ccc;padding:8px;">${exam.percent.toFixed(2)}%</td>
  `}
  </tr>
  `).join('')}

  </table>
  </div>

  <div class="profile-section">
  <h3>Recommendations</h3>
  <div class="performance-summary">
  <p><strong>Areas for Improvement:</strong> Focus on ${student.weakSubject.join(' and ')} to boost overall performance.</p>
  <p><strong>Strengths to Maintain:</strong> Continue excellent work in ${student.strongSubject.join(' and ')}.</p>
  </div>
  </div>
  </div>
  `;

  function printContentDirect(content) {
    // Create hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
    <html>
    <head>
    <title>Print Preview</title>
    <style>
    /* Your print styles here */
    body { margin: 20px; font-family: Arial, sans-serif; }
    .student-profile-print { /* ... your styles ... */ }
    /* Other styles... */
    </style>
    </head>
    <body>${content}</body>
    </html>`);
    iframeDoc.close();

    iframe.onload = function() {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    };
  }

  printContentDirect(printContent);

}

function getPerformanceLevel(percentage) {
  const percent = parseFloat(percentage);
  if (percent >= 80) return 'Excellent';
  if (percent >= 65) return 'Good';
  if (percent >= 50) return 'Average';
  if (percent >= 35) return 'Below Average';
  return 'Needs Improvement';
}

// Footer functionality
function updateFooterStats() {
    try {
        // Update student count
        const studentCount = getUniqueStudents ? getUniqueStudents().length : 39;
        const footerStudentElement = document.getElementById('footerStudentCount');
        if (footerStudentElement) {
            footerStudentElement.textContent = `${studentCount} Students`;
        }
        
        // Update exam count  
        const examCount = getUniqueExams ? getUniqueExams().length : 9;
        const footerExamElement = document.getElementById('footerExamCount');
        if (footerExamElement) {
            footerExamElement.textContent = `${examCount} Exams`;
        }
        
        // Update last updated time
        const lastUpdatedElement = document.getElementById('lastUpdated');
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = new Date().toLocaleString();
        }
        
        // Update total records
        const totalRecordsElement = document.getElementById('totalRecords');
        if (totalRecordsElement) {
            const recordCount = typeof students !== 'undefined' ? students.length : 0;
            totalRecordsElement.textContent = recordCount;
        }
    } catch (error) {
        console.log('Footer stats update error:', error);
    }
}

// Refresh all data function
function refreshAllData() {
    if (typeof showLoadingOverlay === 'function') {
        showLoadingOverlay();
    }
    
    setTimeout(() => {
        updateFooterStats();
        if (typeof hideLoadingOverlay === 'function') {
            hideLoadingOverlay();
        }
        alert('Data refreshed successfully!');
    }, 1000);
}

// Export all data function
function exportAllData() {
    alert('Exporting all data... This feature will be implemented soon!');
}

// Initialize footer when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure other scripts have loaded
    setTimeout(() => {
        updateFooterStats();
    }, 500);
    
    // Update footer stats every 30 seconds
    setInterval(updateFooterStats, 30000);
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    initializePrintExport();
  }, 1000);
});

