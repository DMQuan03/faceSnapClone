import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    AiFillLike, 
    AiFillHeart, 
    AiOutlineEllipsis,
    AiOutlineLike,
    AiOutlineEdit,
    AiFillDelete
} from "react-icons/ai"
import {
    TfiComment,
}from "react-icons/tfi"
import {
    TbShare3,
    TbDots
} from "react-icons/tb"
import {
    IoIosShareAlt
}from "react-icons/io"
import { format } from 'timeago.js'
import blogSlice from '../../../../../redux/slice/blogSlice'
import Tippy from '@tippyjs/react/headless'
import POPPER from '../../../../../components/Popper'
import { io } from 'socket.io-client'
import videoSlice from '../../../../../redux/slice/videoSlice'

const socket = io.connect(process.env.REACT_APP_SOCKET)
const cx = classNames.bind(styles)
export const BLOGANDVIDEO = ({data}) => {

    // state thu vien
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {token, userId } = sessionStorage
    
    // custom state
    const [CheckLikes , setCheckLikes] = useState(false)
    const [checkShare , setCheckShare] = useState(false)
    const [checkDelete , setCheckDelete] = useState(false)
    const [share , setShare] = useState([])



    // video
    const [checkLike , setCheckLike] = useState(true)
    const handleLikeVideo = () => {
        axios({
          method : "put",
          url : process.env.REACT_APP_BASE_URL + "/video/likevideo/" + data?.idCateGory,
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
    
      const handleDislikeVideo = () => {
        axios({
          method : "put",
          url : process.env.REACT_APP_BASE_URL + "/video/dislikevideo/" + data.idCateGory,
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





    // blog


    const MENU_ITEM = [
        {
            icon : <AiOutlineEdit className={cx("icon_menu")} />,
            title : "Edit POST",
            id : 1,
            onClick : () => {
                dispatch(blogSlice.actions.editPost(data))
            }
        },
        {
            icon : <AiFillDelete className={cx("icon_menu")} />,
            title : "delete post",
            id : 1,
            onClick : () => {
                axios({
                    method : "delete",
                    url : process.env.REACT_APP_BASE_URL + "/blog/deleteblog/" +  data.idCateGory,
                    headers : {
                      authorization : `Bearer ${token}`
                    }
                  })
                  .then(res => {
                    setCheckDelete(true)
                    console.log("success")
                    return 1
                  })
                  .catch(err => {
                    console.log(err.message);
                  })
            }
        }
    ]

    const handleLike = () => {
        axios({
          method : "put",
          url : process.env.REACT_APP_BASE_URL + "/blog/like/" +  data?.idCateGory,
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        .then(res => {
          setCheckLikes(!CheckLikes)
        })
        .catch(err => {
          console.log(err);
        })
      }
    
      const handleDislike = () => {
        axios({
          method : "put",
          url : process.env.REACT_APP_BASE_URL + "/blog/dislike/" + data?.idCateGory,
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        .then(res => {
          setCheckLikes(!CheckLikes)
        })
        .catch(err => {
          console.log(err);
        })
      }

      const handleShare = () => {
        axios({
          method : "put",
          url : process.env.REACT_APP_BASE_URL + "/blog/share/" +  data._id,
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        .then(res => {
          setShare(share + 1)
          setCheckShare(!checkShare)
        })
        .catch(err => {
          console.log(err);
        })
      }
    
      const handleUnshare = () => {
        axios({
          method : "put",
          url : process.env.REACT_APP_BASE_URL + "/blog/unshare/" + data._id,
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        .then(res => {
          setShare(share - 1)
          setCheckShare(!checkShare)
        })
        .catch(err => {
          console.log(err);
        })
      }

      useEffect(() => {
        setShare(data?.shares)
      }, [data])

  return (
    <>
        {data?.category === "blog" ?

        // blog
        checkDelete ?
        <Fragment/>
        :
        <div className={cx('wrapper')}>
            
            <div className={cx("info_user")}>
                <div className={cx('user_info')}>
                    <div className={cx("avatar_user")}>
                        <img 
                        onClick={() => {
                            navigate("/profile/" + data?.userId?._id)
                        }}
                        className={cx('img_true')} src={data?.userId?.avatar || 'https://s.yimg.com/fz/api/res/1.2/of4O3I3Im0hNqpzcNoC_Xw--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0xOTI7cHhvZmY9MDtweW9mZj0wO3E9ODA7dz0xOTI-/https://s.yimg.com/zb/imgv1/29a03124-da69-34b2-9bcb-cafb923ea6a8/s_140x140'} />
                    </div>
                    <div className={cx("name_user")}>
                        <div style={
                            {
                                display : "flex",
                                justifyContent : "flex-start",
                                alignItems : "center",
                                textAlign : "center"
                            }
                        }>{data?.userId?.fullName || "User"}</div>
                        <div style={
                            {
                                display : "flex",
                                justifyContent : "flex-start",
                                alignItems : "center",
                                textAlign : "center"
                            }
                        }>{format(data.createdAt) || "just now"}</div>
                    </div>
                </div>
                {data?.userId?._id === userId && <Tippy
                interactive
                placement='bottom-start'
                render={attrs => (
                        <div className={cx("edit_POST")} placeholder='bottom' tabIndex="-1" {...attrs}>
                            <POPPER>
                                {
                                    MENU_ITEM.map((el) => (
                                        <div className={cx("edit_post")}>
                                            <div className={cx("edit_item")}>{el.icon}</div>
                                            <div onClick={el.onClick} >{el.title}</div>
                                        </div>
                                    ))
                                }
                            </POPPER>
                        </div>
                )}
                >
                    <div className={cx("setting_blog")}>
                        <AiOutlineEllipsis 
                        onClick={() => {
                            
                        }}
                        style={
                            {
                                width : 30,
                                height : 30,
                                rotate : "90deg",
                                marginLeft : 130
                            }
                        } />
                    </div>
                </Tippy>}
            </div>
            <main className={cx("title_post")}>
                <p style={{
                    fontWeight : 400,
                    marginLeft : 20,
                    marginRight : 20
                }}>{data?.title || ""}</p>
            </main>
            {data?.img && <div  className={cx("img_post")}>
                    <img  style={
                        {
                            width : "100%",
                            height : "100%",
                            maxHeight : 700,
                            cursor : "pointer"
                        }
                    }  src={data?.img || 'https://s.yimg.com/fz/api/res/1.2/of4O3I3Im0hNqpzcNoC_Xw--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0xOTI7cHhvZmY9MDtweW9mZj0wO3E9ODA7dz0xOTI-/https://s.yimg.com/zb/imgv1/29a03124-da69-34b2-9bcb-cafb923ea6a8/s_140x140'}
                    onClick={() => {
                        socket.emit("join_room", {id : data._id})
                        socket.emit("getCMT", {idBlog : data._id})
                        dispatch(blogSlice.actions.showMore())
                        dispatch(blogSlice.actions.infoOnlyPost(data))
                    }}
                     />
            </div>}
            <div className={cx("show_cmt_like")}>
                    <div className={cx("like_tym")}>
                        <button className={cx("btn_like")}>
                            <div style={{ display : "flex", justifyContent : "center",
                            alignItems : "center",
                            textAlign : "center"
                            }}><AiFillLike style={{ width : 15, height : 15 , rotate : "90deg", color : "white", marginRight : 1, }} /></div>
                        </button>
                        <button className={cx("btn_tym")}>
                            <div style={{ display : "flex", justifyContent : "center",
                            alignItems : "center",
                            textAlign : "center"
                            }}><AiFillHeart style={{ width : 15, height : 15 , rotate : "90deg", marginRight : 1, color : "white" }} /></div>
                        </button>
                        <div style={
                            {
                                marginLeft : 10
                            }
                        }>{ 
                            data?.userLikes?.includes(userId) ? CheckLikes ? 
                            (data.likes - 1 || 0) +  " nguoi khac" : "ban va " + (data.likes - 1|| 0) +  " nguoi khac"
                            :
                            CheckLikes ? "ban va " + (data.likes || 0) +  " nguoi khac" : (data.likes || 0) +  " nguoi khac"
                            
                        }</div>
                    </div>
                    <div style={
                        {
                            display : "flex"
                        }
                    }>
                        <p style={
                            {
                                marginRight : 20
                            }
                        }>{data?.comment?.length || 0} comment</p>
                        <p>{share || 0} share</p>
                    </div>
            </div>
            <div className={cx("btn_like_cmt_share")}>
                <div className={cx('btn_true')}>
                    {data?.userLikes?.includes(userId) ? 
                    CheckLikes ? 
                    <button 
                    onClick={() => {
                        handleLike()
                    }}
                    className={cx("btn_hover")} style={
                        {
                            width : 211,
                            border : 'none',
                            textAlign : "center",
                            alignItems : "center",
                            display : "flex",
                            justifyContent : "center",
                            height : "90%",
                            borderRadius : 10,
                        }
                    }>
                    <p><AiOutlineLike style={
                        {
                            width : 20,
                            height : 20,
                            rotate : "90deg",
                            marginRight : 10,
                            marginTop : 0,
                            cursor : "pointer"
                        }
                    } /></p>
                    <p style={
                        {
                            fontSize : "1rem"
                        }
                    }>like</p></button>
                    :
                    <button 
                    onClick={() => {
                        handleDislike()
                    }}
                    className={cx("btn_hover")} style={
                        {
                            width : 211,
                            border : 'none',
                            textAlign : "center",
                            alignItems : "center",
                            display : "flex",
                            justifyContent : "center",
                            height : "90%",
                            borderRadius : 10,
                            color : "blue",
                            
                        }
                    }>
                    <p><AiFillLike style={
                        {
                            width : 20,
                            height : 20,
                            rotate : "90deg",
                            marginRight : 10,
                            marginTop : 0,
                            color : "blue",
                            cursor : "pointer"
                        }
                    } /></p>
                    <p style={
                        {
                            fontSize : "1rem"
                        }
                    }>like</p></button>
                    :
                    CheckLikes ? 
                    <button 
                    onClick={() => {
                        handleDislike()
                    }}
                    className={cx("btn_hover")} style={
                        {
                            width : 211,
                            border : 'none',
                            textAlign : "center",
                            alignItems : "center",
                            display : "flex",
                            justifyContent : "center",
                            height : "90%",
                            borderRadius : 10,
                        }
                    }>
                    <p><AiFillLike style={
                        {
                            width : 20,
                            height : 20,
                            rotate : "90deg",
                            marginRight : 10,
                            marginTop : 0,
                            color : "blue",
                            cursor : 'pointer'
                        }
                    } /></p>
                    <p style={
                        {
                            fontSize : "1rem"
                        }
                    }>like</p></button>
                    :
                    <button 
                    onClick={() => {
                        handleLike()
                    }}
                    className={cx("btn_hover")} style={
                        {
                            width : 211,
                            border : 'none',
                            textAlign : "center",
                            alignItems : "center",
                            display : "flex",
                            justifyContent : "center",
                            height : "90%",
                            borderRadius : 10,
                        }
                    }>
                    <p><AiOutlineLike style={
                        {
                            width : 20,
                            height : 20,
                            rotate : "90deg",
                            marginRight : 10,
                            marginTop : 0,
                            cursor : 'pointer'
                        }
                    } /></p>
                    <p style={
                        {
                            fontSize : "1rem"
                        }
                    }>like</p></button>
                    }
                    <button 
                    onClick={() => {
                        socket.emit("join_room", {id : data._id})
                        socket.emit("getCMT", {idBlog : data._id})
                        dispatch(blogSlice.actions.showMore())
                        dispatch(blogSlice.actions.infoOnlyPost(data))
                    }}
                    className={cx("btn_hover")} style={
                        {
                            width : 211,
                            border : 'none',
                            textAlign : "center",
                            alignItems : "center",
                            display : "flex",
                            justifyContent : "center",
                            height : "90%",
                            borderRadius : 10,
                        }
                    }>
                    <p><TfiComment style={
                        {
                            width : 15,
                            height : 15,
                            rotate : "90deg",
                            marginRight : 10,
                            marginTop : 8,
                            cursor : "pointer"
                        }
                    } /></p>
                    <p style={
                        {
                            fontSize : "1rem"
                        }
                    }>binh luan</p></button>

                    {/* shares */}
                    {data?.userShares?.includes(userId) ?  
                    checkShare ?
                    <button 
                    onClick={handleShare}
                    className={cx("btn_hover")} style={
                        {
                            width : 211,
                            border : 'none',
                            textAlign : "center",
                            alignItems : "center",
                            display : "flex",
                            justifyContent : "center",
                            height : "90%",
                            borderRadius : 10,
                        }
                    }>
                    <p><TbShare3 style={
                        {
                            width : 20,
                            height : 20,
                            rotate : "90deg",
                            marginRight : 10,
                            marginTop : 6,
                            cursor : 'pointer'
                        }
                    }  /></p>
                    <p style={
                        {
                            fontSize : "1rem"
                        }
                    } >chia se</p></button> 
                    :
                    <button 
                    onClick={handleUnshare}
                    className={cx("btn_hover")} style={
                        {
                            width : 211,
                            border : 'none',
                            textAlign : "center",
                            alignItems : "center",
                            display : "flex",
                            justifyContent : "center",
                            height : "90%",
                            borderRadius : 10,
                        }
                    }>
                    <p><IoIosShareAlt style={
                        {
                            width : 25,
                            height : 25,
                            rotate : "90deg",
                            marginRight : 10,
                            marginTop : 6,
                            color : "blue",
                            cursor : "pointer"
                        }
                    }  /></p>
                    <p style={
                        {
                            fontSize : "1rem"
                        }
                    } >chia se</p></button> 
                     : 

                     checkShare ?

                     <button 
                     onClick={handleUnshare}
                     className={cx("btn_hover")} style={
                        {
                            width : 211,
                            border : 'none',
                            textAlign : "center",
                            alignItems : "center",
                            display : "flex",
                            justifyContent : "center",
                            height : "90%",
                            borderRadius : 10,
                        }
                    }>
                    <p><IoIosShareAlt style={
                        {
                            width : 25,
                            height : 25,
                            rotate : "90deg",
                            marginRight : 10,
                            marginTop : 6,
                            color : "blue",
                            cursor : "pointer"
                        }
                    }  /></p>
                    <p style={
                        {
                            fontSize : "1rem"
                        }
                    } >chia se</p></button> 
                     :
                     <button 
                     onClick={handleShare}
                     className={cx("btn_hover")} style={
                        {
                            width : 211,
                            border : 'none',
                            textAlign : "center",
                            alignItems : "center",
                            display : "flex",
                            justifyContent : "center",
                            height : "90%",
                            borderRadius : 10,
                        }
                    }>
                    <p><TbShare3 style={
                        {
                            width : 20,
                            height : 20,
                            rotate : "90deg",
                            marginRight : 10,
                            marginTop : 6,
                            cursor : "pointer"
                        }
                    }  /></p>
                    <p style={
                        {
                            fontSize : "1rem"
                        }
                    } >chia se</p></button> 
                    }

                    {/* shares */}
                </div>
            </div>
            
        </div> 
        :

        // video
 
        <div className={cx("wrapper_video")}>
        <header className={cx("header_video")}>
            <div className={cx("img_user_page_video")}>
                <img style={
                    {
                        width : 50,
                        height : 50,
                        borderRadius : "50%"
                    }
                } src={data?.userId?.avatar || ""} alt='' />
            </div>
            <div className={cx("full_name_page_user_video")}>
                <div>{data?.userId?.fullName || "user"}</div>
                <div>{format(data?.createdAt) || "just now"}</div>
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
            <iframe  width="100%" height="100%"   src={  `https://www.youtube.com/embed/${data?.video}` || "https://www.youtube.com/embed/m80hv6LCNy0"} title="YouTube video player" frameborder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
        <div className={cx("show_like_video")}>
            <div className={cx("like_share_video")}>
                {data?.userLikes?.includes(userId) ? 
                checkLike ?
                <button 
                onClick={() => {
                    handleDislikeVideo()
                    setCheckLike(false)
                }}
                className={cx("wrapper_icon_video")}>
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
                    handleLikeVideo()
                    setCheckLike(true)
                }}
                className={cx("wrapper_icon_video")}>
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
                    handleLikeVideo()
                    setCheckLike(false)
                 }}
                 className={cx("wrapper_icon_video")}>
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
                    handleDislikeVideo()
                    setCheckLike(true)
                }}
                className={cx("wrapper_icon_video")}>
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
                className={cx("wrapper_icon_video")}>
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
                <button className={cx("wrapper_icon_video")}>
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
            <div className={cx("number_cmt_view_like_video")}>
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


        }
    </>
  )
}
