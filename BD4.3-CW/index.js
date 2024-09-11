const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3010;
let db;

// Connect to SQLite database
(async () => {
  db = await open({
    filename: './BD4.3-CW/database.sqlite',
    driver: sqlite3.Database,
  });
  if (db) console.log('Connected to the SQLite database.');
})();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.2 HW3 - SQL Queries & async/await' });
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await db.all('Select * from movies');
    if (movies.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/movies/actor/:actor', async (req, res) => {
  try {
    const actor = req.params.actor;
    const movies = await db.all('Select * from movies where actor = ?', [
      actor,
    ]);
    if (movies.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/movies/director/:director', async (req, res) => {
  try {
    const director = req.params.director;
    const movies = await db.all('Select * from movies where director = ?', [
      director,
    ]);
    if (movies.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
