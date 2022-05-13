const db = require("../db/connection");

//adding an employee to db
addEmployee(first_name, last_name, role_id, manager_id) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
    db.query(sql, [firstname, lastname, roleid, managerid], (err, rows) => {
        if (err) throw err;
        console.log('New employee has been added.');
    });

};

//updating Employee Role
updateRole(role_id, id) {
    const sql = `UPDATE employee SET role_id = ? WHERE id =?`;
    db.query(sql, [role_id, id], (err, rows) => {
        if (err) throw err;
        console.log('Employee role updated.');
    });
};

//updating Employee Manager
updateManager(manager_id, id) {
    const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
    db.query(sql, [manager_id, id], (err, rows) => {
        if (err) throw err;
        console.log('Employee manager updated.');
    });
};

// Show list of all Employees
viewEmployees() {
    const sql = `SELECT * FROM employee ORDER BY last_name`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('All employees listed alphabetically by last name');
    })
}

// Adding Role to db
addRole(title, salary, department_id) {
    const sql = `INSERT INTO employee (title, salary, department_id) VALUES (?,?,?)`;
    db.query(sql, [title, salary, department_id], (err, rows) => {
        if (err) throw err;
        console.log('Role added to database.');
    });
};

// Showing all Roles
viewRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('All roles listed.');
    })
}

//adding department to db
addDepartment(name) {
    const sql = `INSERT INTO employee (name)
    VALUES (?)`;
    db.query(sql, [name], (err, rows) => {
        if (err) throw err;
        console.log('New department has been added.');
    });

};

// Showing all departments
viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('All departments listed');
    })
};








