import React from "react";
import Add from "../img/upload_icon.png"
const Input = () =>{
    return(
        <div className="input">
            <input type="text" placeholder="Type Something..."/>
            <div className="send">
                <img src="" alt="" />
                <input type="file" style={{display:"none"}} className="file_upload" id="file"/>
                    <label htmlFor="file" >
                        <img src={Add} alt="upload_img" width="35" height="45" />
                        {/* <label>Upload</label> */}
                    </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input;