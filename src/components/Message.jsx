import React from "react";

const Message = () =>{
    return(
        <div className="message">
            <div className="messageInfo">
                <img src="https://pics.freeicons.io/uploads/icons/png/13223326931670927362-512.png" alt="" />
                <span>Just now</span>
            </div>
            <div className="messageContent">
                <p>Hello</p>
                {/* <img src="https://pics.freeicons.io/uploads/icons/png/14268383841557740323-512.png" alt="" /> */}
            </div>
        </div>
    )
}

export default Message;