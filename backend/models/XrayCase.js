import mongoose from 'mongoose';

const xrayCaseSchema = mongoose.Schema({
  caseId: String,
  prediction: String,
  confidence: Number,
  category: String,
  imageUrl: String,
  notes: String
}, { timestamps: true });

const XrayCase = mongoose.model('XrayCase', xrayCaseSchema);
export default XrayCase;
