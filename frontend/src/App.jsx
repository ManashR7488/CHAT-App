import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Login from "./components/Authentication/Login";
import { ToastContainer } from "react-toastify";
import ChatProvider, { ChatState } from "./Context/ChatProvider.jsx";
import axios from "axios";
import IsAuthenticated from "./components/Authentication/IsAuthenticated.jsx";

const App = () => {
  const { auth } = ChatState;
  return (
    <div className=" min-h-[100vh] w-full">
      <ToastContainer theme="dark" />
      <ChatProvider>
        <Routes>
          <Route element={<IsAuthenticated />}>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
          <Route path="/*" element={<p>404 Error - Nothing here...</p>} />
        </Routes>
      </ChatProvider>
    </div>
  );
};

export default App;
