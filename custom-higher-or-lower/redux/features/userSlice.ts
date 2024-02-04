import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { LoginResponse } from "@/types/user";
import { useLoginMutation, userApi } from "@/redux/services/user";

export interface UserState {
  isLogged: boolean;
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
  image: string;
}

const initialState: UserState = {
  isLogged: false,
  accessToken: "",
  refreshToken: "",
  username: "",
  email: "",
  image: "",
};

const loginReducer = (
  state: UserState,
  action: PayloadAction<LoginResponse>,
) => {
  state.username = action.payload.username;
  state.email = action.payload.email;
  state.image = action.payload.image;
  state.refreshToken = action.payload.refresh_token;
  state.accessToken = action.payload.access_token;
  state.isLogged = true;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: loginReducer,
    logout: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.image = action.payload.image;
        state.refreshToken = action.payload.refresh_token;
        state.accessToken = action.payload.access_token;
        state.isLogged = true;
      })
      .addMatcher(
        userApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.image = action.payload.image;
          state.refreshToken = action.payload.refresh_token;
          state.accessToken = action.payload.access_token;
          state.isLogged = true;
        },
      );
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
