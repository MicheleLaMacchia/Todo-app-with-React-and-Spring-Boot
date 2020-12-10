import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = (props) => {

    const [token, setToken] = useState('');

    return ( 
        <AuthContext.Provider value={[token, setToken]}>
            {props.children}
        </AuthContext.Provider>
      );
}

export default AuthProvider;