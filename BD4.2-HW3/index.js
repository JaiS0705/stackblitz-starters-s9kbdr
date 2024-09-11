const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3010;
let db;

// Connect to SQLite database
(async () => {
  db = await open({
    filename: './BD4.2-HW3/database.sqlite',
    driver: sqlite3.Database,
  });
  if (db) console.log('Connected to the SQLite database.');
})();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.2 HW3 - SQL Queries & async/await' });
});

app.get('/companies', async (req, res) => {
  try {
    const companies = await db.all('Select * from companies');
    if (companies.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/companies/industry/:industry', async (req, res) => {
  try {
    const industry = req.params.industry;
    const companies = await db.all(
      'Select * from companies where industry = ?',
      [industry]
    );
    if (companies.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/companies/revenue', async (req, res) => {
  try {
    const minRevenue = Number.parseInt(req.query.minRevenue);
    const maxRevenue = Number.parseInt(req.query.maxRevenue);
    const companies = await db.all(
      'Select * from companies where revenue >= ? and revenue <= ?',
      [minRevenue, maxRevenue]
    );
    if (companies.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/companies/employees/:employeesCount', async (req, res) => {
  try {
    const employeesCount = Number.parseInt(req.params.employeesCount);
    const companies = await db.all(
      'Select * from companies where employee_count < ?',
      [employeesCount]
    );
    if (companies.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/companies/founded_year/:founded_year', async (req, res) => {
  try {
    const founded_year = Number.parseInt(req.params.founded_year);
    const companies = await db.all(
      'Select * from companies where founded_year = ?',
      [founded_year]
    );
    if (companies.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
