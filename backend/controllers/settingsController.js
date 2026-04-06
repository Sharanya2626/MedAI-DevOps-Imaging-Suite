import Setting from '../models/Setting.js';

const defaultSettings = {
  profile: { name: 'Dr. Maya Patel', email: 'clinician@medai.dev' },
  system: { theme: 'Dark Futuristic', notifications: 'Email and Slack', autoUpdate: true },
  model: { defaultModel: 'MedAI-CNN-v5', threshold: 88, feedbackEnabled: true },
  notifications: { alerts: 'Critical only', reports: 'Daily summary', frequency: 'Every 6 hours' }
};

export const getSettings = async (req, res) => {
  const record = await Setting.findOne().lean();
  res.json(record || defaultSettings);
};
