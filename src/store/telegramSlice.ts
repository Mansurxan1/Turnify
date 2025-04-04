// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface TelegramUser {
//   firstName: string;
//   lastName: string;
//   photoUrl: string | null;
//   theme: "light" | "dark";
//   telegramId: string;
//   username?: string;
// }

// const initialState: TelegramUser = {
//   firstName: "",
//   lastName: "",
//   photoUrl: null,
//   theme: "light",
//   telegramId: "",
//   username: "",
// };

// const telegramSlice = createSlice({
//   name: "telegram",
//   initialState,
//   reducers: {
//     setUserData: (state, action: PayloadAction<TelegramUser>) => {
//       state.firstName = action.payload.firstName;
//       state.lastName = action.payload.lastName;
//       state.photoUrl = action.payload.photoUrl;
//       state.theme = action.payload.theme;
//       state.telegramId = action.payload.telegramId;
//       state.username = action.payload.username || "";
//     },
//   },
// });

// export const { setUserData } = telegramSlice.actions;
// export default telegramSlice.reducer;

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
  theme: "light",
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
      state.photoUrl = action.payload.photoUrl;
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
