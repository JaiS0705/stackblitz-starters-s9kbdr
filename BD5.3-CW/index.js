const express = require('express');
const app = express();
const { track } = require('./models/track.model.js');
const { sequelize } = require('./lib/index.js');
const PORT = 3010;
const axios = require('axios');

app.use(express.json());
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
const data = {
  name: 'Kalank Title',
  genre: 'Romantic',
  release_year: 2019,
  artist: 'Arijit Singh',
  album: 'Kalank',
  duration: 5,
};
app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await track.bulkCreate(tracks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/tracks', async (req, res) => {
  try {
    const tracks = await track.findAll();
    if (tracks.length === 0) {
      return res.status(404).json({ message: 'data not found' });
    }
    res.json({ tracks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/track/new', async (req, res) => {
  try {
    const newTrackJSON = req.body.track;
    const newTrack = await track.create(newTrackJSON);
    res.json(newTrack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/tracks/update/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const selected = await track.findOne({ where: { id } });
    if (selected.length === 0) {
      return res.status(404).json({ message: 'track with this ID not found!' });
    }
    const updatedData = req.body.track;
    selected.set(updatedData);
    const updatedTrack = await selected.save();
    res.json({ updatedTrack });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/tracks/delete', async (req, res) => {
  try {
    const data = req.body.track;
    const deletedTrack = await track.destroy({ where: { id: data.id } });
    if (deletedTrack === 0) {
      return res.status(404).json({ message: 'track with this ID not found!' });
    }
    res.json({ message: 'track with id=' + data.id + ' deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Server listening to port ' + PORT);
});
