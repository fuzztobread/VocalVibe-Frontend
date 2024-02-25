import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
  token: null,
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return initialState;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('userState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: loadState(),
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
      saveState(state);
    },
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      saveState(state);
    },
    resetUser: (state) => {
      Object.assign(state, initialState);
      saveState(state);
    },
    logoutUser: (state) => {
      Object.assign(state, initialState); // Reset state to initial state
      localStorage.removeItem('userState'); // Remove user data from local storage
    },
  },
});

export const { resetRegistered, setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
