import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import {
    TfiComment
}from "react-icons/tfi"
import {
    TbShare3
} from "react-icons/tb"
import {
    AiOutlineLike,
    AiFillLike
} from "react-icons/ai"
import {
    TbDots,
} from "react-icons/tb"
import { format } from 'timeago.js'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import videoSlice from '../../../../../../../../redux/slice/videoSlice'

const cx = classNames.bind(styles)
const VIDEOHOMEPAGE = ({data}) => {

    const {token, userId} = sessionStorage
    const dispatch = useDispatch()
    const [checkLike , setCheckLike] = useState(true)
    const handleLike = () => {
        axios({
          method : "put",
          url : process.env.REACT_APP_BASE_URL + "/video/likevideo/" + data._id,
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        .then(res => {
        })
        .catch(err => {
          console.log(err);
        })
      }
    
      const handleDislike = () => {
        axios({
          method : "put",
          url : process.env.REACT_APP_BASE_URL + "/video/dislikevideo/" + data._id,
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        .then(res => {
        })
        .catch(err => {
          console.log(err);
        })
      }

      
    
  return (
    <div className={cx("wrapper")}>
        <header className={cx("header_video")}>
            <div className={cx("img_user_page")}>
                <img style={
                    {
                        width : 50,
                        height : 50,
                        borderRadius : "50%"
                    }
                } src={data?.userId?.avatar || ""} alt='' />
            </div>
            <div className={cx("full_name_page_user")}>
                <div>{data.userId.fullName || "user"}</div>
                <div>{format(data.createdAt) || "just now"}</div>
            </div>
            <div style={
                {
                    position : 'absolute',
                    right : 20
                }
            }><TbDots style={
                {
                    width : 22,
                    height : 22,
                    rotate : "90deg"
                }
            } /></div>
        </header>
        <div className={cx("title_video")}>
            <p style={
                {
                    marginLeft : 20,
                    marginRight : 20,
                    textAlign : "start"
                }
            }>{data?.title || ""}</p>
        </div>
        <div className={cx("video_true")}>
        <iframe  width="100%" height="100%"   src={  `https://www.youtube.com/embed/${data.video}` || "https://www.youtube.com/embed/m80hv6LCNy0"} title="YouTube video player" frameborder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
        <div className={cx("show_like")}>
            <div className={cx("like_share")}>
                {data?.userLikes?.includes(userId) ? 
                checkLike ?
                <button 
                onClick={() => {
                    handleDislike()
                    setCheckLike(false)
                }}
                className={cx("wrapper_icon")}>
                    <div><AiFillLike style={
                        {
                            color : "#0571ed"
                        }
                    } className={cx("icon_video")} /></div>
                    <p style={
                        {
                            marginTop : 15,
                            marginLeft : 5,
                            color : "#129ef8"
                        }
                    }>Thích</p>    
                </button>
                :
                <button 
                onClick={() => {
                    handleLike()
                    setCheckLike(true)
                }}
                className={cx("wrapper_icon")}>
                    <div><AiOutlineLike className={cx("icon_video")} /></div>
                    <p style={
                        {
                            marginTop : 15,
                            marginLeft : 5,
                            color : "#129ef8"
                        }
                    }>Thích</p>    
                </button>
                 : 
                 checkLike ? <button 
                 onClick={() => {
                    handleLike()
                    setCheckLike(false)
                 }}
                 className={cx("wrapper_icon")}>
                    <div><AiOutlineLike className={cx("icon_video")} /></div>
                    <p style={
                        {
                            marginTop : 15,
                            marginLeft : 5,
                            color : "#129ef8"
                        }
                    }>Thích</p>    
                </button>
                :
                <button 
                onClick={() => {
                    handleDislike()
                    setCheckLike(true)
                }}
                className={cx("wrapper_icon")}>
                    <div><AiFillLike style={
                        {
                            color : "#0571ed"
                        }
                    } className={cx("icon_video")} /></div>
                    <p style={
                        {
                            marginTop : 15,
                            marginLeft : 5,
                            color : "#129ef8"
                        }
                    }>Thích</p>    
                </button>
                 }
                <button 
                onClick={() => {
                    dispatch(videoSlice.actions.showMoreVideos())
                    dispatch(videoSlice.actions.InfoOnlyVideo(data))
                }}
                className={cx("wrapper_icon")}>
                    <div>
                        <TfiComment style={
                        {
                            width : 17,
                            height : 17,
                            marginTop : 5,
                        }
                    } className={cx("icon_video")} />
                    </div>
                <p style={
                    {
                        marginLeft : 6,
                        color : "#129ef8"
                    }
                }>Bình luận</p>
                </button>
                <button className={cx("wrapper_icon")}>
                    <div><TbShare3 style={
                        {
                            color : "gray"
                        }
                    } className={cx("icon_video")} /></div>
                    <p style={
                        {
                            marginLeft : 5,
                            color : "#129ef8"
                        }
                    }>Chia sẻ</p>
                </button>
            </div>
            <div className={cx("number_cmt_view_like")}>
                <div style={
                    {
                        display : "flex",
                        justifyContent : "center",
                        alignItems : "center",
                        textAlign  :"center",
                        marginRight : 10
                    }
                }>
                    <div style={
                        {
                            display : "flex",
                            justifyContent : "center",
                            alignItems : 'center',
                            textAlign : 'center'
                        }
                    }>
                        <div><img style={
                            {
                                width : 20,
                                height : 20,
                                marginTop : 3
                            }
                        } src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e" /></div>
                        <div><img style={
                            {
                                width : 20,
                                height : 20,
                                marginTop : 3
                            }
                        } src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='10.25%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FEEA70'/%3e%3cstop offset='100%25' stop-color='%23F69B30'/%3e%3c/linearGradient%3e%3clinearGradient id='d' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23472315'/%3e%3cstop offset='100%25' stop-color='%238B3A0E'/%3e%3c/linearGradient%3e%3clinearGradient id='e' x1='50%25' x2='50%25' y1='0%25' y2='81.902%25'%3e%3cstop offset='0%25' stop-color='%23FC607C'/%3e%3cstop offset='100%25' stop-color='%23D91F3A'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.921365489 0 0 0 0 0.460682745 0 0 0 0 0 0 0 0 0.35 0'/%3e%3c/filter%3e%3cpath id='b' d='M16 8A8 8 0 110 8a8 8 0 0116 0'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='url(%23d)' d='M3 8.008C3 10.023 4.006 14 8 14c3.993 0 5-3.977 5-5.992C13 7.849 11.39 7 8 7c-3.39 0-5 .849-5 1.008'/%3e%3cpath fill='url(%23e)' d='M4.541 12.5c.804.995 1.907 1.5 3.469 1.5 1.563 0 2.655-.505 3.459-1.5-.551-.588-1.599-1.5-3.459-1.5s-2.917.912-3.469 1.5'/%3e%3cpath fill='%232A3755' d='M6.213 4.144c.263.188.502.455.41.788-.071.254-.194.369-.422.371-.78.011-1.708.255-2.506.612-.065.029-.197.088-.332.085-.124-.003-.251-.058-.327-.237-.067-.157-.073-.388.276-.598.545-.33 1.257-.48 1.909-.604a7.077 7.077 0 00-1.315-.768c-.427-.194-.38-.457-.323-.6.127-.317.609-.196 1.078.026a9 9 0 011.552.925zm3.577 0a8.953 8.953 0 011.55-.925c.47-.222.95-.343 1.078-.026.057.143.104.406-.323.6a7.029 7.029 0 00-1.313.768c.65.123 1.363.274 1.907.604.349.21.342.44.276.598-.077.18-.203.234-.327.237-.135.003-.267-.056-.332-.085-.797-.357-1.725-.6-2.504-.612-.228-.002-.351-.117-.422-.37-.091-.333.147-.6.41-.788z'/%3e%3c/g%3e%3c/svg%3e" /></div>
                    </div>
                    <div>
                        <p style={
                            {
                                fontSize : ".8rem",
                                marginLeft : 5,
                                cursor : "pointer",
                                color : '#129ef8'
                            }
                        }>{data?.likes === 0 ? checkLike ? 0 + " lượt thích" : "bạn" : 
                        data?.userLikes?.includes(userId) ? 
                        checkLike ? data?.likes > 1 ? "bạn và " + (data?.likes - 1) + " người khác" : "bạn" :
                        data?.likes > 1 ? (data?.likes - 1) + " người khác" : 0 + " lượt thích" : 
                        checkLike ? (data?.likes) + "người khác" : "bạn và " + (data?.likes) + " người khác"
                        }</p>
                    </div>
                </div>
                <p style={
                    {
                        fontSize : ".8rem",
                        marginRight : 10,
                        cursor : "pointer",
                        color : "#129ef8"
                    }
                }>{data?.comment?.length || 0} bình luận . </p>
                <p style={
                    {
                        fontSize : ".8rem",
                        marginRight : 20,
                        color : "#129ef8"
                    }
                }> {data?.views || 0} lượt xem</p>
            </div>
        </div>
    </div>
  )
}

export default VIDEOHOMEPAGE