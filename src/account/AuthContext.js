import React from 'react';

export const AuthContext = React.createContext({
    // (App.js) <AuthContext.Provider value={{isSignedIn: isSignedIn}}> 會把值(false)蓋掉
    isSignedIn: false,
    setStatus: ()=>{}
  })