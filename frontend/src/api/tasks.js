import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/tasks' });

export const fetchTasks = () => API.get('/');
export const addTask = (description) => API.post('/', { description });
export const updateTask = (id, updatedData) => API.put(`/${id}`, updatedData);
export const deleteTask = (id) => API.delete(`/${id}`);