const express = require('express');
const { sequelize } = require('./lib/index.js');
const { posts } = require('./models/posts.model.js');
const app = express();
const PORT = 3010;

let postsData = [
  {
    id: 1,
    name: 'Post1',
    author: 'Author1',
    content: 'This is the content of post 1',
    title: 'Title1',
  },
  {
    id: 2,
    name: 'Post2',
    author: 'Author2',
    content: 'This is the content of post 2',
    title: 'Title2',
  },
  {
    id: 3,
    name: 'Post3',
    author: 'Author1',
    content: 'This is the content of post 3',
    title: 'Title3',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await posts.bulkCreate(postsData);
    res.json({ message: 'Data is seeded' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/posts/details/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await posts.findOne({ where: { id } });
    if (post.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/posts/author/:author', async (req, res) => {
  try {
    const author = req.params.author;
    const postsData = await posts.findAll({ where: { author } });
    if (postsData.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.json({ posts: postsData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/posts/sort/name', async (req, res) => {
  try {
    const order = req.query.order.toLowerCase();
    const postsData = await posts.findAll({ order: [['name', order]] });
    if (postsData.length === 0) {
      res.status(404).json({ message: 'data not found' });
    }
    res.json({ posts: postsData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
