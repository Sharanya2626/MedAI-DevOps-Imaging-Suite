import mongoose from 'mongoose';

const cnnModelSchema = mongoose.Schema({
  name: String,
  inputShape: String,
  optimizer: String,
  lossFunction: String,
  status: String,
  accuracy: Number,
  layers: Array,
  hyperparameters: Object
}, { timestamps: true });

const CNNModel = mongoose.model('CNNModel', cnnModelSchema);
export default CNNModel;
