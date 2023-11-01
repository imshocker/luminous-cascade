const inquirer = require('inquirer')
require('console.table');
const mysql = require('mysql2')


const connection = require('./config/connection');


const startApp = async () => {
    console.log(`

    ███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗
    ██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝
    █████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░
    ██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░
    ███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗
    ╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝
    
    ███╗░░░███╗░█████╗░███╗░░██╗░█████╗░░██████╗░███████╗██████╗░
    ████╗░████║██╔══██╗████╗░██║██╔══██╗██╔════╝░██╔════╝██╔══██╗
    ██╔████╔██║███████║██╔██╗██║███████║██║░░██╗░█████╗░░██████╔╝
    ██║╚██╔╝██║██╔══██║██║╚████║██╔══██║██║░░╚██╗██╔══╝░░██╔══██╗
    ██║░╚═╝░██║██║░░██║██║░╚███║██║░░██║╚██████╔╝███████╗██║░░██║
    ╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝░╚═════╝░╚══════╝╚═╝░░╚═╝
    
    `)

    promptUser();
};

// Prompt user for action
const promptUser = async () => {
    const answers = await inquirer.prompt([{
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
            'VIEW all Departments',
            'VIEW all Roles',
            'VIEW all Employees',
            'EXIT'
        ]
    }
    ]);

    if (answers.choices === 'VIEW all Departments') {
        await viewAllDepartments();
    } else if (answers.choices === 'VIEW all Roles') {
        await viewAllRoles();
    } else if (answers.choices === 'VIEW all Employees') {
        await viewAllEmployees();
    } else if (answers.choices === 'EXIT') {
        connection.end(); // Close the DB connection
        console.log('Goodbye!');
        return;
    }

};

// Function to view all departments
const viewAllDepartments = () => {
    const query = `SELECT * FROM department`;
    connection.query(query, (err, department) => {
        if (err) throw err;
        console.table(department);
        promptUser();

    });
};

// Function to view all roles
const viewAllRoles = async () => {
    try {
        const [results] = await connection.promise().query(
            'SELECT * FROM role')
        console.table(results)
        promptUser();

    } catch (err) {
        throw new Error(err)
    }
};

// Function to view all employees
const viewAllEmployees = async () => {
    try {
        const [results] = await connection.promise().query(
            'SELECT * FROM employee')
        console.table(results)
        promptUser();
    } catch (err) {
        throw new Error(err)
    }
};


// Start the application 
startApp();