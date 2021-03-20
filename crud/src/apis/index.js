import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44332/'    
});

export default api;