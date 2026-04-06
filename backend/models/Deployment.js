import mongoose from 'mongoose';

const deploymentSchema = mongoose.Schema({
  environment: String,
  description: String,
  lastVersion: String,
  lastDeployed: String,
  logs: Array,
  rollbackAvailable: Boolean
}, { timestamps: true });

const Deployment = mongoose.model('Deployment', deploymentSchema);
export default Deployment;
