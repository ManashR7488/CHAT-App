import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.post("/api/getuser");
      setUser(response.data.user);
      console.log(response.data.user);
      setAuth(response.data.auth);
    } catch (error) {
      setAuth(false);
      navigate("/");
    }
    console.log(auth);
  };

  useEffect(() => {
    fetchUser();
    console.log(auth);
  }, []);

  return (
    <chatContext.Provider value={{ user, setUser, auth, setAuth}}>
      {children}
    </chatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(chatContext);
};

export default ChatProvider;
