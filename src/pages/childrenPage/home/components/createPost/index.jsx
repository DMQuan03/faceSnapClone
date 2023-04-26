import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import {
    BiArrowBack
} from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import blogSlice from '../../../../../redux/slice/blogSlice'
import { io } from 'socket.io-client'
const {token} = sessionStorage
const socket = io.connect(process.env.REACT_APP_SOCKET, {
    query : {
        token
    }
})

const cx = classNames.bind(styles)
const CREATEPOST = () => {

    const dispatch = useDispatch()
    const {avatar} = sessionStorage
    const [text , setText] = useState("")
    const [fileText , setFileText] = useState("")
    const temp = useSelector(state => state.blog.temp)

    // useEffect(() => {

    //     return () => {
    //         fileText && URL.revokeObjectURL(fileText.preview)
    //     }
    // }, [fileText])

    // const handlePreviewAvatar = (e) => {
    //     const file = e.target.files[0]
    //     file.preview = URL.createObjectURL(file)
    //     setFileText(file)
    // }

    const createBlog = () => {
        socket.emit("create_blog" , { title : text , img : fileText })
        dispatch(blogSlice.actions.UnShowCreateBlog())
        setFileText("")
        setText("")
       }

       useMemo(() => {
        socket.on("return_blog", (data) => {
                if (temp._id !== data._id) {
                    dispatch(blogSlice.actions.createPost(data))
                    dispatch(blogSlice.actions.setTemp(data))
                    return 1
                }else {
                    return 0
                }
        })
       }, [socket])
  return (
    <div className={cx("wrapper")}>
        <div className={cx("container")}>
            <div className={cx("title_create")}>
                <div><h2>Tạo bài viết</h2></div>
                <div 
                onClick={() => {
                    dispatch(blogSlice.actions.UnShowCreateBlog())
                  }}
                style={
                    {
                        position : "absolute",
                        right : 10,
                        height : "100%",
                        width : 60,
                        display : "flex",
                        justifyContent : 'center',
                        alignItems : "center"
                    }
                }>
                    <BiArrowBack style={
                        {
                            width : 30,
                            height : 30,
                            rotate : "90deg",
                            top : 2
                        }
                    } />
                </div>
            </div>
            <div className={cx("info_user")}>
                <div>
                    <img style={
                        {
                            width : 40,
                            height : 40,
                            borderRadius : '50%'
                        }
                    } src={avatar} alt='a' />
                </div>
                <div style={
                    {
                        marginLeft : 20
                    }
                }>
                    <p>duong minh quan 3005</p>
                </div>
            </div>
            <div className={cx("content_true")}>
                <textarea value={text} onChange={(e) => {
                    setText(e.target.value)
                }}
                style={
                    {
                        width : "99%",
                        height : 250,
                        maxWidth : 496,
                        minWidth : 496,
                        maxHeight : 100,
                        minHeight : 100,
                        border : "none",
                        outline : "none",
                        position : 'absolute',
                        top : 0,
                        left : 0,
                        right : 0,
                        backgroundColor : "white"
                    }
                }>

                </textarea>
            </div>
            {fileText && <div style={
                {
                    width : "100%",
                    height : "auto",
                    minHeight : 200,
                    
                }
            }>
            <img style={
                {
                    width : '100%',
                    height : '100%'
                }
            } src={fileText || ""} />

            </div>}
            <div style={
                {
                    width : "100%",
                    height : 30,
                    display : "flex",
                    justifyContent : "space-between",
                    alignItems : 'center',
                    textAlign : "center"
                }
            }>
                <input 
                value={fileText}
                style={
                    {
                        marginLeft : 20
                    }
                } type='text' onChange={(e) => {
                    setFileText(e.target.value)
                }}/>
                <button 
                onClick={() => {
                    setFileText("")
                }}
                style={
                    {
                        marginRight : 20
                    }
                }>clear img</button>
            </div>
            <div style={
                {
                    width : '100%',
                    height : 60,
                    backgroundColor : "red",
                    position : "relative",
                    display : 'flex',
                    justifyContent : 'flex-start',
                    alignItems : "center",
                    textAlign : "center"
                }
            }>

            </div>
            <div style={
                {
                    width : "100%",
                    height : 50,
                    backgroundColor : "#ffffff",
                    display : "flex",
                    justifyContent : "center",
                    textAlign : "center",
                    alignItems : "center",
                    borderBottomRightRadius : 10,
                    borderBottomLeftRadius : 10,
                }
            }>
                {text ? <button 
                onClick={createBlog}
                style={
                    {
                        width : "90%",
                        height : "70%",
                        outline :"none",
                        border : "none",
                        borderRadius : 10
                    }
                }>Đăng</button> : 
                <button 
                style={
                    {
                        width : "90%",
                        height : "70%",
                        outline :"none",
                        border : "none",
                        borderRadius : 10,
                        cursor : "no-drop",
                        backgroundColor : "gray",
                    }
                }>Đăng</button>
                }
            </div>
        </div>
    </div>
  )
}

export default memo(CREATEPOST)