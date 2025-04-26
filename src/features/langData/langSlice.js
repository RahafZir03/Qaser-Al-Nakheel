import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: localStorage.getItem("lang") || "en",
};

const langSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem("lang", action.payload);
    },
    syncLanguage: (state) => {
      state.lang = localStorage.getItem("lang") || "en";
    },
  },
});

export const { setLanguage, syncLanguage } = langSlice.actions;
export default langSlice.reducer;