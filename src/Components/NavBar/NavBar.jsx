import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css'

export default function NavBar({ user, handleLogout }) {
  return (
    <nav id="nav">
    <img id = "logoImg" src="https://i.imgur.com/qkIuXh6.png" alt=""></img>
      {user ? 
      <>
      <div id="welcome">Welcome: {user.name}</div>
      <NavLink class = "navLinks" exact to="/profile">Profile</NavLink>
      <NavLink class = "navLinks" exact to="/shared">Shared</NavLink>
      <NavLink class = "navLinks" exact to="/" onClick={handleLogout}>Logout</NavLink>
      </>
      :
      <>
      <NavLink exact to="/signup">SignUp</NavLink>
      <NavLink exact to="/login">Login</NavLink>
      </>
    }
      </nav>
  );
}
