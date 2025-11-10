import axios from 'axios';


// Make sure this points to the correct backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // use your backend port
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const signup = (formData) => api.post('/auth/signup', formData);

export const getMyJobs = () => {
  return api.get('/jobs/my-jobs'); // adjust the endpoint if needed
};
export const getAppliedJobs = () => {
  return api.get('/jobs/applied'); // use your actual API endpoint here
};

export default api;



