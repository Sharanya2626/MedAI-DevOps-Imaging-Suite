import api from './api';

export const fetchDeployments = async () => {
  const response = await api.get('/cd-deploy');
  return response.data;
};
