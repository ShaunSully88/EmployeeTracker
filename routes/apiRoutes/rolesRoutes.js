const express = require('express');
const router = express.Router();
const db = require('../../db/connection')
const inputCheck = require(//path for inputcheck here)//
)

router.get('/roles', (req, res) => {
    const sql =  `SELECT roles.*, departments.name
    AS department_name
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

router.get('role/:id', (req, res) => {
    const sql =  `SELECT roles.*, departments.name
    AS department_name
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id
    WHERE roles.id = ?`;
    const params = [req.params.id]

    db.query(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

router.post('/role', ({ body}, res) => {
    const errors = inputCheck(body, 'title', 'salary', 'department_id');
    if(errors) {
        res.status(400).json({ error:errors});
        return;
    }

    const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?,?,?)`;

    const params = [body.title, body.salary, body.department_id];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({error:err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

router.put('/role/:id', (req, res) => {
    
    const errors = inputCheck(req.body, 'department_id');

    if (errors) {
        res.status(400).json({ error: errors});
        return;
    }

    const sql = `UPDATE roles SET department_id = ?
    WHERE id = ?`
    const params = [req.body.department_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error:err.message});            
        } else if (!result.affectedRows) {
            res.json({
                message: 'Role not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

router.delete('/role/:id', (req, res) => {
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.statusMessage(400).json({ error: res.message});
        } else if(!result.affectedRows) {
            res.json({
                message: 'Role not found.'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
        });
    });


    module.exports = router;

