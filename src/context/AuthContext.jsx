import React, { createContext, useContext,useEffect, useState } from 'react'
import { userObserver } from '../auth/firebase';


const AuthContextProvider = createContext()

const AuthContext = ({ children }) => {
    const [isCurrentUser, setIsCurrentUser] = useState(false)

    console.log(isCurrentUser);
  useEffect(() => {
    userObserver(setIsCurrentUser);
  }, []);

    const values = {isCurrentUser}
  return (
      <AuthContextProvider.Provider value={values}>
      {children}    
      </AuthContextProvider.Provider>
  )
}


export const useAuthContext = () => {
    
    return useContext(AuthContextProvider)
}
    

export default AuthContext