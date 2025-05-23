import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  allUserData: '',
  userRole: '',
  isLoading: true,
};

export const authDataSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    saveAuthData: (state, action) => {
      state.userId = action.payload.userId || null;
      state.allUserData = action.payload.allUserData || null;
      state.userRole = action.payload.userRole || '';
      state.isLoading = false;
    },
    deleteAuthData: (state) => {
      state.userId = null;
      state.allUserData = null;
      state.userRole = '';
      state.isLoading = false;
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { saveAuthData, deleteAuthData, setAuthLoading } = authDataSlice.actions;

export default authDataSlice.reducer;