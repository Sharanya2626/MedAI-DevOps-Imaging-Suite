import api from './api';

export const fetchSettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};
