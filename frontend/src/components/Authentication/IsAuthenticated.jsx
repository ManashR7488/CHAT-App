import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Navigate, Outlet } from "react-router-dom";

const IsAuthenticated = () => {
  const { auth } = ChatState();

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default IsAuthenticated;
