export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  username: string;
  email: string;
  image: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  username: string;
  password: string;
};

export type RegisterResponse = {
  access_token: string;
  refresh_token: string;
  username: string;
  email: string;
  image: string;
};

export type User = {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
  image: string;
};

export type NewPasswordRequest = {
  password: string;
  token: string;
};

export type SimpleResponse = {
  success: boolean;
  error_message: string;
};
