let express = require('express');
let { track } = require('./models/track.model.js');
let { sequelize } = require('./lib/index.js');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let app = express();
const PORT = process.env.PORT || 3010;
let db;
let tracks = [
  {
    name: 'Raabta',
    genre: 'Romantic',
    release_year: 2012,
    artist: 'Arijit Singh',
    album: 'Agent Vinod',
    duration: 4,
  },
  {
    name: 'Naina Da Kya Kasoor',
    genre: 'Pop',
    release_year: 2018,
    artist: 'Amit Trivedi',
    album: 'Andhadhun',
    duration: 3,
  },
  {
    name: 'Ghoomar',
    genre: 'Traditional',
    release_year: 2018,
    artist: 'Shreya Ghoshal',
    album: 'Padmaavat',
    duration: 3,
  },
  {
    name: 'Bekhayali',
    genre: 'Rock',
    release_year: 2019,
    artist: 'Sachet Tandon',
    album: 'Kabir Singh',
    duration: 6,
  },
  {
    name: 'Hawa Banke',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Darshan Raval',
    album: 'Hawa Banke (Single)',
    duration: 3,
  },
  {
    name: 'Ghungroo',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'War',
    duration: 5,
  },
  {
    name: 'Makhna',
    genre: 'Hip-Hop',
    release_year: 2019,
    artist: 'Tanishk Bagchi',
    album: 'Drive',
    duration: 3,
  },
  {
    name: 'Tera Ban Jaunga',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Tulsi Kumar',
    album: 'Kabir Singh',
    duration: 3,
  },
  {
    name: 'First Class',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 4,
  },
  {
    name: 'Kalank Title Track',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 5,
  },
];
(async () => {
  db = await open({
    filename: './BD5.1-CW/database.sqlite',
    driver: sqlite3.Database,
  });
  if (db) console.log('Connected to the SQLite database.');
})();

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true }); //drops any existing tables and synchronizes with the current model. NOT TO BE USED IN PRODUCTION. Only during development
    await track.bulkCreate(tracks);
    res.status(200).json({ message: 'tracks database created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/tracks', async (req, res) => {
  try {
    const tracks = await db.all('Select * from tracks');
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
