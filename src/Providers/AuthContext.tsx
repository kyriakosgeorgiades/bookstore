import React, { createContext, useState, ReactNode } from 'react';
import { UserLoginResponseDto } from '../Dto/Users/Response/userLoginResponseDto';
import { AuthContextType } from '../assets/Interfaces/Auth.interface';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserLoginResponseDto | undefined>();

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
