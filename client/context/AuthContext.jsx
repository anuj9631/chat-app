import { Children, createContext } from "react";

export const AuthContext = createContext();
export const AuthProvider =({Children})=>{
  const value = {

  }
  return (
    
    <AuthContext.Provider value={value}>
    {Children}
    </AuthContext.Provider>

  )
}