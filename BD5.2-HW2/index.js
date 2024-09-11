const { employee } = require('./models/employee.model.js');
const { sequelize } = require('./lib/index.js');
const express = require('express');
const app = express();

const PORT = 3010;

let employees = [
  {
    id: 1,
    name: 'Alice',
    salary: 60000,
    department: 'Engineering',
    designation: 'Software Engineer',
  },
  {
    id: 2,
    name: 'Bob',
    salary: 70000,
    department: 'Marketing',
    designation: 'Marketing Manager',
  },
  {
    id: 3,
    name: 'Charlie',
    salary: 80000,
    department: 'Engineering',
    designation: 'Senior Software Engineer',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employee.bulkCreate(employees);
    res.json({ message: 'Employees DB created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/employees', async (req, res) => {
  try {
    const employees = await employee.findAll();
    if (employees.length === 0) {
      res.status(404).json({ message: 'No data found' });
    }
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/employees/details/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const employeeData = await employee.findOne({ where: { id } });
    if (employeeData.length === 0) {
      return res.status(404).json({ message: 'No data found!' });
    }
    res.json({ employee: employeeData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/employees/department/:department', async (req, res) => {
  try {
    const department = req.params.department;
    const employees = await employee.findAll({ where: { department } });
    if (employees.length === 0) {
      return res.status(404).json({ employees });
    }
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/employees/sort/salary', async (req, res) => {
  try {
    const order = req.query.order.toLowerCase();
    console.log(order);
    const employees = await employee.findAll({ order: [['salary', order]] });
    if (employees.length === 0) {
      return res.status(404).json({ employees });
    }
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Server listening to port ' + PORT);
});
