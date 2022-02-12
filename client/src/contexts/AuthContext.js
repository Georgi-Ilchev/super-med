import React, { useContext, useEffect, useState } from 'react';
import { auth } from "../utils/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    const value = { currentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                console.log(('logged in'));
            } else {
                console.log('Logged out');
            }

            setCurrentUser(user);
        });

        return unsubscribe;
    }, [])


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}





