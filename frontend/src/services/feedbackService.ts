import api from './api';

export const fetchFeedback = async () => {
  const response = await api.get('/feedback');
  return response.data;
};
