import React, { Fragment, memo,  useMemo, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import {
    BiArrowBack,
    BiDotsHorizontalRounded
} from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import blogSlice from '../../../../../redux/slice/blogSlice'
import axios from 'axios'

const cx = classNames.bind(styles)
const CREATEPOST = () => {

    const dispatch = useDispatch()
    const {avatar , userId, username, token} = sessionStorage
    const temp = useSelector(state => state.blog.temp)
    

    // custom state
    const [text , setText] = useState("")
    const [fileText , setFileText] = useState("")
    const [fileVideotext , setVideoText] = useState("")
    const [checkShowImg , setCheckShowImg] = useState(false)
    const [createVideo , setCreateVideo] = useState(false)
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
        axios({
            method : "post",
            url : process.env.REACT_APP_BASE_URL + "/blog/create",
            data : {
                title : text,
                img : fileText,
            },
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res.data);
            dispatch(blogSlice.actions.createPost(res.data.newVideoAndPost))
            dispatch(blogSlice.actions.UnShowCreateBlog())
            return 1
        })
        .then(err => {
            console.log(err);
        })
       }

    const handleCreateVideo =() => {
        axios({
            method : "post",
            url : process.env.REACT_APP_BASE_URL + "/video/create",
            data : {
                title : text,
                video : fileVideotext,
            },
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res.data);
            dispatch(blogSlice.actions.createPost(res.data.newVideoAndPost))
            dispatch(blogSlice.actions.UnShowCreateBlog())
            return 1
        })
        .then(err => {
            console.log(err);
        })
    }

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
                            borderRadius : '50%',
                            marginLeft : 20,
                            
                        }
                    } src={avatar} alt='a' />
                </div>
                <div style={
                    {
                        marginLeft : 20
                    }
                }>
                    <p>{username}</p>
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
            {fileText && !fileVideotext && 
            <div style={
                {
                    width : "100%",
                    height : "auto",
                    minHeight : 400,
                    maxHeight : 400,
                    position : "relative"
                }
            }>
            <img style={
                {
                    width : '100%',
                    height : '100%',
                    position : "absolute",
                    top : 0,
                    bottom : 0,
                    left : 0,
                    right : 0
                }
            } src={fileText || ""} />
            

            </div>}


            {fileVideotext && !fileText && 
            <div style={
                {
                    width : "100%",
                    height : "auto",
                    minHeight : 400,
                    maxHeight : 400,
                    position : "relative"
                }
            }>
               <iframe width="100%" height="395" src={`https://www.youtube.com/embed/${fileVideotext}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
            </div>}


            {checkShowImg
            ? 
            createVideo ? <div style={
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
                value={fileVideotext}
                style={
                    {
                        marginLeft : 30
                    }
                } type='text' onChange={(e) => {
                    setVideoText(e.target.value)
                }}/>
                <button 
                onClick={() => {
                    setCreateVideo(false)
                    setVideoText("")
                }}
                style={
                    {
                        marginLeft : 90
                    }
                }>Đăng ảnh</button>
                <button 
                onClick={() => {
                    setVideoText("")
                }}
                style={
                    {
                        marginRight : 30
                    }
                }>clear video</button>
            </div>
            :
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
                        marginLeft : 30
                    }
                } type='text' onChange={(e) => {
                    setFileText(e.target.value)
                }}/>
                <button 
                onClick={() => {
                    setCreateVideo(true)
                    setFileText("")
                }}
                style={
                    {
                        marginLeft : 90
                    }
                }>Đăng video</button>
                <button 
                onClick={() => {
                    setFileText("")
                }}
                style={
                    {
                        marginRight : 30
                    }
                }>clear img</button>
            </div>
            :
            <Fragment />
            }
            <div style={
                {
                    width : '100%',
                    height : 60,
                    position : "relative",
                    display : 'flex',
                    justifyContent : 'center',
                    alignItems : "center",
                    textAlign : "center"
                }
            }>
                <div style={
                    {
                        width : "90%",
                        height : "90%",
                        borderRadius : 10,
                        display : "flex",
                        justifyContent : "flex-end",
                        alignItems : "center",
                        textAlign : 'center',
                        backgroundColor : "#fff",
                        border : "1px solid #d1c9c9"
                    }
                }>
                        <div style={
                            {
                                width : 250,
                                display : "flex",
                                justifyContent : "flex-start"
                            }
                        }><p style={
                            {
                                marginLeft : 10,
                                cursor : "pointer"
                            }
                        }>Thêm vào bài viết của bạn</p></div>
                        <div style={
                            {
                                marginRight : 5,
                                width : 30
                            }
                        }>
                            <img 
                            onClick={() => {
                                setCheckShowImg(!checkShowImg)
                            }}
                            src='https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png' style={
                                {
                                    width : 25,
                                    height : 25
                                }
                            } />
                        </div>
                        <div style={
                            {
                                marginRight : 5,
                                width : 30
                            }
                        }>
                            <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/b37mHA1PjfK.png' style={
                                {
                                    width : 25,
                                    height : 25
                                }
                            } />
                        </div>
                        <div style={
                            {
                                marginRight : 5,
                                width : 30
                            }
                        }>
                            <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png' style={
                                {
                                    width : 25,
                                    height : 25
                                }
                            } />
                        </div>
                        <div style={
                            {
                                marginRight : 5,
                                width : 30
                            }
                        }>
                            <img src='https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/8zlaieBcZ72.png' style={
                                {
                                    width : 25,
                                    height : 25
                                }
                            } />
                        </div>
                        <div style={
                            {
                                marginRight : 5,
                                width : 30
                            }
                        }>
                            <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/q7MiRkL7MLC.png' style={
                                {
                                    width : 25,
                                    height : 25
                                }
                            } />
                        </div>
                            <div>
                                <BiDotsHorizontalRounded style={
                                    {
                                        width : 25,
                                        height : 25,
                                        rotate : "90deg",
                                        marginRight : 10
                                    }
                                } />
                            </div>
                </div>
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
                {text ? 
                createVideo ?
                <button 
                onClick={handleCreateVideo}
                style={
                    {
                        width : "90%",
                        height : "70%",
                        outline :"none",
                        border : "none",
                        borderRadius : 10
                    }
                }>Đăng</button>
                :
                <button 
                onClick={createBlog}
                style={
                    {
                        width : "90%",
                        height : "70%",
                        outline :"none",
                        border : "none",
                        borderRadius : 10
                    }
                }>Đăng</button>
                : 
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