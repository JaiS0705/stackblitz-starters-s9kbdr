const express = require('express');
const app = express();
const { sequelize } = require('./lib/index.js');
const { company } = require('./models/company.model.js');
const PORT = 3010;

let companies = [
  {
    id: 1,
    name: 'Tech Innovators',
    industry: 'Technology',
    foundedYear: 2010,
    headquarters: 'San Francisco',
    revenue: 75000000,
  },
  {
    id: 2,
    name: 'Green Earth',
    industry: 'Renewable Energy',
    foundedYear: 2015,
    headquarters: 'Portland',
    revenue: 50000000,
  },
  {
    id: 3,
    name: 'Innovatech',
    industry: 'Technology',
    foundedYear: 2012,
    headquarters: 'Los Angeles',
    revenue: 65000000,
  },
  {
    id: 4,
    name: 'Solar Solutions',
    industry: 'Renewable Energy',
    foundedYear: 2015,
    headquarters: 'Austin',
    revenue: 60000000,
  },
  {
    id: 5,
    name: 'HealthFirst',
    industry: 'Healthcare',
    foundedYear: 2008,
    headquarters: 'New York',
    revenue: 80000000,
  },
  {
    id: 6,
    name: 'EcoPower',
    industry: 'Renewable Energy',
    foundedYear: 2018,
    headquarters: 'Seattle',
    revenue: 55000000,
  },
  {
    id: 7,
    name: 'MediCare',
    industry: 'Healthcare',
    foundedYear: 2012,
    headquarters: 'Boston',
    revenue: 70000000,
  },
  {
    id: 8,
    name: 'NextGen Tech',
    industry: 'Technology',
    foundedYear: 2018,
    headquarters: 'Chicago',
    revenue: 72000000,
  },
  {
    id: 9,
    name: 'LifeWell',
    industry: 'Healthcare',
    foundedYear: 2010,
    headquarters: 'Houston',
    revenue: 75000000,
  },
  {
    id: 10,
    name: 'CleanTech',
    industry: 'Renewable Energy',
    foundedYear: 2008,
    headquarters: 'Denver',
    revenue: 62000000,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await company.bulkCreate(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/companies', async (req, res) => {
  try {
    const companies = await company.findAll();
    if (companies.length === 0) {
      return res.status(404).json({ message: 'Data not found!' });
    }
    res.json({ companies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/companies/details/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const companies = await company.findOne({ where: { id } });
    if (companies.length === 0) {
      return res.status(404).json({ message: 'Data not found!' });
    }
    res.json({ companies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/companies/industry/:industry', async (req, res) => {
  try {
    const industry = req.params.industry;
    const companies = await company.findAll({ where: { industry } });
    if (companies.length === 0) {
      return res.status(404).json({ message: 'Data not found!' });
    }
    res.json({ companies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/companies/revenue', async (req, res) => {
  try {
    const order = req.query.order.toLowerCase();
    const companies = await company.findAll({ order: [['revenue', order]] });
    if (companies.length === 0) {
      return res.status(404).json({ message: 'Data not found!' });
    }
    res.json({ companies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Server listening to port ' + PORT);
});
