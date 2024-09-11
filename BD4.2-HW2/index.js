const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3010;
let db;

// Connect to SQLite database
(async () => {
  db = await open({
    filename: 'BD4.2-HW2/tracks_database.sqlite',
    driver: sqlite3.Database,
  });
  if (db) console.log('Connected to the SQLite database.');
})();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.2 HW2 - SQL Queries & async/await' });
});

app.get('/tracks', async (req, res) => {
  try {
    const tracks = await db.all('Select * from tracks');
    if (tracks.length === 0)
      res.status(404).json({ message: 'data not found' });
    res.status(200).json({ tracks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/tracks/artist/:artist', async (req, res) => {
  try {
    const artist = req.params.artist;
    const tracks = await db.all('Select * from tracks where artist = ?', [
      artist,
    ]);
    if (tracks.length === 0)
      res.status(404).json({ message: 'data not found' });
    res.status(200).json({ tracks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/tracks/genre/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    const tracks = await db.all('Select * from tracks where genre = ?', [
      genre,
    ]);
    if (tracks.length === 0)
      res.status(404).json({ message: 'data not found' });
    res.status(200).json({ tracks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/tracks/release_year/:year', async (req, res) => {
  try {
    const year = Number.parseInt(req.params.year);
    const tracks = await db.all('Select * from tracks where release_year = ?', [
      year,
    ]);
    if (tracks.length === 0)
      res.status(404).json({ message: 'data not found' });
    res.status(200).json({ tracks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
