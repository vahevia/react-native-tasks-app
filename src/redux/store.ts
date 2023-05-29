import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './tasksReducer'
import dataReducer from './dataReducer'

export const store = configureStore({
  reducer: {
    taskReducer,
    dataReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;