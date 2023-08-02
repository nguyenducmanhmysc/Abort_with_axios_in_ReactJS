
import axios from 'axios'; 

const myAxios = axios.create({
    baseURL: 'http://localhost:8010',
    timeout: 5000,
    withCredentials: false,
    headers: { 'Content-Type': 'application/json' },
});

export default myAxios; 
