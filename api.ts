import axios from 'axios';
import { Category, CategoryItem } from './types';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
};

export const login = async (username: string, password: string): Promise<{ token: string; username: string }> => {
    const response = await api.post('/login', { username, password });
    return response.data;
};

export const updateCredentials = async (data: any) => {
    const response = await api.put('/credentials', data);
    return response.data;
};

export const createCategory = async (data: Partial<Category>) => {
    const response = await api.post('/categories', data);
    return response.data;
};

export const updateCategory = async (id: string, data: Partial<Category>) => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
};

export const deleteCategory = async (id: string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
};

export const createItem = async (data: any) => {
    const response = await api.post('/items', data);
    return response.data;
};

export const updateItem = async (id: string, data: any) => {
    const response = await api.put(`/items/${id}`, data);
    return response.data;
};

export const deleteItem = async (id: string) => {
    const response = await api.delete(`/items/${id}`);
    return response.data;
};

export const reorderItems = async (items: { id: string; position: number }[]) => {
    const response = await api.put('/items/reorder', { items });
    return response.data;
};
