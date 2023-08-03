import { UserLoginResponseDto } from "../../Dto/Users/Response/userLoginResponseDto";

export interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserLoginResponseDto | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<UserLoginResponseDto | undefined>
  >;
}
