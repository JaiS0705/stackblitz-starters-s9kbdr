let express = require('express');
let { employees } = require('./models/employees.model.js');
let { sequelize } = require('./lib/index.js');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let app = express();
const PORT = process.env.PORT || 3010;
let db;
(async () => {
  db = await open({
    filename: './BD5.1-HW2/employees.sqlite',
    driver: sqlite3.Database,
  });
  if (db) console.log('Connected to the SQLite database.');
})();
let employeesData = [
  {
    id: 1,
    name: 'John Doe',
    gender: 'male',
    department: 'Engineering',
    job_title: 'Software Engineer',
    location: 'New York',
  },
  {
    id: 2,
    name: 'Jane Smith',
    gender: 'female',
    department: 'Engineering',
    job_title: 'QA Engineer',
    location: 'Austin',
  },
  {
    id: 3,
    name: 'James Brown',
    gender: 'male',
    department: 'Sales',
    job_title: 'Sales Manager',
    location: 'San Francisco',
  },
  {
    id: 4,
    name: 'Emily Davis',
    gender: 'female',
    department: 'Marketing',
    job_title: 'Marketing Specialist',
    location: 'Chicago',
  },
  {
    id: 5,
    name: 'Michael Johnson',
    gender: 'male',
    department: 'HR',
    job_title: 'HR Manager',
    location: 'New York',
  },
  {
    id: 6,
    name: 'Sarah Wilson',
    gender: 'female',
    department: 'Engineering',
    job_title: 'DevOps Engineer',
    location: 'Seattle',
  },
  {
    id: 7,
    name: 'David Martinez',
    gender: 'male',
    department: 'Finance',
    job_title: 'Accountant',
    location: 'Houston',
  },
  {
    id: 8,
    name: 'Laura Thompson',
    gender: 'female',
    department: 'Engineering',
    job_title: 'Software Engineer',
    location: 'Austin',
  },
  {
    id: 9,
    name: 'Robert White',
    gender: 'male',
    department: 'Support',
    job_title: 'Support Specialist',
    location: 'New York',
  },
  {
    id: 10,
    name: 'Linda Lewis',
    gender: 'female',
    department: 'Sales',
    job_title: 'Sales Representative',
    location: 'San Francisco',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employees.bulkCreate(employeesData);
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/employees', async (req, res) => {
  try {
    const employees = await db.all('Select * from employees');
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
