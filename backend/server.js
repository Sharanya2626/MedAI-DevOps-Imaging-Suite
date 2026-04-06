import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import cnnRoutes from './routes/cnnRoutes.js';
import xrayRoutes from './routes/xrayRoutes.js';
import metricsRoutes from './routes/metricsRoutes.js';
import xaiRoutes from './routes/xaiRoutes.js';
import pipelineRoutes from './routes/pipelineRoutes.js';
import deployRoutes from './routes/deployRoutes.js';
import monitoringRoutes from './routes/monitoringRoutes.js';
import registryRoutes from './routes/registryRoutes.js';
import driftRoutes from './routes/driftRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB().catch(err => console.error('DB Error:', err));

// Welcome route for /api
app.get('/api', (req, res) => {
  res.json({
    message: 'MedAI-DevOps Imaging Suite API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/login',
      dashboard: '/api/dashboard',
      cnnModels: '/api/cnn-models',
      xrayAnalysis: '/api/xray-analysis',
      metrics: '/api/metrics',
      xai: '/api/xai',
      ciPipeline: '/api/ci-pipeline',
      cdDeploy: '/api/cd-deploy',
      monitoring: '/api/monitoring',
      modelRegistry: '/api/model-registry',
      dataDrift: '/api/data-drift',
      feedback: '/api/feedback',
      settings: '/api/settings'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/cnn-models', cnnRoutes);
app.use('/api/xray-analysis', xrayRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/xai', xaiRoutes);
app.use('/api/ci-pipeline', pipelineRoutes);
app.use('/api/cd-deploy', deployRoutes);
app.use('/api/monitoring', monitoringRoutes);
app.use('/api/model-registry', registryRoutes);
app.use('/api/data-drift', driftRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/settings', settingsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`MedAI backend running on port ${PORT}`);
});
