import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add error handling for all requests
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Add a request interceptor to include token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Donor Authentication API
export const donorAuthApi = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    mobileNo: string;
    bloodType: string;
  }) => {
    try {
      console.log('Sending registration data:', userData);
      console.log('Sending request to:', API_BASE_URL + '/api/auth/register');
      const response = await api.post('/api/auth/register', userData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Full error object:', error);
      console.error('Error response:', error.response?.data);
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      console.log('Sending login request to:', API_BASE_URL + '/api/auth/login');
      const response = await api.post('/api/auth/login', credentials);
      console.log('Login response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Login failed';
    }
  },
};

// Donor Profile API
export const donorProfileApi = {
  updateProfile: async (data: any) => {
    try {
      const response = await api.put('/donor/profile', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Profile update failed';
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/donor/profile');
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch profile';
    }
  },
};
