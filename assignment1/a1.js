/*********************************************************************************
* WEB700 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Jaya Nandhini Kannan Student ID: 161496237 Date: 24.05.2024
*
********************************************************************************/

//initialising verbs, paths, responses arrays 
const serverVerbs = ["GET", "GET", "GET", "POST", "GET", "POST"]; 
const serverPaths = ["/", "/about", "/contact", "/login", "/panel", "/logout"];
const serverResponses = [
    "Welcome to WEB700 Assignment 1",
    "This course name is WEB700. This assignment was prepared by Jaya Nandhini Kannan",
    "jnkannan@myseneca.ca\nJaya Nandhini Kannan",
    "Hello, User Logged In",
    "Main Panel",
    "Logout Complete. Goodbye"
];

//Creating the "web server simulator" Function - "httpRequest"
function httpRequest(httpVerb, path) {
    for (let i = 0; i < serverPaths.length; i++) {
        if (serverVerbs[i] === httpVerb && serverPaths[i] === path) {
            return `200: ${serverResponses[i]}`;
        }
    }
    return `404: Unable to process ${httpVerb} request for ${path}`;
}

//Manually Testing the "httpRequest" Function
console.log(httpRequest("GET", "/"));
console.log(httpRequest("GET", "/about")); 
console.log(httpRequest("GET", "/contact"));
console.log(httpRequest("POST", "/login")); 
console.log(httpRequest("GET", "/panel")); 
console.log(httpRequest("POST", "/logout")); 
console.log(httpRequest("PUT", "/")); 

//Automating the Tests by creating a "automateTests" Function
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function automateTests() {
    let testVerbs = ["GET", "POST"];
    let testPaths = ["/", "/about", "/contact", "/login", "/panel", "/logout", "/randomPath1", "/randomPath2"];

    function randomRequest() {
        let randVerb = testVerbs[getRandomInt(testVerbs.length)];
        let randPath = testPaths[getRandomInt(testPaths.length)];
        console.log(httpRequest(randVerb, randPath));
    }

    setInterval(randomRequest, 1000);
}

//Invoke the "automateTests" function
automateTests();
