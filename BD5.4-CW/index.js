const express = require('express');
const app = express();
const { sequelize } = require('./lib/index.js');
const { track } = require('./models/track.model.js');
const { like } = require('./models/like.model.js');
const { user } = require('./models/user.model.js');
const PORT = 3010;
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

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await track.bulkCreate(tracks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/users/new', async (req, res) => {
  try {
    const newUserData = req.body.newUser;
    const newUser = await user.create(newUserData);
    return res.json({ newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/users/update/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const selectedUser = await user.findOne({ where: { id } });
    selectedUser.set(updatedData);
    if (!selectedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedUser = await selectedUser.save();
    res.json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Server running at port ' + PORT);
});
