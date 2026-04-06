import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema({
  author: String,
  rating: Number,
  comment: String,
  tags: Array
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
