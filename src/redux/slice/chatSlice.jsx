import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name : "chat",
    initialState : {
        searchUser : "",
        infoRoom : {},
        listMessage : [

        ],
        checkAddRoom : false,
    },

    reducers : {
        searchUser : (state , action) => {
            state.searchUser = action.payload
        },
        infoRoom : (state , action) => {
            state.infoRoom =  {}
            state.infoRoom =  action.payload
        },
        listMessages : (state , action) => {
            state.listMessage = action.payload
        },
        chatRealTime : (state , action) => {
            state.listMessage = [...state.listMessage, action.payload]
        },
        checkAddRoom : (state , action) => {
            state.checkAddRoom = action.payload
        }
    }

})