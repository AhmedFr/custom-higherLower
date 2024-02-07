import { api } from "@/redux/services/api";
import {
  LoginRequest,
  LoginResponse,
  NewPasswordRequest,
  RegisterRequest,
  RegisterResponse,
  SimpleResponse,
} from "@/types/user";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: `/auth/register`,
        method: "POST",
        body,
      }),
    }),
    refresh: build.mutation<LoginResponse, { refreshToken: string }>({
      query: (body) => ({
        url: `/auth/refresh`,
        method: "POST",
        body,
      }),
    }),
    forgotPassword: build.mutation<SimpleResponse, { email: string }>({
      query: (body) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body,
      }),
    }),
    newPassword: build.mutation<SimpleResponse, NewPasswordRequest>({
      query: (body) => ({
        url: `/auth/new-password`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useNewPasswordMutation,
} = userApi;
