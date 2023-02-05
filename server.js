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

// TO CONNECT TO SQL DATABASE
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Pass',
      database: 'Business_db'
    },
    console.log(`Connected to the Business_db database.`)
  );

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
    if (choices === "Exit Menu") {
      console.log('Thank you for using my Employee_Tracker_App!')  
      connection.end();
  };
});

// VIEW ALL DEPARTMENTS
const viewDepartments = () => {
    const query = `SELECT * FROM departments`;
    connection.query(query, (err, departments) => {
      if (err) throw err;
      console.table(departments);
      start();
  
    });
  };
  // VIEW ALL ROLES
  const viewRoles = () => {
    const query = `SELECT * FROM role`;
    connection.query(query, (err, role) => {
      if (err) throw err;
      console.table(role);
      start();
  
    });
  };
  // VIEW ALL EMPLOYEES
  const viewEmployees = () => {
    const query = `SELECT * FROM employees`;
    connection.query(query, (err, employees) => {
      if (err) throw err;
      console.table(employees);
      start();
  
    });
  };
// ADD DEPARTMENT TO DEPARTMENT TABLE
const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: 'What Department would you like to add?'
            },
        ])
        .then((data) => {
            connection.query('INSERT INTO department SET ?',
                {
                    name: data.newDepartment,
                },
                function (err) {
                    if (err) throw err;
                }
            );
            console.log('New department has been added!')
            viewDepartments();
        });
};

// ADD A ROLE TO ROLE TABLE
const addRole = () => {
    connection.query('SELECT * FROM department', (err, departments) => {
        if (err) console.log(err);
        departments = departments.map((department) => {
            return {
                name: department.name,
                value: department.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newRole',
                    message: 'What is the title of the new role?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary for the new role?',
                },
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'What department is the new role for?',
                    choices: departments,
                },
            ])
            .then((data) => {
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: data.newRole,
                        salary: data.salary,
                        department_id: data.departmentId,
                    },
                    function (err) {
                        if (err) throw err;
                    }
                );
                console.log('New role has been added!')
                viewRoles();
            });

    });

};

// ADD AN EMPLOYEE TO EMPLOYEES TABLE
connection.connect((err) => {
    if (err) throw err;


    menuPrompts();

});