import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CNNModelsPage from './pages/CNNModelsPage';
import XrayAnalysisPage from './pages/XrayAnalysisPage';
import MetricsPage from './pages/MetricsPage';
import ExplainableAIPage from './pages/ExplainableAIPage';
import CIPipelinePage from './pages/CIPipelinePage';
import CDDeployPage from './pages/CDDeployPage';
import MonitoringPage from './pages/MonitoringPage';
import ModelRegistryPage from './pages/ModelRegistryPage';
import DataDriftPage from './pages/DataDriftPage';
import FeedbackPage from './pages/FeedbackPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/cnn-models" element={<CNNModelsPage />} />
        <Route path="/xray-analysis" element={<XrayAnalysisPage />} />
        <Route path="/metrics" element={<MetricsPage />} />
        <Route path="/explainable-ai" element={<ExplainableAIPage />} />
        <Route path="/ci-pipeline" element={<CIPipelinePage />} />
        <Route path="/cd-deploy" element={<CDDeployPage />} />
        <Route path="/monitoring" element={<MonitoringPage />} />
        <Route path="/model-registry" element={<ModelRegistryPage />} />
        <Route path="/data-drift" element={<DataDriftPage />} />
        <Route path="/user-feedback" element={<FeedbackPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
