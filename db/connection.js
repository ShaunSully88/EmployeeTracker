const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shorro88!',
    database: 'business'
});

module.exports = db;