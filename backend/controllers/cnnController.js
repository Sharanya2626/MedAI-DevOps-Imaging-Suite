import CNNModel from '../models/CNNModel.js';

const defaultModels = {
  models: [
    { name: 'MedAI-CNN-v5', inputShape: '224x224x3', optimizer: 'Adam', lossFunction: 'Categorical Crossentropy', status: 'Training', accuracy: 94.2 },
    { name: 'LungScanNet', inputShape: '256x256x3', optimizer: 'SGD', lossFunction: 'Focal Loss', status: 'Deployed', accuracy: 92.8 }
  ]
};

export const getCNNModels = async (req, res) => {
  const records = await CNNModel.find().lean();
  res.json({ models: records.length ? records : defaultModels.models });
};
