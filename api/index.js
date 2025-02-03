import express from 'express';
import cors from 'cors';
import connectDB from '../db/db.js';
import Comment from '../models/comment.js';
import sanitizeHtml from 'sanitize-html';

const app = express();
app.use(express.json());
app.use(cors());

// Koneksi ke database hanya sekali
connectDB();

// Endpoint GET Comments
app.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ timeStamp: -1 }).limit(100);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint POST Comment
app.post('/', async (req, res) => {
  try {
    const { name, text, timeStamp, attendance } = req.body;
    if (!name || !text || typeof attendance !== 'boolean') {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const newComment = new Comment({
      name: sanitizeHtml(name),
      text: sanitizeHtml(text),
      attendance,
      timeStamp,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
