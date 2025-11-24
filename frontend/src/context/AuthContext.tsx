import React, { createContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, role: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken(null);
        setUser(null);
    };

    const login = (newToken: string, role: string) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', role);
        setToken(newToken);
    };

    useEffect(() => {
        if (token) {
            try {
                // Basic JWT decode without library to avoid extra deps if possible, 
                // but for safety usually use jwt-decode. Here we'll do simple base64 decode
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                
                const decoded = JSON.parse(jsonPayload);
                // Also need to check expiration
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    // We might need to store role in localStorage or decode it from token if backend puts it there
                    // Backend puts role in response, but let's assume we put it in token claims or localStorage
                    // For this simple app, let's assume the backend puts 'role' in the token claims or we saved it.
                    // Let's check if we saved role in localStorage
                    const savedRole = localStorage.getItem('role');
                    setUser({ ...decoded, role: savedRole as 'USER' | 'ADMIN' });
                }
            } catch {
                logout();
            }
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ 
            user, 
            token, 
            login, 
            logout, 
            isAuthenticated: !!token,
            isAdmin: user?.role === 'ADMIN'
        }}>
            {children}
        </AuthContext.Provider>
    );
};
