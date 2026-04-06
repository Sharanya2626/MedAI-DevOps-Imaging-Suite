import mongoose from 'mongoose';

const metricSchema = mongoose.Schema({
  epoch: Number,
  loss: Number,
  accuracy: Number,
  valLoss: Number,
  valAccuracy: Number
}, { timestamps: true });

const Metric = mongoose.model('Metric', metricSchema);
export default Metric;
