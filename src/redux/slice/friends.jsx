import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name : "friends",
    initialState : {
        homePage : true,
        allFriends : false
    },
    reducers : {
        showHomePage : (state) => {
            state.homePage = true
            state.allFriends = false
        },
        ShowAllfriends : (state) => {
            state.homePage = false
            state.allFriends = true
        }
    }
})