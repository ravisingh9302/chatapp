import { createSlice } from '@reduxjs/toolkit'

const initialstate = {
    currentUser: localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)? JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)):null,
    loading: false,
    allContacts:null
    
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialstate,
    reducers: {
        setCurrentuser: (state, value) => {
            state.currentUser = value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setAllcontacts:(state,value)=>{
            state.allContacts=value.payload
        }
        
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentuser,setLoading,setAllcontacts } = authSlice.actions

export default authSlice.reducer