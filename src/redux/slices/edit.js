import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  zapEdit: false,
  zapAddSlice: false,
  zapEditData: {
    zav: "",
    rozv: "",
    zapText: "",
    zapKod: "",
    zapKodOs: "",
  },
};
const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    editZapRedux: (state) => {
      state.zapEdit = !state.zapEdit;
    },
    editZapAddSlice: (state) => {
      state.zapAddSlice = !state.zapAddSlice;
    },
    editZapEditData: (state, action) => {
      state.zapEditData = action.payload;
    },
  },
});
export const { editZapRedux, editZapAddSlice, editZapEditData } =
  editSlice.actions;
export const editReducer = editSlice.reducer;
