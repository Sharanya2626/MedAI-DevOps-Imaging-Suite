import DashboardStat from '../models/DashboardStat.js';

const defaultDashboard = {
  modelAccuracy: 94.2,
  truePositives: 415,
  falseNegatives: 12,
  epochs: 42,
  trainingHistory: [
    { epoch: 1, trainLoss: 1.08, valLoss: 1.16 },
    { epoch: 10, trainLoss: 0.54, valLoss: 0.63 },
    { epoch: 20, trainLoss: 0.28, valLoss: 0.35 },
    { epoch: 30, trainLoss: 0.18, valLoss: 0.22 },
    { epoch: 40, trainLoss: 0.11, valLoss: 0.16 }
  ],
  confusionMatrix: [
    { label: 'True Positive', value: 415 },
    { label: 'True Negative', value: 322 },
    { label: 'False Positive', value: 24 },
    { label: 'False Negative', value: 12 }
  ],
  liveStatus: [
    { label: 'Inference Service', value: 'Operational', badge: 'stable' },
    { label: 'Data Pipeline', value: 'Monitoring', badge: 'stable' },
    { label: 'Alert Service', value: 'Minimal', badge: 'stable' }
  ]
};

export const getDashboard = async (req, res) => {
  const record = await DashboardStat.findOne().lean();
  res.json(record || defaultDashboard);
};
