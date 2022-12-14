import React from "react";
import Add from "../img/upload_icon.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { storage, auth, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

    const [err , setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        setLoading(true);
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try{
            const res = await createUserWithEmailAndPassword(auth, email , password);

            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            console.log(file);
            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                  try {

                    console.log('File available at', downloadURL);
                    
                    //update profile
                    await updateProfile(res.user, {
                        displayName,
                        photoURL: downloadURL,
                    });

                    //create user on firestore
                    await setDoc(doc(db, "users",res.user.uid ), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL:downloadURL,
                    });

                    //create empty user chats on firestore
                    await setDoc(doc(db, "userChats", res.user.uid), {});
                    navigate("/");
                } catch (err) {
                    console.log(err);
                    setErr(true);
                    setLoading(false);
                    }
                });
                });
        } catch (err) {
        setErr(true);
        setLoading(false);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="Logo">Quinchat</span>
                <span className="Register">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Display Name"/>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <input type="file" style={{ display:"none" }} id="file"/>
                    <label htmlFor="file" >
                        <img src={Add} alt="upload_img" width="35" height="35" />
                        <label>Add Your avatar</label>
                    </label>
                    <button disabled={loading}>Sign up</button>
                    {loading && "Uploading and compressing the image please wait..."}
                    {err && <span>Something went wrong</span>}
                </form>
                <p id="log_in_text">You have an account? <Link to="/login">Log_In</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;