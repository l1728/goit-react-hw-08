import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = 'https://connections-api.goit.global/';

// Функція для встановлення токена авторизації в заголовки запитів

const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Функція для очищення заголовків авторизації

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
}

// Операція для реєстрації нового користувача

export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const res = await axios.post('users/signup', credentials);
            setAuthHeader(res.data.token);
            toast.success('Registration successful! Welcome!');
            return res.data;
        }
        catch (error) {
            toast.error('Registration error. Please try again.');
            return thunkAPI.rejectWithValue(error.message);

        }
    }

);


// Операція для входу користувача

export const logIn = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const res = await axios.post('users/login', credentials);
            setAuthHeader(res.data.token);
            toast.success('Login successful! Welcome!');
            return res.data;
        }
        catch (error) {
            toast.error('Login error. Please try again.');
            return thunkAPI.rejectWithValue(error.message);

        }
    }

);


// Операція для виходу користувача

export const logOut = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await axios.post('users/logout');
            clearAuthHeader();
         }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


// Операція для оновлення користувача за токеном

export const refreshUser = createAsyncThunk(
    // Базовий тип екшену
    'auth/refresh',
    async (_, thunkAPI) => {
        // Отримання поточного стану з thunkAPI
        const state = thunkAPI.getState();
        // Отримання збереженого токена з стану auth
        const persistedToken = state.auth.token;


        if (persistedToken === null) {
            // Якщо токен відсутній, повертаємо помилку
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }

        try {
            // Встановлення збереженого токена авторизації
            setAuthHeader(persistedToken);
            // Відправка GET-запиту для отримання поточного користувача
            const res = await axios.get('users/current');
            return res.data;
         }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)