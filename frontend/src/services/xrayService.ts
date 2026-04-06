import api from './api';

export const fetchXrayCases = async () => {
  const response = await api.get('/xray-analysis');
  return response.data;
};
