import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { UserLoginResponseDto } from "../Dto/Users/Response/userLoginResponseDto";
import { AuthContextType } from "../assets/Interfaces/Auth.interface";
import { validateToken } from "../services/users-https-service";
import LoadingContext from "../Context/loadingContext";
import { showToast } from "../helpers/toastHelper";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserLoginResponseDto | undefined>();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const isValid = await validateToken(setLoading);
        setIsAuthenticated(isValid);
      } catch (error) {
        showToast("Failed to validate token.", "error");
        setIsAuthenticated(false);
      }
    };
    
    checkTokenValidity();
  }, []);
  

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
