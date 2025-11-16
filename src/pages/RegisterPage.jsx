import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from "../api"

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await api.post("/auth/register", {
                username: username,
                password: password
            });
            alert('Registered :)');
            navigate('/login');
        } catch (error) {
            console.error("Register error:", error);
            setError(error.response ? error.response.data.message : "Error");
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <div>
      <h1>Register</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">ID:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p>
        Already have an account? <NavLink to="/login">Login</NavLink>
      </p>
    </div>
    )
}

export default RegisterPage
