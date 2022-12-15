import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    //real time operation
    const unsub = useEffect(() => {
        onAuthStateChanged(auth, (user) =>{
            setCurrentUser(user);
            console.log(user);
        })
        
        //cleanup function
        return() =>{
            unsub();
        }
    }, []);


    return(
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
    );
}