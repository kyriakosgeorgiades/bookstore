import { UserLoginResponseDto } from "./../Dto/Users/Response/userLoginResponseDto";
import { UserLoginRequestDto } from "../Dto/Users/Request/userLoginRequestDto";
import { UserRegisterRequestDto } from "../Dto/Users/Request/userRegisterRequestDto";
import { createAPI } from "./api";
import { ApiEndpoints } from "../endpoints/api-endpoints";

export const loginUser = (
  data: UserLoginRequestDto,
  setLoading: (value: boolean) => void
) => {
  const apiClient = createAPI(setLoading);
  return apiClient.post<UserLoginResponseDto>(
    `${ApiEndpoints.USER.LOGIN}`,
    data
  );
};

export const registerUser = (
  data: UserRegisterRequestDto,
  setLoading: (value: boolean) => void
) => {
  const apiClient = createAPI(setLoading);
  return apiClient.post(`${ApiEndpoints.USER.REGISTER}`, data);
};
