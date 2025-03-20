import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TelegramUser {
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  theme: "light" | "dark";
  telegramId: string;
  username?: string; // Yangi maydon: Telegram username (ixtiyoriy)
}

const initialState: TelegramUser = {
  firstName: "",
  lastName: "",
  photoUrl: null,
  theme: "light",
  telegramId: "",
  username: "", // Boshlang‘ich qiymat sifatida bo‘sh string
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
      state.username = action.payload.username || ""; // Username mavjud bo‘lsa o‘rnatiladi, aks holda bo‘sh
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light"; // toggleTheme xatosi tuzatildi
    },
  },
});

export const { setUserData, toggleTheme } = telegramSlice.actions;
export default telegramSlice.reducer;