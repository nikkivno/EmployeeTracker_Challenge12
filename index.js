const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(
         {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: process.env.DB_Password,
            database: "EmployeeTracker_db"
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
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role'
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
            updateRole();
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
    connection.query('SELECT * FROM `role`', function (err, results){
        if (err) throw err;
        console.table(results);
        options();
    });
}

function viewEmployees() {
    connection.query('SELECT * FROM `employee`', function (err, results){
        if (err) throw err;
        console.table(results);
        options();
    });
}


function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter a department ID:",
            name: 'departmentID'
        },
        {
            type: "input",
            message: "Enter the name of the new department:",
            name: "departmentName"
        }
    ])
    .then((answers) => {
        const newID = answers.departmentID;
        const newDepartment = answers.departmentName;
        connection.query('INSERT INTO department (id, name) VALUES (?, ?)', [newID, newDepartment], function (err, result) {
            if (err) throw err;
            console.log("New department added:", newDepartment);
            options();
    });
    });
} 

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

}

function updateRole() {

}


