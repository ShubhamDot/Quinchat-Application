import React from "react";
import Add from "../img/upload_icon.png"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {

    const handleSubmit = (e) =>{
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[0].value;
        const password = e.target[0].value;
        const file = e.target[0].files[0];


        

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="Logo">Quinchat</span>
                <span className="Register">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Display Name"/>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <input type="file" style={{display:"none"}} className="file_upload" id="file"/>
                    <label htmlFor="file" >
                        <img src={Add} alt="upload_img" width="35" height="35" />
                        <label>Add Your avatar</label>
                    </label>
                    <button>Sign Up</button>
                </form>
                <p id="log_in_text">You have an account? Log_In</p>
            </div>
        </div>
    )
}

export default Register;