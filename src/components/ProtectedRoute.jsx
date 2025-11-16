import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Outlet />;
    }
    return <Navigate to="/login" replace />;
}

export default ProtectedRoute
