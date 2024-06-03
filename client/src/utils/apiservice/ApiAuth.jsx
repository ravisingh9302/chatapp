import { apiConnect } from "../ApiConnect";
import { authEndpoint } from "../ApiEndpoint";
import { toast } from "react-toastify";
import { setCurrentuser ,setAllcontacts} from "../../reduxstate/AuthSlice";


const { LOGIN_API, LOGOUT_API, RESISTER_API, ALLUSER_API, SET_AVATAR } = authEndpoint


export const loginApi = async (username, password, navigate,dispatch) => {
    console.log("login api called",username,password)
    let lod = toast.loading("loading...")
    try {
        const response = await apiConnect('POST', LOGIN_API, { username, password })
        // console.log(response?.data)
        toast.success(`${response?.data?.msg}`)
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(response?.data?.result));
        dispatch(setCurrentuser(response.data?.result))
        navigate('/')
    } catch (error) {

        console.log("LOGIN ERROR", error?.response.data);
        toast.error(`${error?.response.data.msg}`);
    }
    toast.dismiss(lod)

}

export const registerApi = async (email, username, password, navigate) => {
    console.log("resisterApi called ")
    let lod = toast.loading("loading...")
    try {
        const response = await apiConnect('POST', RESISTER_API, { email, username, password })
        console.log(response?.data)
        toast.success(`${response.data?.msg}`)
        navigate('/login')
    } catch (error) {
        console.log("LOGIN ERROR", error.response?.data);
        toast.error(`${error.response?.data.msg}`);
    }
    toast.dismiss(lod)
}

export const getAlluserapi = async (Id,dispatch) => {
    // console.log("getalluserApi called ", Id)
    let lod =process.env.REACT_APP_NODE_STATE==="development"?  toast.loading("loading..."):" ";
    try {
        const response = await apiConnect('GET', ALLUSER_API+Id)
        // console.log(response?.data)
        if(process.env.REACT_APP_NODE_STATE ==="development"){
            
            toast.success(`${response?.data.msg}`)
        }
        dispatch(setAllcontacts(response?.data?.result))
    } catch (error) {
        console.log("GET ALL USER ERROR", error.response?.data);
        if(process.env.REACT_APP_NODE_STATE ==="development"){
            
            toast.error(`${error?.response?.data.msg}`);
        }
    }
    toast.dismiss(lod)
}

