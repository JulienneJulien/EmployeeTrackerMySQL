const express = require("express");
const app = express();
const inquirer = require('inquirer');
require('console.table');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3000;
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
      database: 'employee_db'
    });

  connection.connect(async (err) => {
    if (err) throw err;
    console.log(`Connected to the employee_db database. ${connection.threadId}\n`);
    start();
  });

// INTRO
console.log('Welcome to my Employee_Tracker_App!');
// USER MENU PROMPTS
const start = async () => {
    try {
      const menuPrompts = await inquirer.prompt([
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
                'Exit Menu'],
        }
    ]);
    selections(menuPrompts.userChoices);
    } catch (e) {
    console.log(e);
    }
};

const selections = async (userChoices) => {

      if (userChoices === 'View All Departments') {
        viewDepartments();
      }
      if (userChoices === 'View All Roles') {
        viewRoles();
      }
      if (userChoices === 'View All Employees') {
        viewEmployees();
      }
      if (userChoices === 'Add A Department') {
        addDepartment();
      }
      if (userChoices === 'Add A Role') {
        addRole();
      }
      if (userChoices === 'Add A Employee') {
        addEmployee();
      }
      if (userChoices === 'Update An Employee Role') {
        updateEmployeeRole();
      }
      if (userChoices === 'Exit Menu') {
        console.log('Thank you for using my Employee_Tracker_App!')
        connection.end();
      }
    };

//SELECT * FROM USERCHOICES STATEMENTS FOR DEPARTMENT/EMPLOYEES/ROLES

const viewDepartments = () => {
    const query = `SELECT * FROM departments`;
    connection.query(query, (err, departments) => {
      if (err) throw err;
      console.table(departments);
      start();
    });
  };
  
  const viewRoles = () => {
    const query = `SELECT * FROM role`;
    connection.query(query, (err, role) => {
      if (err) throw err;
      console.table(role);
      start();
    });
  };
  
  const viewEmployees = () => {
    const query = `SELECT * FROM employees`;
    connection.query(query, (err, employees) => {
      if (err) throw err;
      console.table(employees);
      start();
    });
  };
// ADD DEPARTMENT TO DEPARTMENT TABLE
const addDepartment = async () => {
    try {
      const newDepartment = await inquirer.prompt([
        {
                type: 'input',
                name: 'name',
                message: 'What Department would you like to add?'
            },
        ]);
        connection.query('INSERT INTO departments(name) VALUES(?)', newDepartment.name);
        console.log(`New department has been added: ${newDepartment.name}`);
        start();
      } catch (err) {
        console.log(err);
        connection.end();
      }
    };

// ADD A ROLE TO ROLE TABLE
const addRole = async () => {
    try {
      const { title, salary, department } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role?'
        },
        {   
            type: 'number',
            name: 'salary',
            message: 'How much does the new role pay?'
        },
        // TO MATCH FOR ROLE ID NUMBERS USING KEY-VALUE PAIRS
        {
            type: 'list',
            name: 'department',
            message: 'What department does the new role belong to?',
            choices: [

                {name: 'Kitchen Staff' , value: 1},
                {name: 'Floor Staff' , value: 2},
                {name: 'Bar Staff' , value: 3},
                {name: 'Delivery Staff' , value: 4},
                {name: 'Managerial Staff' , value: 5},

            ]
        },
    ]);
    const query = 'INSERT INTO role SET ?';
    connection.query(query, { title, salary, department_id: department }, (err, title) => {
      console.log(`New role has been added:${title}`);
      start();
    });
  } catch (err) {
    console.log(err);
    connection.end();
  }
};
        
// ADD AN EMPLOYEE TO EMPLOYEES TABLE
const addEmployee = async () => {
    try {
      const { first, last, role, manager } = await inquirer.prompt([
        {
          type: 'input',
          name: 'first',
          message: 'What is the first name of the employee?',
        },
        {
          type: 'input',
          name: 'last',
          message: 'What is the last name of the employee?',
        },
      // TO MATCH FOR ROLE ID NUMBERS USING KEY-VALUE PAIRS
        {
          type: 'list',  
          name: 'role',
          message: 'What is the role of the employee?',
          choices: [
  
            { name: 'Dishwasher', value: 1 },
            { name: 'Head Chef', value: 2 },
            { name: 'Cashier', value: 3 },
            { name: 'Waiter', value: 4 },
            { name: 'Waitress', value: 5 },
            { name: 'Bartender', value: 6 },
            { name: 'Delivery Driver', value: 7 },
            { name: 'Restaurant Manager', value: 8 },
          ]
        },
    // TO MATCH FOR MANAGER ID NUMBERS USING KEY-VALUE PAIRS
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the manager of the employees?',
            choices: [

                { name: 'BETTY BERRY', value: 2 },
                { name: 'ISAAC ICECREAM', value: 9 },
                { name: 'None', value: NULL }

            ]
            }
        ]);
        const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)';
        connection.query(query, [first, last, role, manager], (err, result) => {
          if (err) throw err;
          console.log(`New Employee has been added:${first} ${last} `);
          start();
    
        });
      } catch (err) {
        console.log(err);
        connection.end();
      }
    }

// UPDATE AN EMPLOYEE ROLE 

const updateEmployeeRole = async () => {
    connection.query('SELECT last_name from employees', async (err, res) => {
      try {
        const { last_name } = await inquirer.prompt([
          {
            type: 'list',
            name: 'last_name',
            message: 'What is the last name of the employee whose role ID you wish to change?',
            choices: res.map(({ last_name }) => last_name),
          }
        ]);
  
        const { role_id } = await inquirer.prompt([
          {
            type: 'list',
            name: 'role_id',
            message: 'What would you like the employee role to be updated to?',
            choices: [
  
                { name: 'Dishwasher', value: 1 },
                { name: 'Head Chef', value: 2 },
                { name: 'Cashier', value: 3 },
                { name: 'Waiter', value: 4 },
                { name: 'Waitress', value: 5 },
                { name: 'Bartender', value: 6 },
                { name: 'Delivery Driver', value: 7 },
                { name: 'Restaurant Manager', value: 8 },
  
            ]
          }
        ]);

        const query = 'UPDATE employees SET role_id =? WHERE last_name =?';
      connection.query(query, [parseInt(role_id), last_name], (err, res) => {
        if (err) throw err;
        console.log(`${last_name} Employee role updated to: ${role_id}`)

      })
      start();
    } catch (error) {
      console.log(error);
      connection.end();
    }
  })
};
