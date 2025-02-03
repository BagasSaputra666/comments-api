import mongoose from 'mongoose';

// Comment schema
const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  attendance: { type: Boolean, required: true },
  timeStamp: { type: Date, default: Date.now },
});

const Comment = new mongoose.model('Comment', commentSchema);

export default Comment;
