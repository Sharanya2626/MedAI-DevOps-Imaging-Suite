import mongoose from 'mongoose';

const pipelineRunSchema = mongoose.Schema({
  id: String,
  status: String,
  duration: String,
  triggered: String,
  steps: Array
}, { timestamps: true });

const PipelineRun = mongoose.model('PipelineRun', pipelineRunSchema);
export default PipelineRun;
