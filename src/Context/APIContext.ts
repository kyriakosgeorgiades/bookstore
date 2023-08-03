import { UserLoginRequestDto } from "../Dto/Users/Request/userLoginRequestDto";
import { UserRegisterRequestDto } from "./../Dto/Users/Request/userRegisterRequestDto";
import { createContext } from "react";

const APIContext = createContext({
  isLoading: false,
  setLoading: () => {},
  registerUser: async (userData: UserRegisterRequestDto) => {},
  loginUser: async (credentials: UserLoginRequestDto) => {},
});

export default APIContext;
