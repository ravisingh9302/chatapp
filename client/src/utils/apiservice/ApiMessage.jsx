import { apiConnect } from "../ApiConnect";
import { chatEndpoint} from "../ApiEndpoint";
import { toast } from "react-toastify";
import { setChatid,setMessages } from "../../reduxstate/ChatSlice";
const { GETMSG_API,SAVEMSG_API,LAST_ACTIVE_API,UPDATEMSGONCHAT_API,DELETEMSG_API,UPDATEMSGONLOGIN_API} = chatEndpoint

// SAVE  MESSAGE API
export const saveMsgapi = async (items) => {
    console.log(" save msg api called",items)

    let lod =process.env.REACT_APP_NODE_STATE==="development"? toast.loading("loading..."):"";

    try {
        const response = await apiConnect('POST', SAVEMSG_API, items)
        console.log(response?.data)
      if(process.env.REACT_APP_NODE_STATE ==="development"){
          toast.success(`${response.data?.msg}`)
      }
    } catch (error) {
        console.log("SAVE MSG ERROR", error.response.data);
        if(process.env.REACT_APP_NODE_STATE ==="development"){
            toast.error(`${error.response?.data?.msg}`);
        }
    }
    toast.dismiss(lod)

}
// UPDATE MESSAGE  ON LOGIN API API
export const updateMsgOnloginapi = async (reciever) => {
    let lod =process.env.REACT_APP_NODE_STATE==="development"?  toast.loading("loading..."):" ";
    try {
        const response = await apiConnect('POST', UPDATEMSGONLOGIN_API, {reciever})
        console.log("UPDATE MSG ON LOGIN RESPONSE",response?.data)
        if(process.env.REACT_APP_NODE_STATE ==="development"){
            toast.success(`${response.data?.msg}`)
        }
    } catch (error) {
        console.log("UPDATE MSG ON LOGIN ERROR", error.response?.data);
        if(process.env.REACT_APP_NODE_STATE ==="development"){
            
            toast.error(`${error.response.data?.msg}`);
        }
    }
    toast.dismiss(lod)

}
export const updateMsgOnchatapi = async (chatid,reciever,all,setUserchatseen) => {
    console.log("UPDATE MSG ON CHAT API ",chatid,reciever,all)
    let lod =process.env.REACT_APP_NODE_STATE==="development"?  toast.loading("loading..."):"";
    try {
        const response = await apiConnect('POST', UPDATEMSGONCHAT_API, { chatid,reciever,all})
        console.log("UPDATE MSG ONCHAT RESPONSE",response?.data)
        setUserchatseen(response?.data?.result)
        if(process.env.REACT_APP_NODE_STATE ==="development"){
            toast.success(`${response.data?.msg}`)
        }
    } catch (error) {
        console.log("UPDATEMSG ON CHAT ERROR", error?.response?.data);
        if(process.env.REACT_APP_NODE_STATE ==="development"){
            
            toast.error(`${error?.response.data?.msg}`);
        }
    }
    toast.dismiss(lod)

}

// DELETE MESSAGE API
export const deleteMsgapi = async (from,to,msg) => {
    let lod = toast.loading("loading...")
    try {
        const response = await apiConnect('POST', DELETEMSG_API, { from,to,message:msg})
        console.log(response?.data)
        toast.success(`${response.data?.msg}`)
    } catch (error) {
        console.log("SEND MSG ERROR", error.response?.data);
        toast.error(`${error.response.data?.msg}`);
    }
    toast.dismiss(lod)

}
// GET MESSAGE API
export const getMsgapi = async (requester,whom,chatId,dispatch) => {
    console.log("get message api ",requester,whom,chatId)
    let lod =process.env.REACT_APP_NODE_STATE==="development"?  toast.loading("loading..."):" ";
    try {
        const response = await apiConnect('POST', GETMSG_API, { requester,whom,chatId })
        console.log("GET MSG RESPONSE ",response?.data)
        dispatch(setMessages(response?.data?.result[0]))
        dispatch(setChatid(response?.data?.result[1]))
        if(process.env.REACT_APP_NODE_STATE ==="development"){
            toast.success(`${response.data?.msg}`)
            
        }
    } catch (error) {

        console.log("RECEIVE MSG ERROR", error.response.data);
        if(process.env.REACT_APP_NODE_STATE ==="development"){
            
            toast.error(`${error.response.data?.msg}`);
        }
    }
    toast.dismiss(lod)

}

// GET LAST SEEN API
export const getLastseenapi = async (userEmail,setLastseen) => {
    console.log("get last seen")
    try {
        const response = await apiConnect('POST', LAST_ACTIVE_API, {userEmail})
        setLastseen(response?.data?.result.lastActive)
    } catch (error) {
        console.log("GET LAST SEEN ERROR", error.response?.data);
    }

}
