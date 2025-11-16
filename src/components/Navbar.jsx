import React from 'react'
import {NavLink,useNavigate} from "react-router-dom" 
import {useAuth} from "../context/AuthContext"

function Navbar() {

  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    logout();
    navigate("/");
  }

  return (
    <nav>
        <div>
            <NavLink to="/">Name</NavLink>
        </div>
        <div>
          {isLoggedIn ? (
            <>
            <NavLink to="/create-post">Create Post</NavLink>
            <button onClick={handleLogout}>Logout</button>
            </>
          ):(
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
    </nav>
  )
}

export default Navbar
