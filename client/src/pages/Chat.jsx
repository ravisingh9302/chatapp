import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
import { getAlluserapi } from "../utils/apiservice/ApiAuth";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { connectSocket, socket } from "../utils/SocketFunction"
import { useSelector, useDispatch } from "react-redux";
import { updateMsgOnloginapi} from "../utils/apiservice/ApiMessage";
import { setOnlineusers, setStatus, setLastseen, setCurrentchat,setOnlineusersids } from "../reduxstate/ChatSlice";


export default function Chat() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { onlineUsers, status, lastSeen, currentChat } = useSelector(state => state.Chat)
  const { currentUser, loading, allContacts } = useSelector(state => state.Auth)
  
  useEffect(() => {
    socket.on("get-online-users", (users) => {
      dispatch(setOnlineusers(users))
    })
  }, [socket]);
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      connectSocket(currentUser?.email)
      getAlluserapi(currentUser?._id, dispatch)
      updateMsgOnloginapi(currentUser?.email)
    }
  }, [currentUser]);


  useEffect(() => {
    let online = []
    onlineUsers?.map((data) => {
      online.push(data.userId)
    })
    dispatch(setOnlineusersids(online))
  }, [onlineUsers])


 


  return (
    <>

      <div className="box-border absolute  left-0 top-0 overflow-auto bg-[#202020] flex flex-col items-center justify-center  w-[100%] h-[100%] ">

        <div className="w-full h-[30%] bg-[#12311d]">
        </div>

        <div className="w-full h-[70%] ">
        </div>

        <div className=" absolute container rounded-lg grid grid-cols-[25%_75%] w-[95vw] h-[95vh] ">

          <div className="rounded-l-lg h-[100%] overflow-hidden ">
            <Contacts />
            
          </div>

          <div className="bg-[#222E35] h-[95vh]  rounded-r-lg " >

            {currentChat === null ? (
              <Welcome />
            ) : (
              <ChatContainer />
            )}
          </div>

        </div>
      </div>

    </>
  );
}

