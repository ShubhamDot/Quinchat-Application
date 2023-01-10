import React from "react";
import {  signInWithEmailAndPassword, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase"
import { addDoc, getDocs, query, collection, where, setDoc, doc, onSnapshot } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const [err , setErr] = useState(false);
    const navigate = useNavigate();
    // const [chats, setChats] = useState([]);

    // const { currentUser } = useContext(AuthContext);

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        try{
            await signInWithEmailAndPassword(auth, email, password)
            // .catch((error) => {
            //     const errorCode = error.code;
            //     const errorMessage = error.message;
            //     console.log(errorCode, errorMessage);
            //   });
            navigate("/");
        } catch (err) {
            setErr(true);
        }
    };

    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            const q = query( collection(db, "users"), where("uid", "==", user.uid) );
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                });
            }

            //setting empty chats on firebase
            await setDoc(doc(db, "userChats", res.user.uid), {});
            


            navigate("/");
        } catch (err) {
            setErr(true);
            console.error(err);
            alert(err.message);
        }
    };


    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Quinchat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    
                    <button id="sign_up_button">Sign In</button>
                    {err && <span>Something went wrong</span>}
                </form>

                <button id="log_in_google" placeholder="Log in with google" onClick={signInWithGoogle}
                
                >
                    Log In with Google</button>
                <p id="log_in_text">You have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login;