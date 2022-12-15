import React from "react";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";


const Login = () => {

    const [err , setErr] = useState(false);
    const navigate = useNavigate();

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
                <p id="log_in_text">You have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login;