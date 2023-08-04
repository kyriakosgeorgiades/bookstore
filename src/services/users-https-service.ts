import { UserLoginResponseDto } from "./../Dto/Users/Response/userLoginResponseDto";
import { UserLoginRequestDto } from "../Dto/Users/Request/userLoginRequestDto";
import { UserRegisterRequestDto } from "../Dto/Users/Request/userRegisterRequestDto";
import { createAPI } from "./interceptor-http";
import { ApiEndpoints } from "../endpoints/api-endpoints";

export const loginUser = async (
  data: UserLoginRequestDto,
  setLoading: (value: boolean) => void,
) => {
  const apiClient = createAPI(setLoading);
  return apiClient.post<UserLoginResponseDto>(
    `${ApiEndpoints.USER.LOGIN}`,
    data,
  ).catch(error => {
    console.error("Login error:", error);
    throw error; // re-throw the error so callers can handle it if they want
  });
};

export const registerUser = async (
  data: UserRegisterRequestDto,
  setLoading: (value: boolean) => void,
) => {
  const apiClient = createAPI(setLoading);
  return apiClient.post(`${ApiEndpoints.USER.REGISTER}`, data)
    .catch(error => {
      console.error("Register error:", error);
      throw error;
    });
};

export const validateToken = async (setLoading: (value: boolean) => void) => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const apiClient = createAPI(setLoading);
  try {
    await apiClient.get(`${ApiEndpoints.USER.VALIDATE_JWT}`);
    return true;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};