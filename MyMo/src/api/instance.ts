import axios from 'axios';

const MymoAxiosInstance = axios.create({
  baseURL: 'http://localhost:5500',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default MymoAxiosInstance;
