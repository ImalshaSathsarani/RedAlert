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

export const donationPostApi = {
  getAllPosts: async () => {
    try {
      console.log('Fetching donation posts from:', API_BASE_URL + '/api/donor/posts');
      const response = await api.get('/api/donor/posts');
      console.log('Donation posts fetched:', response.data.posts);
      return response.data.posts;
    } catch (error: any) {
      console.error('Error fetching donation posts:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch donation posts';
    }
  },
};

export const hospitalApi = {
  getAllHospitals: async () => {
    try {
      const response = await api.get('/api/community/gethospitals'); // adjust endpoint
      console.log("Fetched hospitals:", response.data.hospitals);
      return response.data.hospitals;
    } catch (error: any) {
      console.error("Error fetching hospitals:", error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch hospitals';
    }
  }
};

export const commentApi = {
  addComment: async (postId: string, commentText: string) => {
    try {
      console.log('Sending add comment:', { postId, commentText });
      const response = await api.post('/api/community/addcomment', { postId, commentText });
      console.log('Add comment response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Add comment error:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to add comment';
    }
  },

  getCommentsByPost: async (postId: string) => {
    try {
      console.log('Fetching comments for postId:', postId);
      const response = await api.get(`/api/community/getcomment/${postId}`);
      console.log('Comments fetched:', response.data.comments);
      return response.data.comments;
    } catch (error: any) {
      console.error('Get comments error:', error.response?.data || error.message);
      throw error.response?.data?.message || 'Failed to fetch comments';
    }
  },
};

export const chatApi = {
  sendMessage: async (message: string) => {
    try {
      console.log("Sending message to chatbot:", message);
      const response = await api.post('/api/chatbot/chat', { message });
      console.log("Chatbot response:", response.data);
      return response.data.reply;  // assuming backend returns { reply: "some text" }
    } catch (error: any) {
      console.error("Chat error:", error.response?.data || error.message);
      throw error.response?.data?.message || "Failed to get chatbot reply";
    }
  }
};
