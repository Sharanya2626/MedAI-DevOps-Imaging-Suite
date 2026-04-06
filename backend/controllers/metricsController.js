import Metric from '../models/Metric.js';

const defaultMetrics = {
  epochs: Array.from({ length: 8 }, (_, i) => ({
    epoch: i + 1,
    loss: Number((1 / (i + 1) + 0.1).toFixed(3)),
    accuracy: Number((70 + i * 3.2).toFixed(1)),
    valLoss: Number((1.1 / (i + 1) + 0.12).toFixed(3)),
    valAccuracy: Number((68 + i * 3.5).toFixed(1))
  }))
};

export const getMetrics = async (req, res) => {
  const records = await Metric.find().lean();
  res.json({ epochs: records.length ? records : defaultMetrics.epochs });
};
