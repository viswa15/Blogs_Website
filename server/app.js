const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Blogs = require("./Model/mongodb.blog");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const moment = require('moment');
const connectDB = require('./config/db');
const colors = require('colors');


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

connectDB()

const PORT = process.env.PORT || 5000;
// const DATABASEURL = process.env.DATABASE_URL;
// console.log(DATABASEURL)
app.use(cookieParser());
const now = moment();


const formattedDate = now.format('MMMM Do, YYYY');


// mongoose
//   .connect(DATABASEURL)
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(PORT, () => {
//       console.log(`Server running on ${PORT}`); //To check server is running
//     });
//   })
//   .catch(() => {
//     console.log("Connection Failed");
//   });

//getting all blogs
app.get("/blogs", async (req, res) => {
  try {
    const posts = await Blogs.find();
    res.status(201).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get blog by Id
app.get("/blogs/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const post = await Blogs.findOne({_id});
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//add new blog
app.post("/blogs", async (req, res) => {
  const { title, author, summary, content } = req.body;
  console.log(req.body)
  const post = new Blogs({
    title,
    author,
    summary,
    content,
    publicationDate: formattedDate,
  });

  try {
    const newPost = await post.save();
    res.status(201).json({message : "Blog added successfully",newPost});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.put('/blogs/:_id', async (req, res) => {
    try {
        const post = await Blogs.findById(req.params._id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const { title, author, summary, content } = req.body;
        post.title = title;
        post.author = author;
        post.summary = summary;
        post.content = content;
        post.publicationDate = formattedDate;

        const updatedPost = await post.save();
        res.status(201).json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.delete('/blogs/:_id', async (req, res) => {
    try {
        const post = await Blogs.findById(req.params._id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        await post.deleteOne();
        res.status(201).json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});