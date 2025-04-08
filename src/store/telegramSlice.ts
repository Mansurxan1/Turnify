import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TelegramUser {
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  theme: "light" | "dark";
  telegramId: number;
  username: string;
}

interface TelegramState {
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  theme: "light" | "dark";
  telegramId: number;
  username: string;
}

const initialState: TelegramState = {
  firstName: "",
  lastName: "",
  photoUrl: null,
  theme: "dark",
  telegramId: 0,
  username: "",
};

const telegramSlice = createSlice({
  name: "telegram",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<TelegramUser>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.photoUrl = action.payload.photoUrl || null;
      state.theme = action.payload.theme;
      state.telegramId = action.payload.telegramId;
      state.username = action.payload.username;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

export const { setUserData, setTheme } = telegramSlice.actions;
export default telegramSlice.reducer;