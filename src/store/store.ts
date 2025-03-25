import { configureStore } from "@reduxjs/toolkit";
import telegramReducer from "./telegramSlice";

export const store = configureStore({
  reducer: {
    telegram: telegramReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;