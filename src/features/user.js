import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
  token: null, // Add token to the state
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    resetUser: () => initialState,
  },
});

export const { resetRegistered, setUser } = userSlice.actions;
export default userSlice.reducer;
