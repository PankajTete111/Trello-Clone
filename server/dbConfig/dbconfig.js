'user strict';

const mysql = require('mysql2');

//local mysql db connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pankajroot',
    database: 'kanban_board',
    port: 3307
  });
  
  
  db.connect(err => {
    if (err) {
      console.error('MySQL connection failed:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });

module.exports = db;