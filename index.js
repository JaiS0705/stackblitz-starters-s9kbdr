const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3010;
let db;

// Connect to SQLite database
(async () => {
  db = await open({
    filename: 'books_database.sqlite',
    driver: sqlite3.Database,
  });
  if (db) console.log('Connected to the SQLite database.');
})();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.2 HW1 - SQL Queries & async/await' });
});

app.get('/books', async (req, res) => {
  try {
    const books = await db.all('Select * from Books');
    if (books.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/books/author/:author', async (req, res) => {
  try {
    const author = req.params.author;
    const books = await db.all('Select * from books where author = ?', [
      author,
    ]);
    if (books.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/books/genre/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    const books = await db.all('Select * from books where genre = ?', [genre]);
    if (books.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/books/publication_year/:year', async (req, res) => {
  try {
    const year = Number.parseInt(req.params.year);
    const books = await db.all(
      'Select * from books where publication_year = ?',
      [year]
    );
    if (books.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
