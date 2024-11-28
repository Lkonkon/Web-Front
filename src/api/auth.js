import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log (response);

    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const handleApiError = (error) => {
  console.error('Erro na API:', error);
};
