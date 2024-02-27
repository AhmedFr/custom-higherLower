import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { LoginResponse } from "@/types/user";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.meta?.response?.status === 401) {
    const root = api.getState() as RootState;
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken: root.user.refreshToken },
      },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      api.dispatch({
        type: "user/login",
        payload: refreshResult.data as LoginResponse,
      });
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({ type: "user/logout" });
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
