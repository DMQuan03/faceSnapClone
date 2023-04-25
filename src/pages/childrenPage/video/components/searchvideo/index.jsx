import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import {
    AiOutlineSearch
} from "react-icons/ai"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import videoSlice from '../../../../../redux/slice/videoSlice'
const cx = classNames.bind(styles)
const SEARCHVIDEO = () => {

    const {token} = sessionStorage
    const dispatch = useDispatch()

    const [textSearch , setTextSearch] = useState("")
    const [searchTextTrue , setSearchTextTrue] = useState("")

    const limit = useSelector(state => state.video.limit)

    const handleSearchtextTrues = () => {
        setSearchTextTrue(textSearch)
    }

    useEffect(() => {
        axios({
            method : "get",
            url : 'http://localhost:3456/api/video/searchvideo?q=' + searchTextTrue + "&limit=" + limit,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            dispatch(videoSlice.actions.listVideoResult(res.data.data))
        })
        .catch(err => {
            console.log(err);
            return 0
        })
    }, [searchTextTrue, limit])
  return (
    <div className={cx("wrapper")}>
        <input value={textSearch} className={cx("input_search_video")} onChange={(e) => {
            setTextSearch(e.target.value)
        }} />
        <button 
        onClick={handleSearchtextTrues}
        style={
            {
                position : "absolute",
                left : 10,
                border : "none",
                outline : 'none',
                backgroundColor : "#f0f2f5",
                borderTopLeftRadius : 20,
                borderBottomLeftRadius : 20
            }
        }><AiOutlineSearch style={{
            width : 30,
            height : 30,
            rotate : "90deg",
        }} /></button>
    </div>
  )
}

export default SEARCHVIDEO