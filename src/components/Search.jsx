import React from "react";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { async } from "@firebase/util";

const Search = () =>{
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] =  useState(false);


    //search function
    const handleSearch = async () => {
        const q = query(collection(db, "users"), 
        where("displayName", "==", username)
        );

        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
                console.log(doc.data())
            });
        } catch(err){
            setErr(true);
        }
    };

    //search function
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = () => {
        
    }

    return(
        <div className="search">
            <div className="searchForm">
                <input type="text" 
                placeholder="find a user" 
                onKeyDown={handleKey} 
                onChange={e=>setUsername(e.target.value)}
                value={username}
                />
            </div>
            {err && <span >User not found</span>}
            { user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search;