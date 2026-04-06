import api from './api';

export const fetchPipeline = async () => {
  const response = await api.get('/ci-pipeline');
  return response.data;
};
