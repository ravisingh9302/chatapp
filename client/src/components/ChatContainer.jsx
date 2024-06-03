import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import Option from "./OptionOnContainer";
import { v4 as uuidv4 } from "uuid";
import { saveMsgapi, getMsgapi, getLastseenapi, updateMsgOnchatapi } from "../utils/apiservice/ApiMessage";
import chatImg from "../assets/chatbgr.png"
import { useSelector, useDispatch } from "react-redux";
import { socket, send_currentChat_open } from "../utils/SocketFunction";
import { setOnlineusers, setStatus, setLastseen, setCurrentchat } from "../reduxstate/ChatSlice";

export default function ChatContainer() {
  const dispatch = useDispatch()
  const { onlineUsers, status, currentChat, onlineUsersids, chatId, messages } = useSelector(state => state.Chat)
  const { currentUser, loading, allContacts } = useSelector(state => state.Auth)
  const [newRecivedmsg, setNewrecivedmsg] = useState(null);
  const [someOneopenchat, setSomeoneopenchat] = useState(null);
  const [userChatseen, setUserchatseen] = useState(null);

  const [Lastseen, setLastseen] = useState(null);
  const [Typing, setTyping] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    socket.on("get-typing", (data) => {
      setTyping(data)
    })

    socket.on("msg-recieve", (data) => {
      console.log("msg recieve ", data)
      setNewrecivedmsg(data)
    })
    socket.on("someOne_open_yourchat", (data) => {
      console.log("some oneopen chat", data)
      setSomeoneopenchat(data)
    })
  }, [socket]);



  useEffect(() => {
    // console.log("useEffect on currentChat getMsgapi getLastseenapi")
    getMsgapi(currentUser?._id, currentChat?._id, null, dispatch)
    getLastseenapi(currentChat?.email, setLastseen)
  }, [currentChat])

  useEffect(() => {
    if (chatId) {
      console.log("After chatId updateMsg")
      updateMsgOnchatapi(chatId, currentUser?.email, 1,setUserchatseen)
    }
  }, [chatId])

  useEffect(() => {
    if (newRecivedmsg) {
      console.log(" new recieved message after usestate", newRecivedmsg)
      console.log("current user ", currentChat?.email)
      console.log("current id ", chatId)
      // console.log("current revecied chat id ",newRecivedmsg?)

      if (currentChat?.email === newRecivedmsg?.from) {
        console.log("user is now live chating")
        newRecivedmsg.status = "seen"
        updateMsgOnchatapi(newRecivedmsg?.chatId, newRecivedmsg?.to, 0,setUserchatseen)
        // getMsgapi(currentUser?._id, null, chatId, dispatch)
      }
      else {
        console.log("user only online not in live chating ")
        // getMsgapi(currentUser?._id, currentChat?._id, chatId, dispatch)
      }
    }
  }, [newRecivedmsg]);

  useEffect(() => {
    if (userChatseen) {
      console.log("marked all chat seen")
      getMsgapi(currentUser?.email,null,chatId,dispatch)
      send_currentChat_open(currentUser?.email,currentChat?.email)
    }
  }, [userChatseen])

  // useEffect(() => {
  //   if (userLiveChatseen) {
  //     console.log("live chat seen")
  //     getMsgapi(currentUser?.email,null,chatId,dispatch)
  //     send_currentChat_open(currentUser?.email,currentChat?.email)
  //   }
  // }, [userLiveChatseen])


  useEffect(() => {
    if (someOneopenchat) {
      if (currentChat?.email === someOneopenchat?.who) {
        console.log("user is now live chating")
        getMsgapi(currentUser?._id, null, chatId, dispatch)
      }
      else {
        console.log("user only online not in live chating ")
        // getMsgapi(currentUser?._id, currentChat?._id, chatId, dispatch)
      }
    }
  }, [someOneopenchat]);





  useEffect(() => {
    var chatDiv = document.getElementById("chatcont");
    chatDiv?.scrollTo({ top: chatDiv.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-recieve", (msg) => {
  //       setArrivalMessage({ fromSelf: false, message: msg });
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage]);

  const dateFormat = (Lastseen) => {
    const d = new Date(Lastseen);
    const d1 = new Date();
    let pre;
    if (d1.getMonth() - d.getMonth() === 0 && d1.getFullYear() - d.getFullYear() === 0) {
      if (d1.getDate() - d.getDate() === 0) {
        pre = `Today at ${d.getHours()}:${d.getMinutes()}`
      }
      if (d1.getDate() - d.getDate() === 1) {
        pre = `Yesterday at ${d.getHours()}:${d.getMinutes()}`
      }

      if (d1.getDate() - d.getDate() >= 2) {
        pre = "a Week ago"
      }
    }
    if (d1.getMonth() - d.getMonth() !== 0 && d1.getFullYear() - d.getFullYear() === 0) {
      pre = " Few month ago"
    }
    return pre;
  }

  const formatTime = (time) => {
    const d = new Date(time);
    const d1 = new Date();
    let d2 = d.getHours() >= 13 ? d.getHours() - 12 : d.getHours();
    let d3 = d.getHours() >= 12 ? 'pm' : "am"
    let pre;
    if (d1.getMonth() - d.getMonth() === 0 && d1.getFullYear() - d.getFullYear() === 0) {
      if (d1.getDate() - d.getDate() === 0) {

        pre = `Today at ${d2}:${d.getMinutes()} ${d3}`
      }
      if (d1.getDate() - d.getDate() === 1) {
        pre = `Yesterday at ${d2}:${d.getMinutes()} ${d3}`
      }

      if (d1.getDate() - d.getDate() >= 2) {
        pre = `${d.getDay()}/${d.getMonth()}/${d.getFullYear}} at ${d2}:${d.getMinutes()} ${d3}`
      }
    }
    if (d1.getMonth() - d.getMonth() !== 0 && d1.getFullYear() - d.getFullYear() === 0) {
      pre = `${d.getDay()}/${d.getMonth()}/${d.getFullYear}} at ${d2}:${d.getMinutes()} ${d3}`
    }
    return pre;
  }


  return (
    <div className="border-l-2 border-l-[#0e1215] grid grid-rows-[10%_80%_10%] h-[100%] rounded-r-lg ">


      <div className="chat-header  flex flex-row justify-between   bg-[#202C33] rounded-tr-lg">
        <div className="user-details pl-4  flex flex-row w-3/12 gap-4">
          <div className="avatar   flex items-center relative">
            <img width={50} className="border rounded-full border-[#364853]" src={`https://api.dicebear.com/6.x/micah/svg?radius=50&seed=${currentChat?.username}`}
              alt="avatar"
            />
          </div>
          <div className="username text-white   text-lg font-semibold flex flex-col ">

            <div className=" pt-3  h-[60%] ">{currentChat?.username}</div>
            {onlineUsersids?.includes(currentChat.email) ? <div className="text-green-500 text-xs pb-5 h-[40%] ">{Typing ? `${Typing}` : "Online"}</div> : <div className="text-green-500 text-xs pb-5 h-[40%] ">{`Last seen ${dateFormat(Lastseen)}`}</div>}

          </div>
        </div>
        <Option />
      </div>

      {/* bg-[rgba(101,133,249,0.8)] */}
      <div className="relative bg-transparent ">
        <div className="absolute top-0 bottom-0 left-0 right-0  opacity-10 bg-black" style={{ backgroundImage: `url(${chatImg})` }}> </div>
        {/* <div className="border border-blue-600 relative bg-repeat  bg-center    before:absolute before:overflow before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[#0c140e] before:bg-opacity-80  " style={{ backgroundImage: `url(${chatImg})` }}> */}
        <div id="chatcont" className="absolute right-0 left-0 top-0 bottom-0  overflow-auto bg-transparent  flex flex-col gap-1 h-full px-5 py-2">
          {messages?.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()} className="relative  " >
                <div className={`message ${message.senderId === currentUser?.email ? "justify-end" : "justify-start"}  flex  content-center   items-center text-white `}>
                  <div className={`content ${message.senderId === currentUser?.email ? "bg-[#005C4B]" : "bg-[#202C33]"} py-1 px-2 rounded-lg `}>
                    <p>{message.message}</p>
                    <p className="text-xs pl-5 text-gray-400">{formatTime(message.createdAt)} {message.senderId === currentUser?.email ? <span className="text-xs">{message.status === "sent" ? <span className="text-gray-200">&#10003;</span> : message.status === "seen" ? <span className="text-blue-500 font-bold">&#10003;&#10003;</span> : <span className="text-gray-200">&#10003;&#10003;</span>}</span> : ''}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ChatInput chatId={chatId} />
    </div>
  );
}

