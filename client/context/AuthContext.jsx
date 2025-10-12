import { Children, createContext, useState } from "react";
import axios from 'axios'


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();
export const AuthProvider =({Children})=>{
const [token, setToken] = useState(localStorage.getItem("token"));
const [authUser, setAuthUser] = useState(null);
const [onlineUsers, setOnlineUsers] = useState([]);
const [socket, setSocket] = useState(null);

  const value = {
    axios
  }
  return (
    
    <AuthContext.Provider value={value}>
    {Children}
    </AuthContext.Provider>

  )
}