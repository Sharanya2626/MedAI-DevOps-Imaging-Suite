import api from './api';

export const fetchDrift = async () => {
  const response = await api.get('/data-drift');
  return response.data;
};
