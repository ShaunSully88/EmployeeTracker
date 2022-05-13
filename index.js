
const inquirer = require('inquirer');
const db = require('./db/connection');


const loadMainPrompts = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['Add Employee', 'Add Role', 'Add Department', 'Update Role', 'View all Employees', 'View all Roles', 'View all Departments'
            ]
        }
    ])
    .then(function (ans) {
        switch(ans.choice) {

            case 'View all Departments':
                viewDepartments();
            case 'View all Roles':
                viewRoles();
            case 'View all Employees':
                viewEmployees();
            case 'Add Department':
                departmentPrompts();
            case 'Add Role':
                rolePrompts();
            case 'Add Employee':
                employeePrompts();  
            case 'Update Role': 
                updateRole();
        }
    })
};   
    

function employeePrompts() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is first name of Employee?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is last name of Employee?'
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'What is the role of employee?',
            choices: ['Center', 'Left Wing', 'Right Wing', 'Left Defense', 'Right Defense', 'Starter', 'Head Coach', 'General Manager']

        },
        {
            type: 'list',
            name: 'employeeManager',
            message: "Who is Employee's Manager?",
            choices: ['Crosby', 'Malkin', 'Letang', 'Dumolin', 'Sullivan', 'Hextall', 'Burke']
        }
    ])
    .then( function (ans) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?);`;
    db.query(sql, [ans.firstName, ans.lastName, ans.roleId, ans.employeeManager], (err, res) => {
        if (err) throw err;
        console.log('New employee has been added.');
    });
    });
}

function rolePrompts() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'title',
            message: 'What role does the employee have?',
            choices: ['Center', 'Left Wing', 'Right Wing', 'Left Defense', 'Right Defense', 'Starter', 'Head Coach', 'General Manager']
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the employee?'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'What position does employee play?',
            choices: ['Forward', 'Defense', 'Goalie', 'Brass']
        }
    ])
    .then( function (ans) {
        const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
    db.query(sql, [ans.title, ans.salary, ans.departmentId], (err, res) => {
        if (err) throw err;
        console.log('New employee has been added.');
    });
    });
};

function departmentPrompts() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What department would you like to add?'
        }
    ])
    .then(function (ans) {
            const sql = `INSERT INTO department(name)
            VALUES (?);`;
            db.query(sql, ans.departmentName, (err, res) => {
                if (err) throw err;
                console.log('New department has been added.');
            });
        
    });
};

function updateRole() {
   
    db.query(sql, `SELECT * FROM employee`, (err, res) => {
        if (err) throw err;
    });

    const employeeList = res.map((employee) =>
    ({name: `${employee.first_name} ${employee.last_name}`, value: employee.id}));


    inquirer.prompt([
        {
        type:'list',
        name: 'updateEmployee',
        message: 'Which employee would you like to update?',
        choices: employeeList
        },
        {
            type: 'list',
            name: 'updateRole',
            message: "What is employee's new role?",
            choices: ['Center', 'Left Wing', 'Right Wing', 'Left Defense', 'Right Defense', 'Starter', 'Head Coach', 'General Manager']
        },

    ])
};

function viewEmployees() {
        const sql = `SELECT * FROM employee ORDER BY last_name`;
        db.query(sql, (err, rows) => {
            if (err) throw err;
            console.log('All employees listed alphabetically by last name');
        })
};

function viewRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('All roles listed.');
    })
};

function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('All departments listed');
    })
};   


loadMainPrompts();
