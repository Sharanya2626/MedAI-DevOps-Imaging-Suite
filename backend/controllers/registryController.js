import ModelRegistry from '../models/ModelRegistry.js';

const defaultModels = {
  models: [
    { name: 'MedAI-CNN-v5', version: '2.8.1', accuracy: 94.2, status: 'Production', createdAt: '2026-04-01', deployed: true },
    { name: 'LungScanNet', version: '1.5.7', accuracy: 92.8, status: 'Staging', createdAt: '2026-03-12', deployed: false }
  ]
};

export const getModelRegistry = async (req, res) => {
  const records = await ModelRegistry.find().lean();
  res.json({ models: records.length ? records : defaultModels.models });
};
