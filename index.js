const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(
         {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: process.env.DB_Password,
            database: "Employee_Tracker_db"
        });

connection.connect(function(err) {
    if (err) throw err;
});
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
   
//   connection.end();

function options() { 
inquirer.prompt ([
    {
        type: "list",
        message:"Please choose one of the following:",
        choices: [
            'View All Employees',
            'Add an Employee',
            'Update an Employee Role',
            'View All Roles',
            'Add a Role',
            'View All Departments',
            'Add a Department'
        ],
        name: "Options"
    }
])
.then ((answers) => {
    switch(answers.Options) {
        case 'View All Departments':
            viewDepartments();
        break;
        case 'View All Roles':
            viewRoles();
        break;
        case 'View All Employees':
            viewEmployees();
        break;
        case 'Add a Department':
            addDepartment();
        break;
        case 'Add a Role':
            addRole();
        break;
        case 'Add an Employee':
            addEmployee();
        break;
        case 'Update an Employee Role':
            updateRole((employeeNames) => {
                inquirer.prompt ([
                    {
                        type: 'list',
                        message: 'Select the Employee whose role you would like to update:',
                        choices: employeeNames,
                        name: 'selectedEmployee'
                    },
                    {
                        type: 'input',
                        message: 'Enter new role ID:',
                        name: 'newRole'
                    }
                ])
                .then((answers) => {
                    updateEmployeeJobTitle(answers.selectedEmployee, answers.newRole);
                })
                .catch((error) => {
                    console.error('Error occured:', error);
                });
            });
            break;
    }
})
};

options()

function viewDepartments() {
    console.log('in View Departments')
    connection.query('SELECT * FROM `department`', function (err, results){
        if (err) throw err;
        console.table(results);
        options();
    });
}

function viewRoles() {

    const sqlQuery = 
    `SELECT role.id, title, department.name AS department, salary
    FROM role
    LEFT JOIN department
    ON role.department_id = department.name`;

    connection.query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.table(results);
        options();
        });
      }



function viewEmployees() {
    const sqlQuery = 
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, salary,
    CONCAT(manager.first_name,' ', manager.last_name) AS manager FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;

    connection.query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.table(results);
        options();
        });
      }



async function addDepartment() {
    try {
      const answers = await inquirer.prompt([
        {
          type: "input",
          message: "Enter the name of the new department:",
          name: "departmentName",
        },
      ]);
  
      const departmentName = answers.departmentName;
      
      connection.query(
        'INSERT INTO department (name) VALUES (?)', [departmentName], function (err, result) {
          if (err) throw err;
          console.log('New department added: ', departmentName);
          options();
        }
      );
    } catch (error) {
      console.error("Error:", error);
      options();
    }
};


function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter a role ID:",
            name: 'roleID'
        },
        {
            type: "input",
            message: "Enter the name of the new role:",
            name: "roleName"
        },
        {
            type: 'input',
            message: "Please Enter the salary of the position:",
            name: "salary"
        },
        {
            type: 'input',
            message: "Please enter the department ID:",
            name: "departmentID"
        }
    ])
    .then((answers) => {
        const roleID = answers.roleID;
        const roleName = answers.roleName;
        const salary = answers.salary;
        const departmentID = answers.departmentID;
        connection.query('INSERT INTO role (id, title, salary, department_id) VALUES (?, ?, ?, ?)', [roleID, roleName, salary, departmentID], function (err, result) {
            if (err) throw err;
            console.log("New role added:", roleName);
            options();
    });
    });
} 

function addEmployee() {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Please Enter Employee First Name:',
            name: 'employeeFirstName'
        },
        {
            type: 'input',
            message: 'Please Enter Employee Last Name:',
            name: 'employeeLastName'
        },
        {
            type: 'input',
            message: 'Please Enter Employee Role ID:',
            name: 'roleID'
        },
        {
            type: 'input',
            message: 'Please Enter The Manager ID:',
            name: 'managerID'
        }
    ])
    .then ((answers) => {
        const firstName = answers.employeeFirstName;
        const lastName = answers.employeeLastName;
        const roleID = answers.roleID;
        const manager = answers.managerID;
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleID, manager], function (err, results) {
            if (err) throw err;
            console.log("New employee added:", firstName);
            options();
        });
    });
}

function updateRole(callback) {
    const query = 'SELECT first_name FROM employee'

    connection.query(query, (err, results) => {
        if (err) throw err;

        const employeeNames = results.map((result) => result.first_name);
        callback(employeeNames);
    });
}

function updateEmployeeJobTitle (selectedEmployee, newRole) {
    const updateQuery = 'UPDATE employee SET role_id = ? WHERE first_name = ?';

    connection.query(updateQuery, [newRole, selectedEmployee], (err, reuslt) => {
        if (err) throw err;

        console.log(`Roll ID updated for ${selectedEmployee}`);
        options();
    })
}


