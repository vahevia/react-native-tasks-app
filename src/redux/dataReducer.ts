import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { fetchInformation } from '../services/fetchInformation'
export type DataElement = {
  id: string;
  name: string;
  avatar: string;
}
type DataState = {
  data: DataElement[],
  status: "loading" | "idle",
  error: string | null
}

const initialState: DataState = {
  data: [],
  status: "idle",
  error: null
}
    
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInformation.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchInformation.fulfilled, 
      (state, { payload }) => {
      state.data = payload
      state.status = "idle";
    });
  },
});

export const dataSelector = (state: RootState) => state.dataReducer.data;
export const selectStatus = (state: RootState) => state.dataReducer.status;
export default dataSlice.reducer;