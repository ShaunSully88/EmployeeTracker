
const inquirer = require('inquirer');
const db = require('./db/connection');
console.log('\r\n______ _ _   _       _                     _      ______                      _           \r\n| ___ (_) | | |     | |                   | |     | ___ \\                    (_)          \r\n| |_\/ \/_| |_| |_ ___| |__  _   _ _ __ __ _| |__   | |_\/ \/__ _ __   __ _ _   _ _ _ __  ___ \r\n|  __\/| | __| __\/ __| \'_ \\| | | | \'__\/ _` | \'_ \\  |  __\/ _ \\ \'_ \\ \/ _` | | | | | \'_ \\\/ __|\r\n| |   | | |_| |_\\__ \\ |_) | |_| | | | (_| | | | | | | |  __\/ | | | (_| | |_| | | | | \\__ \\\r\n\\_|   |_|\\__|\\__|___\/_.__\/ \\__,_|_|  \\__, |_| |_| \\_|  \\___|_| |_|\\__, |\\__,_|_|_| |_|___\/\r\n                                      __\/ |                        __\/ |                  \r\n                                     |___\/                        |___\/                   \r\n')


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
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'View all Employees':
                viewEmployees();
                break;
            case 'Add Department':
                departmentPrompts();
                break;
            case 'Add Role':
                rolePrompts();
                break;
            case 'Add Employee':
                employeePrompts();  
                break;
            case 'Update Role': 
                updateRole();
                break;   
        }
    })
};   
    

function employeePrompts() {
    inquirer
    .prompt([
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
            message: 'What position does the employee play? Choose 1 for Center, 2 for Left Wing, 3 for Right Wing, 4 for Left Defense, 5 for Right Defense, 6 for Starting Goalie, 7 for Backup Goalie, 8 for Head Coach, or 9 for General Manager.',
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9]

        },
        {
            type: 'list',
            name: 'employeeManager',
            message: "Who is Employee's Manager? Choose 1 for Sidney Crosby, 2 for Evgeni Malkin, 3 for Brian Dumolin, 4 for Kris Letang, 5 for Mike Sullivan, 6 for Ron Hextall, or 7 for Brian Burke.",
            choices: [1, 2, 3, 4, 5, 6, 7]
        }
    ])
    .then( function (ans) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?);`;
    db.query(sql, [ans.firstName, ans.lastName, ans.roleId, ans.employeeManager], (err, res) => {
        if (err) throw err;
        console.log('New employee has been added.');
        loadMainPrompts();
    });
    });
}

function rolePrompts() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'newTitle',
            message: 'What is the new Role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the employee?'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'What Department is the new role in? 1 for Forward, 1 for Defense, 3 for Goalie, 4 for Brass.',
            choices: [1,2,3,4] 
        }
    ])
    .then( function (ans) {
        const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?);`;
    db.query(sql, [ans.newTitle, ans.salary, ans.departmentId], (err, res) => {
        if (err) throw err;
        console.log('New role has been added.');
        loadMainPrompts();
    });
    });
};

function departmentPrompts() {
    inquirer
    .prompt([
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
                loadMainPrompts();
            });
        
    });
};

function updateRole() {
   
    db.query(`SELECT * FROM employee`, (err, res) => {
        if(err) throw err
    
    const employeeList = res.map((employee) => ({name: employee.last_name + ", " + employee.first_name, value: employee.id}))
    inquirer
    .prompt([
        {
        type:'list',
        name: 'updateEmployee',
        message: 'Which employee would you like to update?',
        choices: employeeList
        },
        {
        type: 'list',
        name: 'oldRole',
        message: "What is employee's old role id?",
        choices: [1,2,3,4,5,6,7,8,9]
        },
        {
        type: 'list',
        name: 'newRole',
        message: "What is employee's new role id?",
        choices: [1,2,3,4,5,6,7,8,9]
        }  
    
    ])
    .then(function (ans) {
    const sql = `UPDATE employee SET role_id = ?;`;
    db.query(sql, [ans.newRole, ans.oldRole], (err, res) => {
        if (err) throw err;
        console.log("Employee's role has been changed.");
        loadMainPrompts();
    });
    });
});
    

};

function viewEmployees() {
        const sql = `SELECT * FROM employee ORDER BY last_name`;
        db.query(sql, (err, results) => {
            if (err) throw err;
            console.log('All employees listed alphabetically by last name');
            console.table(results)
        })
        loadMainPrompts();
};

function viewRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('All roles listed.');
        console.table(results)
    })
    loadMainPrompts();
};

function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('All departments listed alphabetically');
        console.table(results)
    })
    loadMainPrompts();
};   




loadMainPrompts();
