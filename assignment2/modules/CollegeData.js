const fs = require('fs');  // Import the fs module
// Define a Data class to hold students and courses data
class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}
// Initialize dataCollection to null, which will later hold an instance of Data
let dataCollection = null;
// Function to initialize the data by reading students and courses from JSON files
const initialize = () => {
    return new Promise((resolve, reject) => {
        // Read the students.json file
        fs.readFile('./data/students.json', 'utf8', (err, studentData) => {
            if (err) {
                return reject("Unable to load students.json"); // Reject the promise if there is an error reading the file
            }

            let students;
            try {
                students = JSON.parse(studentData);   // Parse the students JSON data
            } catch (e) {
                return reject("Error parsing students.json");  // Reject the promise if there is an error parsing the JSON data
            }
            // Read the courses.json file
            fs.readFile('./data/courses.json', 'utf8', (err, courseData) => {
                if (err) {
                    return reject("Unable to load courses.json");  // Reject the promise if there is an error reading the file
                }

                let courses;
                try {
                    courses = JSON.parse(courseData); // Parse the courses JSON data
                } catch (e) {
                    return reject("Error parsing courses.json"); // Reject the promise if there is an error parsing the JSON data
                }

                dataCollection = new Data(students, courses);  // Create a new Data instance with the parsed students and courses data
                resolve();  // Resolve the promise indicating initialization is complete
            });
        });
    });
};
// Function to get all students
const getAllStudents = () => {
    return new Promise((resolve, reject) => {
        if (!dataCollection || dataCollection.students.length === 0) {   // Check if dataCollection is initialized and contains students
            return reject("No students found");  // Reject the promise if no students are found
        }
        resolve(dataCollection.students);  // Resolve the promise with the students data
    });
};

const getTAs = () => {  // Function to get all TAs
    return new Promise((resolve, reject) => {
        if (!dataCollection) {  // Check if dataCollection is initialized
            return reject("Data not initialized");  // Reject the promise if data is not initialized
        }

        const TAs = dataCollection.students.filter(student => student.TA === true);   // Filter students to find TAs
        if (TAs.length === 0) {   // Check if any TAs are found
            return reject("No TAs found");  // Reject the promise if no TAs are found
        }
        resolve(TAs);  // Resolve the promise with the TAs data
    });
};
// Function to get all courses
const getCourses = () => {
    return new Promise((resolve, reject) => {
        if (!dataCollection || dataCollection.courses.length === 0) {  // Check if dataCollection is initialized and contains courses
            return reject("No courses found");  // Reject the promise if no courses are found
        }
        resolve(dataCollection.courses);  // Resolve the promise with the courses data
    });
};
// Export the functions to be used in other modules
module.exports = {
    initialize,
    getAllStudents,
    getTAs,
    getCourses
};
