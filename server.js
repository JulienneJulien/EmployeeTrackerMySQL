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
const menuPrompts = () => 
 inquirer.prompt ([
        {
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
                'Exit Menu']
        }
    ])

.then((answers) => {
    const { choices } = answers; 

    if (choices ===  'View All Departments') {
      viewDepartments();
    }
    if (choices ==='View All Roles') {
    viewRoles();
    }
    if (choices === 'View All Employees') {
      viewEmployees();
    }
    if (choices ==='Add A Department') {
      addDepartment();
    }
    if (choices ==='Add A Role') {
      addRole();
    }
    if (choices ==='Add A Employee') {
      addEmployee();
    }
    if (choices === 'Update An Employee Role') {
      updateEmployee();
    }
    if (choices === "No Action") {
      connection.end()
  };
});

// VIEW ALL DEPARTMENTS
viewDepartments = () => {
    console.log('Viewing all departments...\n');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`; 
  
    connection.promise().query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      menuPrompts();
    });
  };