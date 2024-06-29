import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Оголошення асинхронних операцій
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('https://6675ca1aa8d2b4d072f17795.mockapi.io/contacts');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async (newContact, thunkAPI) => {
  try {
    const response = await axios.post('https://6675ca1aa8d2b4d072f17795.mockapi.io/contacts', newContact);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, thunkAPI) => {
  try {
    await axios.delete(`https://6675ca1aa8d2b4d072f17795.mockapi.io/contacts/${contactId}`);
    return contactId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});