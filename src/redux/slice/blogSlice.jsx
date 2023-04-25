import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name : "Blog",
    initialState : {
       showMorePost : false,
       editPost : false,
       infoOnlyPost : {},
       infoBlogEdit : {},
       ShowCreateBlog : false,
       listBlog : [],
       listVideo : [],
       temp : {},
    },
    reducers : {
        showMore : (state , action) => {
            state.showMorePost = true
        },
        unShowMore : (state , action) => {
            state.showMorePost = false
        },
        infoOnlyPost : (state , action) => {
            state.infoOnlyPost = action.payload
        },
        commentRealTime : (state , action) => {
            state.listComment = [...state.listComment, action.payload]
        },
        editPost : (state, action) => {
            state.editPost = true
            state.infoBlogEdit = action.payload
        },
        unEditPost : (state) => {
            state.editPost = false
            state.infoBlogEdit = {}
        },
        ShowCreateBlog : (state) => {
            state.ShowCreateBlog = true
        },
        UnShowCreateBlog : (state) => {
            state.ShowCreateBlog = false
        },
        listPost : (state , action) => {
            state.listBlog =  action.payload
        },
        listVideo : (state , action) => {
            state.listVideo = action.payload
        },
        createPost : (state , action) => {
            state.listBlog = [action.payload, ...state.listBlog]
            action.payload = {}
        },
        outFace : (state) => {
            state.showMorePost = false
            state.editPost = false
            state.infoOnlyPost = {}
            state.listComment = []
            state.infoBlogEdit = {}
            state.ShowCreateBlog = false
            state.listBlog = []
            state.listVideo = []
        },
        setTemp : (state , action) => {
            state.temp = action.payload
        },
       
    }
})