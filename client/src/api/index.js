import axios from "axios";
import JWT from 'expo-jwt';

const token = JWT.encode({ foo: 'bar' }, process.env.REACT_APP_JWT_SECRET_KEY);

const API = axios.create({ baseURL: 'https://prolio-server.onrender.com' });
// const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    else {
        req.headers.authorization = `${token}`
    }
    return req;
})

export default API