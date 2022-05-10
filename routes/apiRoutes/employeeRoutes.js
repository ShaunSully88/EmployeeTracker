const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employees ORDER BY last_name`;
    
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'succecss',
            data: rows
        });
    });
});

router.get('/employee/:id', (req, res) => {
    const sql = `SELECT * FROM employees WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

router.post('/employee', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'title');
    if(errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO employees (first_name, last_name, title) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.title];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error:err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

router.put('/employee/:id', (req, res) => {
    const errors = inputCheck(req.body, 'title');
    if (errors) {
        res.status(400).json({ error: errors});
        return;
    }

    const sql = `UPDATE employees SET title = ? WHERE id = ?`;
    const params = [req.body.title, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message});
        } else if (!result.affectedRows) {   
            res.json({
            message: 'Employee not found'
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

router.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });            
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
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