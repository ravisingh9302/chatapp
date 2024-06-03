import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { RiChatNewFill } from "react-icons/ri";
import { socket,send_currentChat_open } from "../utils/SocketFunction";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setOnlineusers, setStatus, setLastseen, setCurrentchat } from "../reduxstate/ChatSlice";

export default function Contacts() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { currentUser, loading, allContacts } = useSelector(state => state.Auth)
  const { currentChat, lastSeen, status, onlineUsers, onlineUsersids, chatId } = useSelector(state => state.Chat)
  const [currentSelect, setCurrentSelect] = useState(null)


  const handleClick = () => {
    localStorage.removeItem('chatapp')
    socket.disconnect()
    navigate("/login");
  }

  const changeCurrentChat = (contact) => {
    console.log("SELECTED", contact.email)
    setCurrentSelect(contact.email);
    // send_currentChat_open(currentUser?.email,contact.email)
    dispatch(setCurrentchat(contact))
  };
  
  return (
    <>

      <div className="grid  grid-rows-[10%_90%] box-border h-[100%]">
        <div className="current-user flex flex-row bg-[#202C33]  items-center justify-between  px-3"  >
          <div className=" flex flex-row gap-2 justify-center items-center">
            <div className="avatar  flex items-center ">
              <img width={45} className="border  rounded-full border-[#b7d2dc]" src={currentUser?.avatarImage}
                alt="avatar"
              />
            </div>
            <div className="username text-white">
              <h2>{currentUser?.username}</h2>
            </div>
          </div>

          <div className=" flex flex-row gap-4 text-2xl items-center">

            <div className="flex justify-center text-[#b2b9b9] cursor-pointer">
              <MdGroups />
            </div>
            <div className="flex justify-center text-[#b2b9b9] cursor-pointer ">
              <RiChatNewFill />
            </div>
            <div className="flex justify-center text-[#b2b9b9] cursor-pointer " onClick={handleClick}>
              <FaPowerOff />
            </div>
            <div className="flex justify-center text-[#b2b9b9] cursor-pointer ">
              <BsThreeDotsVertical />
            </div>
          </div>
        </div>

        <div className="  flex flex-col items-center  overflow-auto bg-[#111B21] " id="contacts">
          {allContacts?.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className={`contact ${contact.email === currentSelect ? "bg-[#202C33]" : ""} text-white flex gap-3 flex-row border-b border-b-[#202C33] min-h-20 hover:bg-[#202C33]  w-full justify-start pl-4 items-center`}
                onClick={() => changeCurrentChat(contact)}
              >
                <div className="avatar  flex relative">
                  <img
                    className="border rounded-full bg-gray-600 border-[#364853]"
                    width={50}
                    src={contact.avatarImage}
                    alt="avatar"
                  />

                  {onlineUsersids?.includes(contact.email) ? <div className="absolute bottom-1 right-0 w-3 h-3 bg-green-500 rounded-full ">
                  </div> : <></>}

                </div>

                <div className="username text-lg font-semibold">
                  <h3>{contact.username}</h3>
                </div>

              </div>
            );
          })}
        </div>

      </div>
      {/* )} */}
    </>
  );
}




