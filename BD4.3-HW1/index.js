const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3010;
let db;

// Connect to SQLite database
(async () => {
  db = await open({
    filename: './BD4.3-HW1/database.sqlite',
    driver: sqlite3.Database,
  });
  if (db) console.log('Connected to the SQLite database.');
})();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.3 HW1 - SQL Queries & async/await' });
});

app.get('/employees/gender/:gender', async (req, res) => {
  try {
    const gender = req.params.gender;
    const employees = await db.all('Select * from employees where gender = ?', [
      gender,
    ]);
    if (employees.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/employees/department/:department', async (req, res) => {
  try {
    const department = req.params.department;
    const employees = await db.all(
      'Select * from employees where department = ?',
      [department]
    );
    if (employees.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/employees/job_title/:job_title', async (req, res) => {
  try {
    const job_title = req.params.job_title;
    const employees = await db.all(
      'Select * from employees where job_title = ?',
      [job_title]
    );
    if (employees.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/employees/location/:location', async (req, res) => {
  try {
    const location = req.params.location;
    const employees = await db.all(
      'Select * from employees where location = ?',
      [location]
    );
    if (employees.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
