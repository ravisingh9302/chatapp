import { createSlice } from '@reduxjs/toolkit'

const initialstate={
    currentChat:null,
    status:"offline",
    lastSeen:false,
    onlineUsers:[],
    onlineUsersids:[],
    messages:null,
    chatId:null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialstate,
  reducers: {
    setStatus: (state, value) => {
      state.status= value.payload
    },
    setLastseen(state,value){
      state.lastSeen=value.payload;
    },
    setOnlineusers(state,value){
      state.onlineUsers=value.payload;
    },
    setOnlineusersids(state,value){
      state.onlineUsersids=value.payload;
    },
    setCurrentchat(state,value){
      state.currentChat =value.payload;
      // console.log("current chat selected",value.payload.email)
    },
    setChatid(state,value){
      state.chatId =value.payload;
      console.log("chat id set ",value.payload)
    },
    setMessages(state,value){
      state.messages =value.payload;
      console.log("fetched msg set",value.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentchat,setStatus,setOnlineusers,setLastseen,setOnlineusersids,setChatid,setMessages} = chatSlice.actions

export default chatSlice.reducer