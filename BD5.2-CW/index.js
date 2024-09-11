let express = require('express');
let { tracks } = require('./models/tracks.model.js');
let { sequelize } = require('./lib/index.js');
let app = express();
let PORT = 3010;
let tracksData = [
  {
    id: 1,
    name: 'Raabta',
    genre: 'Romantic',
    release_year: 2012,
    artist: 'Arijit Singh',
    album: 'Agent Vinod',
    duration: 4,
  },
  {
    id: 2,
    name: 'Naina Da Kya Kasoor',
    genre: 'Pop',
    release_year: 2018,
    artist: 'Amit Trivedi',
    album: 'Andhadhun',
    duration: 3,
  },
  {
    id: 3,
    name: 'Ghoomar',
    genre: 'Traditional',
    release_year: 2018,
    artist: 'Shreya Ghoshal',
    album: 'Padmaavat',
    duration: 3,
  },
  {
    id: 4,
    name: 'Bekhayali',
    genre: 'Rock',
    release_year: 2019,
    artist: 'Sachet Tandon',
    album: 'Kabir Singh',
    duration: 6,
  },
  {
    id: 5,
    name: 'Hawa Banke',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Darshan Raval',
    album: 'Hawa Banke (Single)',
    duration: 3,
  },
  {
    id: 6,
    name: 'Ghungroo',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'War',
    duration: 5,
  },
  {
    id: 7,
    name: 'Makhna',
    genre: 'Hip-Hop',
    release_year: 2019,
    artist: 'Tanishk Bagchi',
    album: 'Drive',
    duration: 3,
  },
  {
    id: 8,
    name: 'Tera Ban Jaunga',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Tulsi Kumar',
    album: 'Kabir Singh',
    duration: 3,
  },
  {
    id: 9,
    name: 'First Class',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 4,
  },
  {
    id: 10,
    name: 'Kalank Title Track',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 5,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await tracks.bulkCreate(tracksData);
    res.status(200).json({ message: 'Data seeded in DB' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/tracks', async (req, res) => {
  try {
    const tracksData = await tracks.findAll();
    if (tracksData.length === 0) {
      res.status(404).json({ message: 'Data not found' });
    }
    res.json({ tracks: tracksData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/tracks/details/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tracksData = await tracks.findOne({ where: { id } });
    if (tracksData.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.json({ tracks: tracksData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/tracks/artist/:artist', async (req, res) => {
  try {
    const artist = req.params.artist;
    const tracksData = await tracks.findAll({ where: { artist } });
    if (tracksData.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.json({ tracks: tracksData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/tracks/sort/release_year', async (req, res) => {
  try {
    const order = req.query.order;
    const tracksData = await tracks.findAll({
      order: [['release_year', order.toLowerCase()]],
    });
    if (tracksData.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.json({ tracks: tracksData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
