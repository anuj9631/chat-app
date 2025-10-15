import { Children, createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import {io} from "socket.io-client"


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
      connectSocket(data.user)
    }
  } catch (error) {
    toast.error(error.message)
  }
}


//Login function to handle user authentication and socket connection
const login = async (state, credential)=>{
  try {
    const {data} = await axios.post(`/api/auth/${state}`, credential);
    if(data.success){
      setAuthUser(data.userData)
      connectSocket(data.userData)
      axios.defaults.headers.common["token"] = data.token;
      setToken(data.token)
      localStorage.setItem("toekn", data.token)
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

// Logout function to handle user logout and socket disconnection

const logout = async () => {
  localStorage.removeItem("token");
  setToken(null);
  setAuthUser(null);
  setOnlineUsers([]);
  axios.defaults.headers.common["token"] = null;
  toast.success("Logged out successfully")
  socket.disconnect();
}


//connect socket function to handle socket connection and online user updates
const connectSocket = (userData)=>{
  if(!userData || socket?.connected ) return;
  const newSocket= io(backendUrl,{
    query: {
      userId: userData._id,

    }
  });
  newSocket.connect();
  setSocket(newSocket);
  newSocket.on("getOnlineUsers",(userIds)=>{
    setOnlineUsers(userIds)
  })
}


useEffect(()=>{
if(token){
  axios.defaults.headers.common["token"] = token;
}
checkAuth()
},[])

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