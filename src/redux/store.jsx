import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slice/chatSlice";
import blogSlice from "./slice/blogSlice";
import searchUser from "./slice/searchUser";
import videoSlice from "./slice/videoSlice";
import friends from "./slice/friends";

export default configureStore({
    reducer : {
        chat : chatSlice.reducer,
        blog : blogSlice.reducer,
        searchUser : searchUser.reducer,
        video : videoSlice.reducer,
        friends : friends.reducer
    }
})