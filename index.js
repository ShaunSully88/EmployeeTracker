const { prompt } = require('inquirer');
const db = require('./db/connection');
const logo = require('asciiart-logo');
require('console.table');

init();

function init() {
    const logoText = logo({ name: 'Pittsburgh Penguins' }).render();

    console.log(logoText);

    loadMainPrompts();
}

function loadMainPrompts() {
    prompt ([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'View All Employees By Department',
                    value: 'VIEW_EMPLOYEEDEP'
                },
                {
                    name: 'View All Employees By Manager',
                    value: 'VIEW_EMPLOYEEMAN'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Remove Employee',
                    value: 'REMOVE_EMPLOYEE'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_ROLE'
                },
                {
                    name: 'Update Employee Manager',
                    value: 'UPDATE_MANAGER'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLE'
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Remove Role',
                    value: 'REMOVE_ROLE'
                },
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEP'
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEP'
                },
                {
                    name: 'Remove Department',
                    value: 'REMOVE_DEP'
                }
            ]
        }
    ])
}

