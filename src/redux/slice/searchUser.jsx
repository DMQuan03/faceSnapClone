import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name : "searchUser",
    initialState : {
        limits : 5,
        limitBlog : 5,
        limitVideo : 5,
        listUser : [],
        listBlog : [],
        listVideo : [],
        navPost : true,
        navPeople : true,
        navVideo : false
    },
    reducers : {
        resultListUser : (state , action) => {
            state.listUser = action.payload
        },
        resultListBlog : (state , action) => {
            state.listBlog = action.payload
        },
        resultListVideo : (state , action) => {
            state.listVideo = action.payload
        },
        searchAll : (state , action) => {
            state.navPost = true
            state.navPeople = true
            state.navVideo = false
        },
        searchPost : (state , action) => {
            state.navPost = true
            state.navPeople = false
            state.navVideo = false
        },
        searchPeoPle : (state , action) => {
            state.navPost = false
            state.navPeople = true
            state.navVideo = false
        },
        searchVideo : (state , action) => {
            state.navPost = false
            state.navPeople = false
            state.navVideo = true
        },
        plusLimits : (state) => {
            state.limits = state.limits + 5
        },
        plusLimitBlog : (state , action) => {
            state.limitBlog = state.limitBlog + 5
        },
        plusLimitVideo : (state , action) => {
            state.limitVideo = state.limitVideo + 5
        },
    }
})