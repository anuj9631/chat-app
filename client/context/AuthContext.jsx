import { Children, createContext } from "react";
import axios from 'axios'


const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();
export const AuthProvider =({Children})=>{
  const value = {
    axios
  }
  return (
    
    <AuthContext.Provider value={value}>
    {Children}
    </AuthContext.Provider>

  )
}