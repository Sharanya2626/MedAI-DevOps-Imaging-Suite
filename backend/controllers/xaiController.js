import XAIFeature from '../models/XAIFeature.js';

const defaultXAI = {
  summary: 'The model highlights lung opacity, pleural thickening and shape features as key predictors for abnormal imaging findings.',
  features: [
    { name: 'Opacity', importance: 32 },
    { name: 'Lung Contour', importance: 24 },
    { name: 'Tissue Density', importance: 18 },
    { name: 'Border Sharpness', importance: 14 },
    { name: 'Texture Variation', importance: 12 }
  ],
  cards: [
    { title: 'Gradient CAM', description: 'Focus area highlights for high confidence predictions.' },
    { title: 'Feature Attribution', description: 'Score contributions show impact on model output.' },
    { title: 'Interpretability', description: 'Visual diagnostics for clinician review.' }
  ]
};

export const getXAI = async (req, res) => {
  const records = await XAIFeature.find().lean();
  res.json({ ...defaultXAI, features: records.length ? records : defaultXAI.features });
};
