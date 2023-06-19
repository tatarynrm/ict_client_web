import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchZap = createAsyncThunk(
  "cargos/fetchCargos",
  async (KOD_OS) => {
    try {
      const { data } = await axios.post("/zap", { KOD_OS: KOD_OS });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchZapById = createAsyncThunk(
  "cargos/fetchCargoById",
  async (id) => {
    try {
      const data = await axios.get(`/zap/${id}`);
      if (data.status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchGroups = createAsyncThunk(
  "cargos/fetchGroups",
  async (kod) => {
    try {
      const data = await axios.post(`/zap/groups`, { kod: kod });
      if (data.status === 200) {
        return data.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchMyZap = createAsyncThunk(
  "cargos/fetchGroups",
  async (kod) => {
    const { data } = await axios.post(`/zap/groups`, { kod: kod });
    return data;
  }
);

const initialState = {
  zap: {
    items: [],
    groups: [],
    loading: "loading",
  },
};
const zapSlice = createSlice({
  name: "zap",
  initialState,
  reducers: {
    addReduxZap: (state, action) => {
      state.zap.items = [...state.zap.items, action.payload];
    },
    changeCommentsCount: (state, action) => {
      const id = action.payload;
      const counterComm = state.zap.items.find((item) => item.KOD === id);
      if (counterComm) {
        counterComm.COUNTCOMM += 1;
      }
      state.zap.items = [...state.zap.items];
    },
  },
  extraReducers: {
    [fetchZap.pending]: (state) => {
      state.zap.items = [];
      state.zap.status = "loading";
    },
    [fetchZap.fulfilled]: (state, action) => {
      state.zap.items = action.payload;
      state.zap.status = "loaded";
    },
    [fetchZap.rejected]: (state) => {
      state.zap.items = [];
      state.zap.status = "error";
    },
    [fetchZapById.pending]: (state) => {
      state.zap.items = [];
      state.zap.status = "loading";
    },
    [fetchZapById.fulfilled]: (state, action) => {
      state.zap.items = action.payload;
      state.zap.status = "loaded";
    },
    [fetchZapById.rejected]: (state) => {
      state.zap.items = [];
      state.zap.status = "error";
    },
    [fetchGroups.pending]: (state) => {
      state.zap.groups = [];
      state.zap.status = "loading";
    },
    [fetchGroups.fulfilled]: (state, action) => {
      state.zap.groups = action.payload;
      state.zap.status = "loaded";
    },
    [fetchGroups.rejected]: (state) => {
      state.zap.groups = [];
      state.zap.status = "error";
    },
  },
});
export const { addReduxZap, changeCommentsCount } = zapSlice.actions;
export const zapReducer = zapSlice.reducer;
