const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(
    process.env.DB_Username,
    process.env.DB_Password,
    process.env.DB_Name
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        });

connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
   
  connection.end();

inquirer.prompt ([
    {
        type: "rawlist",
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