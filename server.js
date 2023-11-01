const inquirer = require('inquirer')
const sql = require('mysql2')
const table = require('console.table');
const connection = require('./config/connection');


// Function to view all departments
function viewAllDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser(); 
    });
}

// Function to view all roles
function viewAllRoles() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser(); 
    });
}

// Function to view all employees
function viewAllEmployees() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser(); 
    });
}



// Function to prompt user for action
function promptUser() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Exit'
                ],
            }
        ])
        .then(answer => {
            switch (answer.action) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;

                case 'Exit':
                    connection.end(); // Close the DB connection
                    console.log('Goodbye!');
                    break;
            }
        });
}

// Start the application 
promptUser();