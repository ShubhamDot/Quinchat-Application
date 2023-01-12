import React, { useContext, useState } from "react";
import Img from "../img/upload_icon.png"
import Emj_icon from "../img/emoji_icon.png"
import stk1 from "../stickers/brainstorm.png"
import stk2 from "../stickers/drawing-tablet.png"
import stk3 from "../stickers/learning.png"
import stk4 from "../stickers/think-different.png"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, getMetadata, ref, uploadBytesResumable } from "firebase/storage";
import Popup from "./Popup";


const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [buttonPopup, setButtonPopup ] = useState(false);
  const [sticker, setSticker] = useState(null);

  const stk_img1 = require("../stickers/brainstorm.png");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      console.log(img);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const handleStickerSend = async () => {
    setImg(stk_img1);
    console.log(img);
    console.log(stk_img1);
    const sticker_file = new File([stk_img1], "../stickers/brainstorm.png", {
      type: "image/png"
    });

    const metadata = {
      contentType: 'image/png'
    };
    

    console.log(sticker_file)
    if (sticker_file) {
      const storageRef = ref(storage, uuid());
      console.log(sticker_file);
      const uploadTask = uploadBytesResumable(storageRef, sticker_file, metadata);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setButtonPopup(false);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src="" alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <button onClick={() => setButtonPopup(true)} className="popup-button">
          <img src={Emj_icon} alt=""/>
        </button>
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend} onKeyDown={handleKey}>Send</button>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
          <button className="sticker" onClick={handleStickerSend}>
            <img className="sticker-item" src={stk1}></img>
          </button>
          <button className="sticker" onClick={handleStickerSend}>
            <img className="sticker-item" src={stk2}></img>
          </button>
          <button className="sticker" onClick={handleStickerSend}>
            <img className="sticker-item" src={stk3}></img>
          </button>
          <button className="sticker" onClick={handleStickerSend}>
            <img className="sticker-item" src={stk4}></img>
          </button>
        </Popup>
      </div>
    </div>
  );
};

export default Input;