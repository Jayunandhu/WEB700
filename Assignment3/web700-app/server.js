/*********************************************************************************
* WEB700 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Jaya Nandhini Kannan Student ID: 161496237 Date: 06/14/204
*
********************************************************************************/
// Set the HTTP port to the value provided in the environment variable PORT or default to 8080
var HTTP_PORT = process.env.PORT || 8080;

// Import the Express framework
var express = require("express");

// Import the path module to handle file paths
const path = require('path');

// Create an instance of an Express application
var app = express();

// Import the collegeData module which contains data-related functions
const collegeData = require('./modules/collegeData');

// Define paths to the HTML files for home, about, and HTML demo pages
const home = 'views/home.html';
const about = 'views/about.html';
const htmldemo = 'views/htmlDemo.html';

// Define a route for the root URL ("/") to serve the home page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, home));
});

// Define a route for the "/about" URL to serve the about page
app.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, about));
});

// Define a route for the "/htmlDemo" URL to serve the HTML demo page
app.get("/htmlDemo", function(req, res) {
    res.sendFile(path.join(__dirname, htmldemo));
});

// Define a route for the "/students" URL to get students data
app.get("/students", function(req, res) {
    // If a course query parameter is provided, get students by course
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then((students) => {
                res.json(students);
            })
            .catch((err) => {
                res.json({ message: err });
            });
    } else {
        // Otherwise, get all students
        collegeData.getAllStudents()
            .then((students) => {   
                res.json(students);
            })
            .catch((err) => {
                res.json({ message: "No results" });
            });
    }
});

// Define a route for the "/students/:num" URL to get a student by their number
app.get("/students/:num", function(req, res) {
    collegeData.getStudentsByNum(req.params.num)
        .then((students) => {
            res.json(students);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

// Define a route for the "/tas" URL to get data of teaching assistants (TAs)
app.get("/tas", function(req, res)  {
    collegeData.getTAs()
        .then((tas) => {
            res.json(tas);
        })
        .catch((err) => {
            res.json({ message: "No results" });
        });
});

// Define a route for the "/courses" URL to get courses data
app.get('/courses', function(req, res)  {
    collegeData.getCourses().then(data => {
        res.json(data);
    }).catch(err => {
        res.json({ message: err });
    });
});

// Catch-all for 404 errors
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
// Initialize the collegeData module and start the server on the specified port
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("Server listening on port " + HTTP_PORT);
        });
    })
    .catch((err) => {
        console.error(err);
    });
