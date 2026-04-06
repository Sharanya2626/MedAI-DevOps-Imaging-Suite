import mongoose from 'mongoose';

const xaiFeatureSchema = mongoose.Schema({
  name: String,
  importance: Number,
  description: String,
  detail: String
}, { timestamps: true });

const XAIFeature = mongoose.model('XAIFeature', xaiFeatureSchema);
export default XAIFeature;
