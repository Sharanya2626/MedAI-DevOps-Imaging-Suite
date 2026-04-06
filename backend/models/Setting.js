import mongoose from 'mongoose';

const settingSchema = mongoose.Schema({
  profile: Object,
  system: Object,
  model: Object,
  notifications: Object
}, { timestamps: true });

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
