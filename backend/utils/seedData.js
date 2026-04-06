import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import DashboardStat from '../models/DashboardStat.js';
import CNNModel from '../models/CNNModel.js';
import XrayCase from '../models/XrayCase.js';
import Metric from '../models/Metric.js';
import XAIFeature from '../models/XAIFeature.js';
import ModelRegistry from '../models/ModelRegistry.js';
import DriftReport from '../models/DriftReport.js';
import Feedback from '../models/Feedback.js';
import Setting from '../models/Setting.js';

dotenv.config();

const seed = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await DashboardStat.deleteMany();
    await CNNModel.deleteMany();
    await XrayCase.deleteMany();
    await Metric.deleteMany();
    await XAIFeature.deleteMany();
    await ModelRegistry.deleteMany();
    await DriftReport.deleteMany();
    await Feedback.deleteMany();
    await Setting.deleteMany();

    const user = await User.create({
      name: 'Dr. Maya Patel',
      email: 'clinician@medai.dev',
      password: 'Password123!',
      role: 'Clinician'
    });

    await DashboardStat.create({
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
    });

    await CNNModel.create([
      { name: 'MedAI-CNN-v5', inputShape: '224x224x3', optimizer: 'Adam', lossFunction: 'Categorical Crossentropy', status: 'Training', accuracy: 94.2 },
      { name: 'LungScanNet', inputShape: '256x256x3', optimizer: 'SGD', lossFunction: 'Focal Loss', status: 'Deployed', accuracy: 92.8 }
    ]);
    await XrayCase.create([
      { caseId: 'PA-1024', prediction: 'Pneumonia', confidence: 95, category: 'abnormal' },
      { caseId: 'PA-1029', prediction: 'Normal', confidence: 88, category: 'normal' },
      { caseId: 'PA-1033', prediction: 'Cardiomegaly', confidence: 91, category: 'abnormal' }
    ]);

    await Metric.create(Array.from({ length: 8 }, (_, i) => ({
      epoch: i + 1,
      loss: Number((1 / (i + 1) + 0.1).toFixed(3)),
      accuracy: Number((70 + i * 3.2).toFixed(1)),
      valLoss: Number((1.1 / (i + 1) + 0.12).toFixed(3)),
      valAccuracy: Number((68 + i * 3.5).toFixed(1))
    })));

    await XAIFeature.create([
      { name: 'Opacity', importance: 32, description: 'Lung opacity impact', detail: 'High feature weight in abnormal predictions' },
      { name: 'Lung Contour', importance: 24, description: 'Organ boundary clarity', detail: 'Strong effect on segmentation and classification' },
      { name: 'Tissue Density', importance: 18, description: 'Relative radiodensity', detail: 'Moderate impact from soft-tissue changes' }
    ]);

    await ModelRegistry.create([
      { name: 'MedAI-CNN-v5', version: '2.8.1', accuracy: 94.2, status: 'Production', createdAt: '2026-04-01', deployed: true },
      { name: 'LungScanNet', version: '1.5.7', accuracy: 92.8, status: 'Staging', createdAt: '2026-03-12', deployed: false }
    ]);

    await DriftReport.create({
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
    });

    await Feedback.create([
      { author: 'Dr. Alvarez', rating: 5, comment: 'The AI guidance is precise and saves hours of review time.', tags: ['high priority', 'usability'] },
      { author: 'Radiology Tech', rating: 4, comment: 'Model performance is strong, but inference logs can be more detailed.', tags: ['logging', 'accuracy'] }
    ]);

    await Setting.create({
      profile: { name: 'Dr. Maya Patel', email: 'clinician@medai.dev' },
      system: { theme: 'Dark Futuristic', notifications: 'Email and Slack', autoUpdate: true },
      model: { defaultModel: 'MedAI-CNN-v5', threshold: 88, feedbackEnabled: true },
      notifications: { alerts: 'Critical only', reports: 'Daily summary', frequency: 'Every 6 hours' }
    });

    console.log('Database seeded successfully.');
    process.exit();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
