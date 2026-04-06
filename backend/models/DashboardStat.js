import mongoose from 'mongoose';

const dashboardStatSchema = mongoose.Schema({
  modelAccuracy: Number,
  truePositives: Number,
  falseNegatives: Number,
  epochs: Number,
  trainingHistory: Array,
  confusionMatrix: Array,
  liveStatus: Array
}, { timestamps: true });

const DashboardStat = mongoose.model('DashboardStat', dashboardStatSchema);
export default DashboardStat;
