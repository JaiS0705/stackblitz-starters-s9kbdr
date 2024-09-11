const express = require('express');
const app = express();
const { sequelize } = require('./lib/index.js');
const { employee } = require('./models/employee.model.js');
const PORT = 3010;
app.use(express.json());
const employees = [
  {
    name: 'John Doe',
    designation: 'Manager',
    department: 'Sales',
    salary: 90000,
  },
  {
    name: 'Anna Brown',
    designation: 'Developer',
    department: 'Engineering',
    salary: 80000,
  },
  {
    name: 'James Smith',
    designation: 'Designer',
    department: 'Marketing',
    salary: 70000,
  },
  {
    name: 'Emily Davis',
    designation: 'HR Specialist',
    department: 'Human Resources',
    salary: 60000,
  },
  {
    name: 'Michael Wilson',
    designation: 'Developer',
    department: 'Engineering',
    salary: 85000,
  },
  {
    name: 'Sarah Johnson',
    designation: 'Data Analyst',
    department: 'Data Science',
    salary: 75000,
  },
  {
    name: 'David Lee',
    designation: 'QA Engineer',
    department: 'Quality Assurance',
    salary: 70000,
  },
  {
    name: 'Linda Martinez',
    designation: 'Office Manager',
    department: 'Administration',
    salary: 50000,
  },
  {
    name: 'Robert Hernandez',
    designation: 'Product Manager',
    department: 'Product',
    salary: 95000,
  },
  {
    name: 'Karen Clark',
    designation: 'Sales Associate',
    department: 'Sales',
    salary: 55000,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employee.bulkCreate(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/employees', async (req, res) => {
  try {
    const employees = await employee.findAll();
    if (employees.length === 0) {
      return res.status(404).json({ message: 'data not found' });
    }
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/employees/new', async (req, res) => {
  try {
    const newEmployeeData = req.body.newEmployee;
    const newEmployee = await employee.create(newEmployeeData);
    res.json({ newEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/employees/update/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const newEmployeeData = req.body;
    const selectedEmployee = await employee.findOne({ where: { id } });
    if (!selectedEmployee) {
      return res.status(404).json({ message: 'Data not found' });
    }
    selectedEmployee.set(newEmployeeData);
    const updatedEmployee = await selectedEmployee.save();
    res.json({ message: 'Employee updated successfully', updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/employees/delete', async (req, res) => {
  try {
    const id = parseInt(req.body.id);
    const deletedEmployee = await employee.destroy({ where: { id } });
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json({ message: 'Employee record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Server listening to port ' + PORT);
});
