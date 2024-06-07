/*********************************************************************************
*  WEB700 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
*  
*  Name: Jaya Nandhini Kannan Student ID: 161496237 Date: 06/07/2024
*
********************************************************************************/
// Require the collegeData module which presumably contains methods to initialize and fetch data
const collegeData = require('./modules/collegeData');

// Start the initialization process
collegeData.initialize()
    .then(function() {
        // If initialization is successful, log a success message
        console.log("Initialization successful");
        // Proceed to retrieve all students' data
        return collegeData.getAllStudents();
    })
    .then(function(students) {
        // Log the number of students retrieved
        console.log(`Successfully retrieved ${students.length} students`);
        // Proceed to retrieve all courses' data
        return collegeData.getCourses();
    })
    .then(function(courses) {
        // Log the number of courses retrieved
        console.log(`Successfully retrieved ${courses.length} courses`);
        // Proceed to retrieve all TAs' (Teaching Assistants) data
        return collegeData.getTAs();
    })
    .then(function (TAs) {
        // Log the number of TAs retrieved
        console.log(`Successfully retrieved ${TAs.length} TAs`);
    })
    .catch(function(err){
        // If any error occurs during the process, log the error message
        console.log(err);
    })
    .finally(function(){
        // This block will always execute, regardless of whether there was an error or not
        console.log('Process completed !!')
    });
