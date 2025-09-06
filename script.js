// Enhanced script.js for JSON data input with improved UI/UX - Original Color Scheme
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

// Sample data for testing
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
                        {"roll": "CYL05", "name": "ANJANA PRASAD", "exam": "WE 3", "chem": 0, "phy": 0, "bio": 0, "math": 0, "total": 0, "percent": 0, "maxTotal": 0, "maxChem": 0, "maxPhy": 0, "maxBio": 0, "maxMath": 0}
];

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

// JSON Data Processing
function validateJsonData(data) {
    if (!Array.isArray(data)) {
        throw new Error('Data must be an array');
    }
    
    const requiredFields = ['roll', 'name', 'exam', 'chem', 'phy', 'bio', 'math', 'total', 'percent', 'maxTotal', 'maxChem', 'maxPhy', 'maxBio', 'maxMath'];
    
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        for (const field of requiredFields) {
            if (!(field in row)) {
                throw new Error(`Missing required field '${field}' in row ${i + 1}`);
            }
        }
        
        // Type validation
        const numericFields = ['chem', 'phy', 'bio', 'math', 'total', 'percent', 'maxTotal', 'maxChem', 'maxPhy', 'maxBio', 'maxMath'];
        for (const field of numericFields) {
            if (typeof row[field] !== 'number') {
                throw new Error(`Field '${field}' must be a number in row ${i + 1}`);
            }
        }
        
        const stringFields = ['roll', 'name', 'exam'];
        for (const field of stringFields) {
            if (typeof row[field] !== 'string' || row[field].trim() === '') {
                throw new Error(`Field '${field}' must be a non-empty string in row ${i + 1}`);
            }
        }
    }
    
    return true;
}

function processJsonData(data) {
    showLoading();
    
    try {
        validateJsonData(data);
        
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
        showStatus(`Successfully loaded ${students.length} students with ${data.length} exam records`, 'success');
        
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

// Populate last 3 exams ranklist
function populateLast3() {
    const tbody = document.querySelector('#last3Table tbody');
    tbody.innerHTML = '';
    
    const last3Students = students.map(stu => {
        const last3Exams = stu.exams.filter(ex => ex.maxTotal > 0).slice(-3);
        let total = 0, maxTotal = 0;
        
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
        
        if (rank >= 1 && rank <= 3 && stu.last3Total > 0) {
            tr.classList.add('top-performer');
        }
        
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
    
    document.getElementById('last3Count').textContent = `${students.length} students`;
}

// Populate subject ranklist
function populateSubject(tableId, sub) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    tbody.innerHTML = '';
    
    const sorted = [...students]
        .filter(s => s.subjectMaxTotals[sub] > 0)
        .sort((a, b) => {
            const percB = b.subjectMaxTotals[sub] > 0 ? (b.subjectTotals[sub] / b.subjectMaxTotals[sub]) * 100 : 0;
            const percA = a.subjectMaxTotals[sub] > 0 ? (a.subjectTotals[sub] / a.subjectMaxTotals[sub]) * 100 : 0;
            return percB - percA || a.roll.localeCompare(b.roll);
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
        (students.reduce((sum, stu) => sum + parseFloat(stu.cumPercent), 0) / students.length).toFixed(1) : 0;
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
    
    allExams.sort().forEach(exam => {
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
        
        ['chem', 'phy', 'bio', 'math'].forEach(sub => {
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
            <table>
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
            const cPct = ex.maxScores.chem ? (ex.scores.chem / ex.maxScores.chem * 100).toFixed(2) : '0.00';
            const pPct = ex.maxScores.phy ? (ex.scores.phy / ex.maxScores.phy * 100).toFixed(2) : '0.00';
            const bPct = ex.maxScores.bio ? (ex.scores.bio / ex.maxScores.bio * 100).toFixed(2) : '0.00';
            const mPct = ex.maxScores.math ? (ex.scores.math / ex.maxScores.math * 100).toFixed(2) : '0.00';
            
            content += `
                <tr>
                    <td>${ex.exam}</td>
                    <td>${rank}</td>
                    <td>${ex.scores.chem} | ${cPct}%</td>
                    <td>${ex.scores.phy} | ${pPct}%</td>
                    <td>${ex.scores.bio} | ${bPct}%</td>
                    <td>${ex.scores.math} | ${mPct}%</td>
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
        
        const cPct = ex.maxScores.chem ? (ex.scores.chem / ex.maxScores.chem * 100).toFixed(2) : '0.00';
        const pPct = ex.maxScores.phy ? (ex.scores.phy / ex.maxScores.phy * 100).toFixed(2) : '0.00';
        const bPct = ex.maxScores.bio ? (ex.scores.bio / ex.maxScores.bio * 100).toFixed(2) : '0.00';
        const mPct = ex.maxScores.math ? (ex.scores.math / ex.maxScores.math * 100).toFixed(2) : '0.00';
        
        const rowClass = rank <= 3 && rank !== '-' ? ' class="top-performer"' : '';
        
        content += `
            <tr${rowClass}>
                <td>${rank}</td>
                <td>${stu.roll}</td>
                <td>${stu.name}</td>
                <td>${ex.scores.chem} | ${cPct}%</td>
                <td>${ex.scores.phy} | ${pPct}%</td>
                <td>${ex.scores.bio} | ${bPct}%</td>
                <td>${ex.scores.math} | ${mPct}%</td>
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
    const textColor = isDarkTheme ? '#e0e0e0' : '#333';
    const gridColor = isDarkTheme ? 'rgba(51, 51, 51, 0.5)' : 'rgba(204, 204, 204, 0.5)';

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
    
    // Set the data-color-scheme attribute
    html.setAttribute('data-color-scheme', theme);
    
    // Also set a class for additional styling if needed
    document.body.className = document.body.className.replace(/\b(light|dark)-theme\b/g, '');
    document.body.classList.add(`${theme}-theme`);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
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
        // Update button content based on theme
        if (theme === 'light') {
            toggleBtn.innerHTML = '🌙'; // Moon icon for dark mode
            toggleBtn.title = 'Switch to dark mode';
        } else {
            toggleBtn.innerHTML = '☀️'; // Sun icon for light mode
            toggleBtn.title = 'Switch to light mode';
        }
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
        window.location.href = 'student-login.html';
    });

    // Data input buttons
    document.getElementById('sampleDataBtn').addEventListener('click', () => {
        processJsonData(sampleData);
    });

    document.getElementById('customDataBtn').addEventListener('click', () => {
        const container = document.getElementById('customDataContainer');
        container.style.display = container.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('clearDataBtn').addEventListener('click', () => {
        students = [];
        populateOverall();
        populateLast3();
        ['chem', 'phy', 'bio', 'math'].forEach(sub => populateSubject(`${sub}Table`, sub));
        populateStats();
        showStatus('All data cleared', 'success');
    });

    document.getElementById('loadDataBtn').addEventListener('click', () => {
        const input = document.getElementById('dataInput').value.trim();
        
        if (!input) {
            showStatus('Please enter JSON data first', 'error');
            return;
        }

        try {
            const data = JSON.parse(input);
            processJsonData(data);
            document.getElementById('customDataContainer').style.display = 'none';
        } catch (error) {
            showStatus(`Invalid JSON format: ${error.message}`, 'error');
        }
    });

    document.getElementById('validateDataBtn').addEventListener('click', () => {
        const input = document.getElementById('dataInput').value.trim();
        
        if (!input) {
            showStatus('Please enter JSON data first', 'error');
            return;
        }

        try {
            const data = JSON.parse(input);
            validateJsonData(data);
            showStatus(`Valid JSON format! Found ${data.length} records`, 'success');
        } catch (error) {
            showStatus(`Validation failed: ${error.message}`, 'error');
        }
    });

    document.getElementById('cancelInputBtn').addEventListener('click', () => {
        document.getElementById('customDataContainer').style.display = 'none';
        document.getElementById('dataInput').value = '';
    });

    // Stats buttons
    document.getElementById('subjectDifficultyBtn').addEventListener('click', () => {
        const panel = document.getElementById('subjectDifficultyDetails');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('examDetailsBtn').addEventListener('click', () => {
        const panel = document.getElementById('examDetails');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('studentDetailsBtn').addEventListener('click', () => {
        const panel = document.getElementById('studentDetails');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });

    // Search functionality
    document.getElementById('searchButton').addEventListener('click', performSearch);
    document.getElementById('clearSearchButton').addEventListener('click', clearSearch);
    document.getElementById('search').addEventListener('keypress', e => {
        if (e.key === 'Enter') performSearch();
    });

    // Initialize with empty data
    processJsonData([]);
    showTab('overall');
});
