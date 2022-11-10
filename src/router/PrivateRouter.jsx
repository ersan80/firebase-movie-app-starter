import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRouter = () => {
  const { isCurrentUser } = useAuthContext();
  return isCurrentUser ? <Outlet /> : <Navigate to="/login" replace/>
  
};

export default PrivateRouter;
