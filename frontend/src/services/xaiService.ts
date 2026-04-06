import api from './api';

export const fetchXAI = async () => {
  const response = await api.get('/xai');
  return response.data;
};
