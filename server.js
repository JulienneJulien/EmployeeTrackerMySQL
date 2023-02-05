const express = require("express");
const app = express();
const inquirer = require('inquirer');
require('console.table');
const mysql = require('mysql2');

const PORT = process.env.PORT || 8000;
app.get("/", function (req, res) {
    res.send("HEY TESTING ROUTE");
});

app.listen(PORT, () => console.log(' Server Listening on port ' + PORT));
// EXPRESS MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// INTRO
console.log('Welcome to my Employee_Tracker_App!');
// USER MENU PROMPTS
const menuPrompts = () => {
    return inquirer .prompt({
            name: "userChoices",
            type: 'list',
            message: 'Please select what you would like to do.',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',     
                'Add A Role',
                'Add A Employee',
                'Update An Employee Role',
                'Exit Menu',
            ],
        })
};
