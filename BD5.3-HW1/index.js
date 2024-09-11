const express = require('express');
const app = express();
const { sequelize } = require('./lib/index.js');
const { post } = require('./models/post.model.js');
const PORT = 3010;
app.use(express.json());
let posts = [
  {
    title: 'Getting Started with Node.js',
    content:
      'This post will guide you through the basics of Node.js and how to set up a Node.js project.',
    author: 'Alice Smith',
  },
  {
    title: 'Advanced Express.js Techniques',
    content:
      'Learn advanced techniques and best practices for building applications with Express.js.',
    author: 'Bob Johnson',
  },
  {
    title: 'ORM with Sequelize',
    content:
      'An introduction to using Sequelize as an ORM for Node.js applications.',
    author: 'Charlie Brown',
  },
  {
    title: 'Boost Your JavaScript Skills',
    content:
      'A collection of useful tips and tricks to improve your JavaScript programming.',
    author: 'Dana White',
  },
  {
    title: 'Designing RESTful Services',
    content: 'Guidelines and best practices for designing RESTful APIs.',
    author: 'Evan Davis',
  },
  {
    title: 'Mastering Asynchronous JavaScript',
    content:
      'Understand the concepts and patterns for writing asynchronous code in JavaScript.',
    author: 'Fiona Green',
  },
  {
    title: 'Modern Front-end Technologies',
    content:
      'Explore the latest tools and frameworks for front-end development.',
    author: 'George King',
  },
  {
    title: 'Advanced CSS Layouts',
    content: 'Learn how to create complex layouts using CSS Grid and Flexbox.',
    author: 'Hannah Lewis',
  },
  {
    title: 'Getting Started with React',
    content: "A beginner's guide to building user interfaces with React.",
    author: 'Ian Clark',
  },
  {
    title: 'Writing Testable JavaScript Code',
    content:
      'An introduction to unit testing and test-driven development in JavaScript.',
    author: 'Jane Miller',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await post.bulkCreate(posts);
    res.json({ message: 'Data seeded!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await post.findAll();
    if (posts.length === 0) {
      return res.status(404).json({ message: 'data not found' });
    }
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/posts/new', async (req, res) => {
  try {
    const newPostData = req.body.post;
    console.log(newPostData);
    const newPost = await post.create(newPostData);
    res.json({ newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/posts/update/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const newPostData = req.body.post;
    const selectedPost = await post.findOne({ where: { id } });
    console.log(selectedPost);
    if (!selectedPost) {
      return res
        .status(404)
        .json({ message: 'post with id=' + id + ' not found' });
    }
    selectedPost.set(newPostData);
    const updatedPost = await selectedPost.save();
    res.json({ updatedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/posts/delete', async (req, res) => {
  try {
    const id = req.body.id;
    const deletedPost = await post.destroy({ where: { id } });
    res.json({ message: 'Post record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Server listening to port ' + PORT);
});
