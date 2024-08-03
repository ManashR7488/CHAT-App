import React, { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {

// const [chat, setChat] = useState([])

  // const fetchChats = async () => {
  //   const { data } = await axios.get('/api/chat') 
  //   setChat(data);
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  return (
    <div>hello</div>
    // <div>
    //   {
    //     chat.map((chat , idx)=> (
    //       <div key={idx} className="p-2 border my-2 bg-zinc-800 text-white">
    //         <h1>name: {chat.chatName}</h1>
    //         <h1>is this a group : {chat.isGroupChat? "yes" : "no"}</h1>
    //       </div>
    //     ))
    //   }
    // </div>
  );
};

export default Chat;
