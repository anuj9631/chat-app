import { Children, createContext, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();
export const AuthProvider =({Children})=>{
const [token, setToken] = useState(localStorage.getItem("token"));
const [authUser, setAuthUser] = useState(null);
const [onlineUsers, setOnlineUsers] = useState([]);
const [socket, setSocket] = useState(null);


//check if user is authenticated and if so set the user data and cnnncet the socket

const checkAuth = async () => {
  try {
    const {data} = await axios.get("/api/auth/chcek");
    if(data.success){
      setAuthUser(data.user)
    }
  } catch (error) {
    toast.error(error.message)
  }
}
  const value = {
    axios,
    authUser,
    onlineUsers,
    socket
  }
  return (
    
    <AuthContext.Provider value={value}>
    {Children}
    </AuthContext.Provider>

  )
}