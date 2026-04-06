import api from './api';

export const fetchMonitoring = async () => {
  const response = await api.get('/monitoring');
  return response.data;
};
