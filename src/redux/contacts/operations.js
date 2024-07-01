import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = 'https://connections-api.goit.global';

// Оголошення асинхронних операцій
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async (newContact, thunkAPI) => {
  try {
    const response = await axios.post('/contacts', newContact);
    toast.success('Contact added successfully!');
    return response.data;
  } catch (error) {
    toast.error('Failed to add contact. Please try again.');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, thunkAPI) => {
  try {
    await axios.delete(`/contacts/${contactId}`);
    toast.success('Contact deleted successfully!');
    return contactId;
  } catch (error) {
    toast.error('Failed to delete contact. Please try again.');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});