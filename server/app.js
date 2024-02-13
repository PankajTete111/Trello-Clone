require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const mysql = require('mysql2/promise');
const cors = require('cors');
const routes= require('./routes/user_route')
const dbConn = require("./dbConfig/dbconfig");

const app = express();
const port = 3050;

app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1/',routes)


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// app.post('/create', (req, res) => {
//   const { email_id, contact_no, full_name, password } = req.body;
//   const sql = 'INSERT INTO tbl_user_signup_info (USI_EMAIL, USI_CONTACT, USI_FULL_NAME, USI_PASSWORD) VALUES (?, ?, ?, ?)';
//   db.query(sql, [email_id, contact_no, full_name, password], (err, result) => {
//     if (err) throw err;
//     res.send('Record added successfully');
//   });
// });

// app.post('/create', (req, res) => {
//   const { email_id, contact_no, full_name, password } = req.body;

//   // Assuming p_created_by and p_modified_by are hard-coded for demonstration purposes
//   const p_created_by = 1;
//   const p_modified_by = 1;

//   // Call the stored procedure
//   const sql = 'CALL USP_KANBAN_CREATE_USER(?, ?, ?, ?, ?, ?)';
//   db.query(sql, [email_id, contact_no, full_name, password, p_created_by, p_modified_by], (err, result) => {
//     if (err) throw err;
//     res.send('Record added successfully');
//   });
// });

// Read all records
app.get('/read', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Update a record
app.put('/update/:id', (req, res) => {
  const { name, age } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE users SET name=?, age=? WHERE id=?';
  db.query(sql, [name, age, id], (err, result) => {
    if (err) throw err;
    res.send('Record updated successfully');
  });
});

// Delete a record
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Record deleted successfully');
  });
});

  