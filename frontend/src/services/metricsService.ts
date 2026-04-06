import api from './api';

export const fetchMetrics = async () => {
  const response = await api.get('/metrics');
  return response.data;
};
