import { UserLoginResponseDto } from "./../Dto/Users/Response/userLoginResponseDto";
import { UserLoginRequestDto } from "../Dto/Users/Request/userLoginRequestDto";
import { UserRegisterRequestDto } from "../Dto/Users/Request/userRegisterRequestDto";
import { createAPI } from "./interceptor-http";
import { ApiEndpoints } from "../endpoints/api-endpoints";
import useApi from "./useApi";

export const loginUser = async (
  data: UserLoginRequestDto,
  setLoading: (value: boolean) => void
) => {
  const apiClient = createAPI(setLoading);
  return await apiClient.post<UserLoginResponseDto>(
    `${ApiEndpoints.USER.LOGIN}`,
    data
  );
};

export const registerUser = async (
  data: UserRegisterRequestDto,
  setLoading: (value: boolean) => void
) => {
  const apiClient = createAPI(setLoading);
  return await apiClient.post(`${ApiEndpoints.USER.REGISTER}`, data);
};

export const validateToken = async (setLoading: (value: boolean) => void) => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const apiClient = createAPI(setLoading);
  try {
    await apiClient.get(`${ApiEndpoints.USER.VALIDATE_JWT}`);
    return true;
  } catch (error) {
    return false;
  }
};
