import React, { useEffect, useState, useRef } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

import { sendMsgapi,getMsgapi } from "../utils/apiservice/ApiMessage";
import { send_Typing_status,sendMsg } from "../utils/SocketFunction";
import { useSelector, useDispatch } from "react-redux";

export default function ChatInput({chatId}) {
  const dispatch = useDispatch()
  const Ref =useRef()
  const [msg, setMsg] = useState("");
  const [typing, setTyping] = useState(null);


  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { onlineUsers, status, currentChat, onlineUsersids } = useSelector(state => state.Chat)
  const { currentUser, loading, allContacts } = useSelector(state => state.Auth)


  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (Ref.current && !Ref.current.contains(event.target)) {
        // Close the dropdown
        setShowEmojiPicker(false)
      }
    };

    document.addEventListener('click', handleClickOutside);
    // return () => {
    //   document.removeEventListener('click', handleClickOutside);
    // };
  }, [Ref]);


  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      // handleSendMsg(msg);
      console.log("chat id ", chatId)
      sendMsg(currentChat?.email,currentUser?.email,msg,chatId)
      setMsg("");
      getMsgapi(null, null,chatId,dispatch)
    }
  };


  // const handleSendMsg = (msg) => {
  //   sendMsgapi(currentUser._id, currentChat?._id, msg)
  //   const msgs = [...messages];
  //   msgs.push({ fromSelf: true, message: msg });
  //   setMessages(msgs);
  // };

  const Usertyping = () => {
    setTyping(true)
    send_Typing_status(currentUser?.email, currentChat?.email, "Typing...")
  }
  const UsernotTyping = () => {
    setTyping(false)
    send_Typing_status(currentUser?.email, currentChat?.email, null)
  }

  useEffect(() => {
    if (showEmojiPicker) {
      send_Typing_status(currentUser?.email, currentChat?.email, "Chooing emojis...")
    }

    if(showEmojiPicker && typing ){
      send_Typing_status(currentUser?.email, currentChat?.email, null)
    }
    if(!showEmojiPicker && typing ){
      send_Typing_status(currentUser?.email, currentChat?.email, null)
    }
  }, [showEmojiPicker]);


  return (
    <div className="bg-[#202C33] grid grid-cols-[5%_90%_5%] items-center px-4  gap-2">

      <div className="button-container flex justify-center text-[#7C8B95] ">
        <div className="emoji text-3xl relative" ref={Ref}>
          <div>
            <BsEmojiSmileFill onClick={handleEmojiPickerhideShow}/>
          </div>
          <div className="absolute">
            {showEmojiPicker &&
              <Picker className="bottom-[490px] left-[-20px] border-2 border-red-700" onEmojiClick={handleEmojiClick} />
            }
          </div>
        </div>
      </div>



      <form className="input-container rounded-xl" onSubmit={(event) => sendChat(event)}>
        <input
          className="w-full bg-[#2A3942] px-4 py-2 text-white outline-none rounded-xl"
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          onFocus={Usertyping}
          onBlur={UsernotTyping}

        />
      </form>

      <button type="submit" onClick={(event) => sendChat(event)} className="text-3xl text-[#7C8B95]">
        <IoMdSend />
      </button>
    </div>
  );
}



