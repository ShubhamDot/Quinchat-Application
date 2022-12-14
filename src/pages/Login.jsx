import React from "react";

const Login = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="Logo">Quinchat</span>
                <span className="Register">Login</span>
                <form>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    
                    <button id="sign_up_button">Sign In</button>
                </form>
                <p id="log_in_text">You have an account? Register</p>
            </div>
        </div>
    )
}

export default Login;