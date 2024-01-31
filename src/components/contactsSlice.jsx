import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: '',
};

const fetchContactsUrl = 'https://connections-api.herokuapp.com/contacts';
const addContactUrl = 'https://connections-api.herokuapp.com/contacts';
const deleteContactUrl = 'https://connections-api.herokuapp.com/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const token = getTokenFromState(thunkAPI.getState());
      const response = await axios.get(fetchContactsUrl, {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const token = getTokenFromState(thunkAPI.getState());
      const response = await axios.post(addContactUrl, newContact, {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const token = getTokenFromState(thunkAPI.getState());
      await axios.delete(`${deleteContactUrl}/${contactId}`, {
        headers: { Authorization: token },
      });
      return contactId;
    } catch (error) {
      throw error;
    }
  }
);

// Вспомогательная функция для получения токена из состояния
const getTokenFromState = state => {
  // Замените эту логику на ваш способ получения токена из состояния приложения
  // Например, если у вас есть редуктор для авторизации, вы можете использовать state.auth.token
  return 'ваш_токен';
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
