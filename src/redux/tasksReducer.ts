import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
export type Task = {
  id: string;
  title: string;
}
const initialState: Array<Task> = []

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
  },
});
export const { addTask } =
taskSlice.actions;
export const taskSelector = (state: RootState) => state.taskReducer;
export default taskSlice.reducer;