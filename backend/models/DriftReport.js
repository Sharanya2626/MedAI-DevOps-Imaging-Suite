import mongoose from 'mongoose';

const driftReportSchema = mongoose.Schema({
  cards: Array,
  details: Array
}, { timestamps: true });

const DriftReport = mongoose.model('DriftReport', driftReportSchema);
export default DriftReport;
