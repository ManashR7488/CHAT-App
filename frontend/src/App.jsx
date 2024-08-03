import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Login from "./components/Authentication/Login";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className=" min-h-[100vh] w-full">
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
