import { io } from "socket.io-client";


export const socket = io(process.env.BACKEND_URL, {
    path: "/chat"
})


export const connectSocket = (user) => {
    // console.log("connectSocket socket called")
    socket.emit("add-user", user)
};

export const sendMsg = (to_user, from_user, data, chatId) => {
    console.log("sendMsg socket called")
    socket.emit('send-msg', {
        chatId,
        to: to_user,
        from: from_user,
        msg: data,
        status: "",
        createdAt: new Date()
    })
}

export const send_Typing_status = (whois, forwhom, status) => {
    console.log("send typing socket called")
    socket.emit('typing', {
        who: whois,
        whom: forwhom,
        status: status
    })
}

export const send_currentChat_open = (whois,whom) => {
    console.log("send current chat  opened",whois,whom)
    socket.emit('chatOpend', {
        who: whois,
        whom: whom,
    })
}


