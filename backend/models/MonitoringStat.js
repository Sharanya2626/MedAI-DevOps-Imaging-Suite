import mongoose from 'mongoose';

const monitoringStatSchema = mongoose.Schema({
  uptime: Number,
  latency: Number,
  alerts: Number,
  resources: Array
}, { timestamps: true });

const MonitoringStat = mongoose.model('MonitoringStat', monitoringStatSchema);
export default MonitoringStat;
