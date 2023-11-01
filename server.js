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
            'ADD a Department',
            'ADD a Role',
            'ADD an Employee',
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
    } else if (answers.choices === 'ADD a Department') {
        await addDepartment();
    } else if (answers.choices === 'ADD a Role') {
        await addRole();
    } else if (answers.choices === 'ADD an Employee') {
        await addEmployee();
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

// Function to add a department
const addDepartment = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the department name: '
            }
        ]);

        await connection.promise().query('INSERT INTO department SET ?', answers);
        console.log('Department added successfully!');
        promptUser();
    } catch (err) {
        console.error('Error adding department:', err);
        promptUser();
    }
};


// Function to add a role
const addRole = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the role name: ',
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter the salary: ',
            },
            {
                type: 'number',
                name: 'department_id',
                message: 'Enter the Department ID#: ',
            }
        ]);

        await connection.promise().query('INSERT INTO role SET ?', answers);
        console.log('Role added successfully!');
        promptUser();
    } catch (err) {
        console.error('Error adding role:', err);
        promptUser();
    }
};

// Function to add an employee
const addEmployee = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'First Name: ',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Last Name: ',
            },
            {
                type: 'number',
                name: 'role_id',
                message: 'Enter Job Role ID#: ',
            },
            {
                type: 'number',
                name: 'manager_id',
                message: 'Enter the Manager ID#: ',
            }
        ]);

        await connection.promise().query('INSERT INTO employee SET ?', answers);
        console.log('Employee added successfully!');
        promptUser();
    } catch (err) {
        console.error('Error adding employee:', err);
        promptUser();
    }
};





// Start the application 
startApp();