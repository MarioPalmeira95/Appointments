/* eslint-disable prettier/prettier */
import axios from 'axios';

//Quando em localhost, a string localhost não funciona. Usar
const api = axios.create({baseURL: 'http://10.0.2.2:8080'});

export default api;
