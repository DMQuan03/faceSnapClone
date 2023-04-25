import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import {
    TfiComment
} from "react-icons/tfi"
import {
    GrFormView
} from "react-icons/gr"
import {
    AiOutlineLike
} from "react-icons/ai"
import {
    RiShareForwardLine
} from "react-icons/ri"
import {
    BsFillSendCheckFill
} from "react-icons/bs"
import {
    BiArrowBack
} from "react-icons/bi"
import LISTCOMMENTVIDEOWATCH from '../listCommentVideo'
import { useDispatch, useSelector } from 'react-redux'
import videoSlice from '../../../../../redux/slice/videoSlice'
import { format } from 'timeago.js'
import axios from 'axios'
import { io } from 'socket.io-client'
const cx = classNames.bind(styles)
const {token} = sessionStorage
const socket = io.connect("http://localhost:3456", {
    query : {
        token
    }
})

const SHOWMOREVIDEO = () => {
    const {avatar , token} = sessionStorage
    const dispatch = useDispatch()
    const myRef = useRef()
    const infoVideo = useSelector(state => state.video.infoOnlyVideo)


    const [listComments , setListComment] = useState([])
    const [textComment , setTextComment] = useState("")

    useEffect(() => {
        axios({
            method : "get",
            url : "http://localhost:3456/api/utils/getcomment/" + infoVideo._id,
            headers : {
               authorization :  `Bearer ${token}`
            } 
        })
        .then(res => {
            setListComment(res.data.data);
        })
        .catch(err => {
            console.log(err);
            return 0
        })
    }, [])

    const handleUserCommentVideo = () => {
        socket.emit("user_comment_video", { text : textComment, idVideo : infoVideo._id})
        myRef.current.focus()
        setTextComment("")
    }

    useEffect(() => {
        socket.on("sever_return_comment_video", (data) => {
            setListComment(prev => [data , ...prev])
        })
    }, [socket])

    useEffect(() => {
        socket.emit("join_room", {id : infoVideo._id})
        return () => {
            setListComment([])
            socket.emit("leave_room_video", {id : infoVideo._id})
        }
    }, [])
  return (
    <div className={cx("wrapper")}>
        <div className={cx("info_video_watch")}>
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${infoVideo.video}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
            <button 
            onClick={() => {
                dispatch(videoSlice.actions.unShowMoreVideo())
            }}
            style={
                {
                    zIndex : 1000000000000000000000,
                    position : 'absolute',
                    width : 40,
                    height : 40,
                    top : 60,
                    left : 12,
                    borderRadius : "50%",
                    border : "none",
                    outline : "none",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    textAlign : "center",
                    cursor : "pointer"
                }
            }><BiArrowBack style={
                {
                    width : 30,
                    height : 30,
                    rotate : "90deg"
                }
            } /></button>
        <div className={cx("list_cmt")}>
            <div className={cx("navbar_cmt")}></div>
            <div className={cx("wrapper_intro")}>
                <div className={cx("info_user_group")}>
                    <div style={
                        {
                            display : "flex",
                            justifyContent : "center",
                            textAlign : "center",
                            alignItems : "center"
                        }
                    }>
                        <img style={
                            {
                                width : 45,
                                height : 45,
                                borderRadius : "50%"
                            }
                        } src={avatar} alt='a' />
                    </div>
                    <div style={
                        {
                            width : 200,
                            height : '100%',
                            textAlign : 'start'
                        }
                    }>
                        <div style={
                            {
                                marginLeft : 10
                            }
                        }>{infoVideo && infoVideo?.userId?.fullName || "user"}</div>
                        <div style={
                            {
                                marginLeft : 10
                            }
                        }>{infoVideo && format(infoVideo.createdAt) || "just now"}</div>
                    </div>
                    <div></div>
                </div>
                <div className={cx("title_video_watch")}>
                    <span>{infoVideo && infoVideo?.title || ""}</span>
                </div>
                <div className={cx("like_watch_share_comment")}>
                    <div style={
                        {
                            display : "flex",
                            justifyContent : "center",
                            alignItems : "center",

                        }
                    }>
                        <img style={
                            {
                                width : 20,
                                height : 20,
                                marginTop : 3
                            }
                        } src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e" />
                        <img style={
                            {
                                width : 20,
                                height : 20,
                                marginTop : 3
                            }
                        } src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='10.25%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FEEA70'/%3e%3cstop offset='100%25' stop-color='%23F69B30'/%3e%3c/linearGradient%3e%3clinearGradient id='d' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23472315'/%3e%3cstop offset='100%25' stop-color='%238B3A0E'/%3e%3c/linearGradient%3e%3clinearGradient id='e' x1='50%25' x2='50%25' y1='0%25' y2='81.902%25'%3e%3cstop offset='0%25' stop-color='%23FC607C'/%3e%3cstop offset='100%25' stop-color='%23D91F3A'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.921365489 0 0 0 0 0.460682745 0 0 0 0 0 0 0 0 0.35 0'/%3e%3c/filter%3e%3cpath id='b' d='M16 8A8 8 0 110 8a8 8 0 0116 0'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='url(%23d)' d='M3 8.008C3 10.023 4.006 14 8 14c3.993 0 5-3.977 5-5.992C13 7.849 11.39 7 8 7c-3.39 0-5 .849-5 1.008'/%3e%3cpath fill='url(%23e)' d='M4.541 12.5c.804.995 1.907 1.5 3.469 1.5 1.563 0 2.655-.505 3.459-1.5-.551-.588-1.599-1.5-3.459-1.5s-2.917.912-3.469 1.5'/%3e%3cpath fill='%232A3755' d='M6.213 4.144c.263.188.502.455.41.788-.071.254-.194.369-.422.371-.78.011-1.708.255-2.506.612-.065.029-.197.088-.332.085-.124-.003-.251-.058-.327-.237-.067-.157-.073-.388.276-.598.545-.33 1.257-.48 1.909-.604a7.077 7.077 0 00-1.315-.768c-.427-.194-.38-.457-.323-.6.127-.317.609-.196 1.078.026a9 9 0 011.552.925zm3.577 0a8.953 8.953 0 011.55-.925c.47-.222.95-.343 1.078-.026.057.143.104.406-.323.6a7.029 7.029 0 00-1.313.768c.65.123 1.363.274 1.907.604.349.21.342.44.276.598-.077.18-.203.234-.327.237-.135.003-.267-.056-.332-.085-.797-.357-1.725-.6-2.504-.612-.228-.002-.351-.117-.422-.37-.091-.333.147-.6.41-.788z'/%3e%3c/g%3e%3c/svg%3e" />
                        <div>
                            <p style={
                                {
                                    marginLeft : 10
                                }
                            }>{infoVideo && infoVideo?.likes}</p>
                        </div>
                    </div>
                    <div style={
                        {
                            display : "flex",
                            justifyContent : "center",
                            alignItems : "center",
                            textAlign : "center",
                        }
                    }>
                        <div style={
                            {
                                display : 'flex',
                                justifyContent : "center",
                                alignItems : "center",
                                textAlign : "center"
                            }
                        }>
                            <p style={
                                {
                                    marginRight : 5
                                }
                            }>{infoVideo && infoVideo?.comment?.length || 0}</p>
                            <TfiComment style={
                                {
                                    width : 15,
                                    height : 15,
                                    rotate : "90deg",
                                    top : 3
                                }
                            } />
                        </div>
                        <div>
                            <div style={
                                {
                                    display : "flex",
                                    justifyContent : "center",
                                    alignItems : "center",
                                    textAlign : "center",
                                    marginLeft : 15
                                }
                            }>
                                <p>{infoVideo && infoVideo?.views}</p>
                                <GrFormView style={
                                    {
                                        width : 25,
                                        height : 25,
                                        rotate : "90deg",
                                        top :2
                                    }
                                } />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("btn_like_watch")}>
                    <button className={cx("btn_like_video_watch")}>
                        <AiOutlineLike style={
                                {
                                    width : 22,
                                    height : 22,
                                    rotate : "90deg",
                                }
                            }  />
                    </button>
                    <button className={cx("btn_like_video_watch")}>
                    <TfiComment style={
                                {
                                    width : 18,
                                    height : 18,
                                    rotate : "90deg",
                                    top : 2
                                }
                            } />
                    </button>
                    <button className={cx("btn_like_video_watch")}>
                        <RiShareForwardLine style={
                                {
                                    width : 22,
                                    height : 22,
                                    rotate : "90deg",
                                }
                            }  />
                    </button>
                </div>
                <div className={cx("off_cmt")}>
                    <div>
                        <h4 style={
                            {
                                fontWeight : 400
                            }
                        }>Bình luận</h4>
                    </div>
                        <p>Ẩn</p>
                </div>
            </div>
            <div className={cx("show_cmt_more_video")}>
                {listComments && listComments.map(el => {
                    return <LISTCOMMENTVIDEOWATCH data={el} key={el._id} />
                })}
            </div>
            <div className={cx("input_cmt")}>
                <div style={
                    {
                        marginLeft : 10,
                        display : "flex",
                        justifyContent : "center",
                        alignItems :"center"
                    }
                }>
                    <img style={
                        {
                            width : 40,
                            height : 40,
                            borderRadius : "50%"
                        }
                    } src={avatar} alt='a' />
                </div>
                <div style={
                    {
                        display : "flex",
                        justifyContent : "center",
                        alignItems : "center",
                        textAlign : "center",
                        height : "100%",
                        width : "80%",
                        position : "relative",
                        marginLeft : 10
                    }
                }>
                    <input ref={myRef} value={textComment} onChange={(e) => {
                        setTextComment(e.target.value)
                    }} placeholder='Viết bình luận' style={
                        {
                            width : "100%",
                            height : 30,
                            outline : 'none',
                            border : 'none',
                            backgroundColor : "#e8eaed",
                            borderRadius : 10,
                            color : "red"
                        }
                    } />
                    <button 
                    onClick={handleUserCommentVideo}
                    style={
                        {
                            position : "absolute",
                            right : 0,
                            border : "none",
                            outline : "none",
                            height : 30,
                            borderTopRightRadius : 10,
                            borderBottomRightRadius : 10,
                            display : "flex",
                            justifyContent : "center",
                            alignItems :"center",
                            width : 40
                        }
                    }><BsFillSendCheckFill style={
                        {
                            width :20,
                            height : 20,
                            rotate : "90deg"
                        }
                    } /></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SHOWMOREVIDEO