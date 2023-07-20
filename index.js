const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(
         {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: process.env.DB_Password,
            database: "EmployeeTracker_Challenge12_db"
        });

connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
   
  connection.end();

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
    switch(answers.options) {
        case 'View All Departments':
            viewDepartments();
        break;
        case 'View All Roles':
            viewroles();
        break;
        case 'View All Employees':
            viewEmployees();
        break;
        case 'Add a Department':
            console.log ('Department Added')
        break;
        case 'Add a Role':
            console.log ('Role added')
        break;
        case 'Add an Employee':
            console.log ('Employee added')
        break;
        case 'Update an Employee Role':
            console.log ('Employee Role Updated')
    }
})
};

options()

function viewDepartments() {
    connection.query('SELECT `*` FROM `department`', function (err, results){
        if (err) throw err;
        console.table(results);
        options();
    });
}

function viewRoles() {
    connection.query('SELECT `*` FROM `roles`', function (err, results){
        if (err) throw err;
        console.table(results);
        options();
    });
}

function viewEmployees() {
    connection.query('SELECT `*` FROM `employee`', function (err, results){
        if (err) throw err;
        console.table(results);
        options();
    });
}


