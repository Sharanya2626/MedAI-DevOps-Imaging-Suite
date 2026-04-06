import DriftReport from '../models/DriftReport.js';

const defaultDrift = {
  cards: [
    { label: 'Feature Drift', score: 18, status: 'Stable' },
    { label: 'Population Drift', score: 22, status: 'Moderate' },
    { label: 'Severity', score: 14, status: 'Low' }
  ],
  details: [
    { feature: 'Age Distribution', score: 22, driftLevel: 'Moderate', severity: 'medium' },
    { feature: 'Density Variation', score: 14, driftLevel: 'Low', severity: 'low' },
    { feature: 'Scan Orientation', score: 18, driftLevel: 'Stable', severity: 'low' }
  ]
};

export const getDrift = async (req, res) => {
  const record = await DriftReport.findOne().lean();
  res.json(record || defaultDrift);
};
