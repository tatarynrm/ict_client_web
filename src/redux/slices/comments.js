import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (id) => {
    try {
      const data = await axios.get(`/comments/${id}`);
      if (data.status === 200) {
        return data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  comments: {
    comments: [],
    items: [],
    loading: "loading",
  },
};
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.items = [...state.comments.items, action.payload];
    },
  },
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
  },
});
export const { addComment } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
