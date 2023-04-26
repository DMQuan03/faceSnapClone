import React, { Fragment, memo, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import {
    AiFillLike, 
    AiFillHeart, 
    AiOutlineEllipsis,
    AiOutlineLike,
    AiOutlineEdit,
    AiFillDelete
} from "react-icons/ai"
import {
    TfiComment
}from "react-icons/tfi"
import {
    TbShare3,
} from "react-icons/tb"
import {
    IoIosShareAlt
}from "react-icons/io"
import { format } from 'timeago.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import blogSlice from '../../../../../redux/slice/blogSlice'
import { io } from 'socket.io-client'
import Tippy from '@tippyjs/react/headless'
import POPPER from '../../../../../components/Popper'

const {token } = sessionStorage

const socket = io.connect(process.env.REACT_APP_SOCKET, {
    query : {
        token
    }
})

const cx = classNames.bind(styles)

const POSTSEARCH = ({data}) => {

    // state thu vien
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {token, userId } = sessionStorage
    
    // custom state
    const [CheckLikes , setCheckLikes] = useState(false)
    const [checkShare , setCheckShare] = useState(false)
    const [checkDelete , setCheckDelete] = useState(false)
    const [share , setShare] = useState([])

    

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
                    url : process.env.REACT_APP_BASE_URL + "/blog/deleteblog/" +  data._id,
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
          url : process.env.REACT_APP_BASE_URL + "/blog/like/" +  data._id,
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
          url : process.env.REACT_APP_BASE_URL + "/blog/dislike/" + data._id,
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
        setShare(data.shares)
      }, [])

  return (
    <>
        {checkDelete ?
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
            
        </div> }
    </>
  )
}

export default memo(POSTSEARCH)

