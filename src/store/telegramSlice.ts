import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TelegramUser {
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  theme: "light" | "dark";
  telegramId: string;
}

const initialState: TelegramUser = {
  firstName: "",
  lastName: "",
  photoUrl: null,
  theme: "light",
  telegramId: "",
};

const telegramSlice = createSlice({
  name: "telegram",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<TelegramUser>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.photoUrl = action.payload.photoUrl;
      state.theme = action.payload.theme;
      state.telegramId = action.payload.telegramId;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setUserData, toggleTheme } = telegramSlice.actions;
export default telegramSlice.reducer;