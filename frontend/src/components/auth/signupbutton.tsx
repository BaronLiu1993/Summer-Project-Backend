import React from 'react'
import { useNavigate } from 'react-router-dom';

const signupbutton = () => {
    const navigate = useNavigate();
  
    const handleSignup = () => {
      navigate("/signup");
      window.location.reload();
    }
    return (
      <button className = 'bg-green-500 text-white rounded-md p-2 font-lato' onClick = {handleSignup}>
          Sign Up
      </button>
    )
  }

export default signupbutton
