import mongoose from 'mongoose';

const modelRegistrySchema = mongoose.Schema({
  name: String,
  version: String,
  accuracy: Number,
  status: String,
  createdAt: String,
  deployed: Boolean
}, { timestamps: true });

const ModelRegistry = mongoose.model('ModelRegistry', modelRegistrySchema);
export default ModelRegistry;
