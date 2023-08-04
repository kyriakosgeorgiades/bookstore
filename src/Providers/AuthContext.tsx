import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { UserLoginResponseDto } from '../Dto/Users/Response/userLoginResponseDto';
import { AuthContextType } from '../assets/Interfaces/Auth.interface';
import { validateToken } from '../services/users-https-service';
import LoadingContext from '../Context/loadingContext';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserLoginResponseDto | undefined>();
    const { isLoading, setLoading } = useContext(LoadingContext);

    useEffect(() => {
        const checkTokenValidity = async () => {
            const isValid = await validateToken(setLoading);
            setIsAuthenticated(isValid);
        }
        checkTokenValidity();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
