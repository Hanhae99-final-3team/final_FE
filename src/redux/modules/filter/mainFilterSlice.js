import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const api = "http://43.200.179.217:8080";

export const getData = createAsyncThunk(
  "mainFilter/getData",
  async (payload, thunkApi) => {
    try {
      const response = await axios.get(
        `https://fabius-bk.shop/items/petcategory?petCategory=${payload.state}?page=0&size=10`
      );
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const mainFilterSlice = createSlice({
  name: "mainFilter",
  initialState,
  reducers: {},
  extraReducers: {
    [getData.pending]: (state) => {
      state.isLoading = true;
    },
    [getData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.conut++;
      state.data = action.payload;
    },
    [getData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = mainFilterSlice.actions;
export default mainFilterSlice.reducer;
