import api from './api';

export const fetchRegistry = async () => {
  const response = await api.get('/model-registry');
  return response.data;
};
