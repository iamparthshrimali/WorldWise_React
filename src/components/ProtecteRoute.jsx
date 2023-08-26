import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

const ProtecteRoute = ({children}) => {
  const { isAuthenticated }=useAuth();
  const navigate=useNavigate();

  useEffect(()=>{
    if(!isAuthenticated) navigate("/",{replace:true})
  },[isAuthenticated,navigate])
  return  isAuthenticated ? children:null;
}

export default ProtecteRoute