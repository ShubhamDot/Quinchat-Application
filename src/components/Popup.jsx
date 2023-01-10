import React from "react";
import Cls_icon from "../img/close_icon.png"


function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)} >
                    <img src={Cls_icon} alt="" />
                </button>

                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup;