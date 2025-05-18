import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  allUserData: '',
  userRole: '',
};

export const authDataSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    saveAuthData: (state, action) => {
      state.userId = action.payload.userId || null;
      state.allUserData = action.payload.allUserData || null;
      state.userRole = action.payload.userRole || '';
    },
    deleteAuthData: (state) => {
      state.userId = null;
      state.allUserData = null;
      state.userRole = '';
    },
  },
});

export const { saveAuthData, deleteAuthData } = authDataSlice.actions;

export default authDataSlice.reducer;