import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name : "Video",
    initialState : {
        searchVideo : "",
        listVideo : [],
        limit : 5,
        showMore : false,
        infoOnlyVideo : {}
    },

    reducers : {
        searchVideoResult : (state , action) => {
            state.searchVideo = action.payload
        },
        listVideoResult : (state , action) => {
            state.listVideo = action.payload
        },
        seeMoreVideo : (state , action) => {
            state.limit = state.limit + 5
        },
        showMoreVideos : (state , action) => {
            state.showMore = true
        },
        unShowMoreVideo : (state , action) => {
            state.showMore = false
        },
        InfoOnlyVideo : (state , action) => {
            state.infoOnlyVideo = action.payload
        }
    }
})