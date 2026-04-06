import api from './api';

export const fetchCNNModels = async () => {
  const response = await api.get('/cnn-models');
  return response.data;
};
