import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import {
    GrSend
} from "react-icons/gr"
import {
    AiFillLike,
    AiFillHeart,
    AiOutlineLike
} from "react-icons/ai"

import {
    MdOutlineArrowBack
} from "react-icons/md"
import {
    TbShare3
} from "react-icons/tb"
import { format } from "timeago.js"
import { useDispatch, useSelector } from 'react-redux'
import blogSlice from '../../../../../../redux/slice/blogSlice'
import axios from 'axios'
import LISTCOMMENT from '../../../../../../chat/components/listcomment'
import { io } from 'socket.io-client'

const {token} = sessionStorage
const socket = io.connect(process.env.REACT_APP_SOCKET, {
    query : {
        token
    }
})

const cx = classNames.bind(styles)



const SHOWMORE = () => {
    // state thu vien
    const dispatch = useDispatch()
    const {avatar, userId , token } = sessionStorage
    const infoPost = useSelector(state => state.blog.infoOnlyPost)
    
    
    // custom state
    const [listComment , setListComment ] = useState([] ?? [])
    const [CheckLikes , setCheckLikes] = useState(false)
    const [textComment , setTextComment] = useState("")

    useEffect(() => {
        axios({
            method : "get",
            url : "http://localhost:3456/api/utils/getcomment/" + infoPost._id,
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

    useEffect(() => {
        socket.on("sever_return_comment", (data) => {
            if (data._id === infoPost._id) {
                setListComment(prev => [data , ...prev])
                return 1
            }else {
                return 0
            }
        })
      }, [socket])

      

    useEffect(() => {
        return () => {
            setListComment([])
        }
    }, [])


    useEffect(() => {
        socket.emit("join_room", {id : infoPost._id})
        return () => {
            socket.emit("leave_room_blog", {blogId : infoPost._id})
        }
    }, [])
    const handleLike = () => {
        axios({
          method : "put",
          url : process.env.REACT_APP_BASE_URL + "/blog/like/"  + infoPost._id,
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
          url : process.env.REACT_APP_BASE_URL + "/blog/dislike/"  + infoPost._id,
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
  return (
    <div className={cx("wrapper")}>
            <div className={cx("created_by")}>
                <h2>Bài viết của {infoPost?.userId?.fullName}</h2>
                <div 
                onClick={() => {
                    socket.emit("leave_room_blog", {blogId : infoPost._id})
                    dispatch(blogSlice.actions.unShowMore())
                    dispatch(blogSlice.actions.infoOnlyPost({}))
                }}
                style={
                    {
                        position : "absolute",
                        right : 20
                    }
                }><MdOutlineArrowBack style={
                    {
                        width : 30,
                        height : 30,
                        rotate : "90deg"
                    }
                } /></div>
            </div>
        <div className={cx("info_post")}>
            <div className={cx("info_user_created_post")}>
                <div>
                    <img style={{ width : 50, height : 50,borderRadius : "50%", position : "absolute", left : 10,
                    marginTop : 6
                    }} src={infoPost?.userId?.avatar || 'https://scontent.fhan2-5.fna.fbcdn.net/v/t1.6435-1/101585066_3097199563871491_2415309162809393152_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=1eb0c7&_nc_ohc=1AE6bl1oV4UAX88ET_q&_nc_ht=scontent.fhan2-5.fna&oh=00_AfDrKVJ_ngtIBzcalvxkTgZJkb2SZwKF63SJ45WuSFdBXw&oe=646B1857'} />
                </div>
                <div style={{position : "absolute", left : 80, marginTop : 6 }}>
                    <div>{infoPost?.userId?.fullName || "user"}</div>
                </div>
                <div style={{ position : "absolute", left : 80, marginTop: 25}}>{format(infoPost?.createdAt) || "just now" }</div>
            </div>
            <div className={cx("title_post")}>
                <p style={
                    {
                        marginLeft : 20,
                        marginRight : 20
                    }
                }>{infoPost?.title || ""}</p>
            </div>
            <div className={cx("img_post")}>
                <img style={
                    {
                        width : "100%",
                        height : "100%"
                    }
                } src={infoPost?.img || ""} alt='a' />
            </div>
            <div className={cx("show_like")}>
                <div style={
                    {
                        display : 'flex',
                        justifyContent : "flex-start",
                        alignItems : 'center',
                        textAlign : 'center',
                        position : "absolute",
                        left : 0,
                        width : 400,
                        padding : 20,
                        boxSizing : 'border-box'
                    }
                }>
                    <div>
                        <button style={
                            {
                                width : 22,
                                height : 22,
                                borderRadius : "50%",
                                backgroundColor : "blue",
                                outline : "none",
                                border : 'none',
                                marginLeft : 2
                            }
                        }>
                            <AiFillLike style={
                                {
                                    width : 13,
                                    height : 13,
                                    rotate : "90deg",
                                    color : "white"
                                }
                            } />
                        </button>
                    </div>
                    <div>
                        <button style={
                            {
                                width : 22,
                                height : 22,
                                borderRadius : "50%",
                                backgroundColor : "red",
                                outline : "none",
                                border : 'none',
                                marginTop : 4
                            }
                        }>
                            <AiFillHeart style={
                                {
                                    width : 15,
                                    height : 15,
                                    rotate : "90deg",
                                    color : "white",
                                    marginLeft : -2,
                                    marginTop : 4
                                }
                            } />
                        </button>
                    </div>
                    <div>
                        <p style={
                            {
                                marginLeft : 10
                            }
                        }>{infoPost?.userLikes?.includes(userId) ? CheckLikes ? 
                        (infoPost.likes - 1 || 0) +  " nguoi khac" : "ban va " + (infoPost.likes - 1|| 0) +  " nguoi khac"
                        :
                        CheckLikes ? "ban va " + (infoPost.likes || 0) +  " nguoi khac" : (infoPost.likes || 0) +  " nguoi khac"} like</p>
                    </div>
                </div>
                <div style={
                    {
                        position : "absolute",
                        right : 20,
                        width : 400,
                        display : "flex",
                        justifyContent : "flex-end",
                        alignItems : "center"
                    }
                }>
                    <div style={
                        {
                            marginRight : 20
                        }
                    }>{infoPost?.comments?.length || 0} comments</div>
                    <div>{infoPost?.shares} share</div>
                </div>
            </div>
            {/* btn like */}

            <div className={cx("btn_like_cmt_share")}>
            <div className={cx('btn_true')}>
                {infoPost.userLikes.includes(userId) ? 
                CheckLikes ? 
                <button 
                onClick={() => {
                    handleLike()
                }}
                className={cx("btn_hover")} style={
                    {
                        width : "50%",
                        border : 'none',
                        textAlign : "center",
                        alignItems : "center",
                        display : "flex",
                        justifyContent : "center",
                        height : "100%",
                    }
                }>
                <p><AiOutlineLike style={
                    {
                        width : 20,
                        height : 20,
                        rotate : "90deg",
                        marginRight : 10,
                        marginTop : 0,
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
                        width : "50%",
                        border : 'none',
                        textAlign : "center",
                        alignItems : "center",
                        display : "flex",
                        justifyContent : "center",
                        height : "100%",
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
                        color : "blue"
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
                        width : "50%",
                        border : 'none',
                        textAlign : "center",
                        alignItems : "center",
                        display : "flex",
                        justifyContent : "center",
                        height : "100%",
                    }
                }>
                <p><AiFillLike style={
                    {
                        width : 20,
                        height : 20,
                        rotate : "90deg",
                        marginRight : 10,
                        marginTop : 0,
                        color : "blue"
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
                        width : "50%",
                        border : 'none',
                        textAlign : "center",
                        alignItems : "center",
                        display : "flex",
                        justifyContent : "center",
                        height : "100%",
                    }
                }>
                <p><AiOutlineLike style={
                    {
                        width : 20,
                        height : 20,
                        rotate : "90deg",
                        marginRight : 10,
                        marginTop : 0
                    }
                } /></p>
                <p style={
                    {
                        fontSize : "1rem"
                    }
                }>like</p></button>
                }
                <button className={cx("btn_hover")} style={
                    {
                        width : "50%",
                        border : 'none',
                        textAlign : "center",
                        alignItems : "center",
                        display : "flex",
                        justifyContent : "center",
                        height : "100%",
                    }
                }>
                <p><TbShare3 style={
                    {
                        width : 20,
                        height : 20,
                        rotate : "90deg",
                        marginRight : 10,
                        marginTop : 6
                    }
                }  /></p>
                <p style={
                    {
                        fontSize : "1rem"
                    }
                } >chia se</p></button>
            </div>
        </div>
            {/* btn like */}
            <div style={
                {
                    width : "100%",
                    height : 400
                }
            }>
                {listComment.length > 0 && listComment?.map((el) => {
                    return <LISTCOMMENT data={el} idBlog={infoPost._id} />
                })}
            </div>
        </div>
            <div className={cx("input_comments")}>
                <div style={
                    {
                        width : 60,
                        height : "100%",
                        display : "flex",
                        justifyContent : "center",
                        alignItems : "center",
                        position : "absolute",
                        left : 10
                    }
                }>
                    <img style={
                        {
                            width : 40,
                            height : 40,
                            borderRadius : "50%",
                        }
                    } src={ avatar || ""} alt='a' />
                </div>
                <div style={
                    {
                        position : "absolute",
                        width : 600,
                        height : "100%",
                        left : 80,
                        display : "flex",
                        justifyContent : "center",
                        alignItems : "center",
                        textAlign : "center"
                    }
                }>
                    <input 
                    onChange={(e) => {
                        setTextComment(e.target.value)
                    }}
                    style={{
                        width : "100%",
                        outline : "none",
                        border : "none",
                        minHeight : 30,
                        height : 30,
                        backgroundColor : 'gray',
                        borderRadius : 10
                    }} />
                    <button 
                    onClick={() => {
                        socket.emit("user_comment", {text : textComment, idBlog : infoPost._id})
                        setTextComment("")
                    }}
                    style={
                        {
                            position : "absolute",
                            right : 0,
                            width : 40,
                            height : 32,
                            backgroundColor : "white",
                            outline : "none",
                            border : "none",
                            borderTopRightRadius : 10,
                            borderBottomRightRadius : 10,
                            display : "flex",
                            justifyContent : "center",
                            alignItems : "center"
                        }
                    }><GrSend style={
                        {
                            width : 20,
                            height : 20,
                            rotate : '90deg'
                        }
                    } /></button>
                </div>
            </div>
    </div>
  )
}

export default SHOWMORE