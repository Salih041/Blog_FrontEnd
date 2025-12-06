import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [userRole, setUserRole] = useState(localStorage.getItem('role') || 'user');
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (token && userId) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId)
            setIsLoading(false);
        }
        else {
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            localStorage.removeItem('userId')
            setUser(null);
            setIsLoading(false);
        }
    }, [token,userId])

    const login = (newToken,newUserId, newRole) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('userId', newUserId);
        localStorage.setItem('role', newRole || 'user');
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        setToken(newToken)
        setUserId(newUserId)
        setUserRole(newRole || 'user');
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        setUserRole('user');
        setToken(null);
    }

    const value = {
        user, token,userId,userRole,
        isAdmin:userRole=='admin',
        login, logout,
        isLoggedIn: !!token
    }


    if (isLoading) return <p>loading</p>

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};