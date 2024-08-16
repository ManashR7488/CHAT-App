import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import NavBar from "./Miscellaneous/Navbar";
import MyChat from "./MyChat";
import ChatBox from "./ChatBox";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const Chat = () => {
  const navigate = useNavigate();
  const { user } = ChatState();

  const createChat = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/chat",
      { userId: "66b7ac33572899c5da9764a6" },
      config
    );
    console.log(data);
  };
  const createGroupChat = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/chat/group",
      {
        name: "testGroup",
        users: '["66b7ac67572899c5da9764ac","66b7a3bccaac658d4900f898"]\n',
      },
      config
    );
    console.log(data);
  };
  const renameGroup = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      "/api/chat/rename",
      {
        chatId: "66b869bcda77e242627dbcd8",
        chatName: "changeAgain",
      },
      config
    );
    console.log(data);
  };
  const addToGroup = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      "/api/chat/groupAdd",
      {
        chatId: "66b869bcda77e242627dbcd8",
        userId: "66b7ac87572899c5da9764af",
      },
      config
    );
    console.log(data);
  };
  const removeFromGroup = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      "/api/chat/groupRemove",
      {
        chatId: "66b869bcda77e242627dbcd8",
        userId: "66b7ac87572899c5da9764af",
      },
      config
    );
    console.log(data);
  };
  const LogOut = async () => {
    const { data } = await axios.get("/api/logout");
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-full h-screen text-white">
      <Tooltip id="my-tooltip" />
      {user && <NavBar />}
      {user && (
        <div className="w-full h-[91.5vh] bg-gray-800 flex justify-between p-1">
          {user && <MyChat />}
          {user && <ChatBox />}
        </div>
      )}
    </div>
  );
};

export default Chat;
