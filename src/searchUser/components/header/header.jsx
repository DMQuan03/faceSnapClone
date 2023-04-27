import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./header.module.scss"
import { 
    BsFacebook
} from "react-icons/bs"
import {
    VscHome,
} from "react-icons/vsc"
import {
    BsFlag
} from "react-icons/bs"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import searchUser from '../../../redux/slice/searchUser'
import { io } from 'socket.io-client'
import EDITPOST from "../content/components/post/editpost"
import SHOWMORE from '../content/components/post/showmorePost'
import SHOWMOREVIDEO from '../../../pages/childrenPage/video/components/showMoreVideo'
import Tippy from "@tippyjs/react/headless"
import {
    HiBellAlert
} from "react-icons/hi2"
import {
    AiOutlinePlus,
    AiTwotoneSetting,
    AiFillQuestionCircle,
    AiFillExclamationCircle
} from "react-icons/ai"
import {
    BsMessenger,
    BsFillMoonFill
} from "react-icons/bs"
import {
    IoLogOut
} from "react-icons/io5"
const cx = classNames.bind(styles)

const HEADERSEARHUSER  = () => {

    const { avatar, token, userId, username } = sessionStorage
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const limit = useSelector(state => state.searchUser.limits)
    const limitBlog = useSelector(state => state.searchUser.limitBlog)
    const limitVideo = useSelector(state => state.searchUser.limitVideo)
    const showMore = useSelector(state => state.blog.showMorePost)
    const editPost = useSelector(state => state.blog.editPost)
    const showCommentVideo = useSelector(state => state.video.showMore)

    // custom state
    const [searchUserTrue , setSearchUserTrue] = useState("")
    const [searchUserText , setSearchUserText] = useState("")

    const MENU_ITEM = [
        {
            id : 1,
            title : "Cài đặt & quyền riêng tư",
            icon : <AiTwotoneSetting className={cx("icon_header")} />,
            onClick : () => {

            }
        },
        {
            id : 2,
            title : "Trợ giúp & hỗ trợ",
            icon : <AiFillQuestionCircle className={cx("icon_header")} />,
            onClick : () => {

            }
        },
        {
            id : 3,
            title : "Màn hình & trợ năng",
            icon : <BsFillMoonFill className={cx("icon_header")} />,
            onClick : () => {

            }
        },
        {
            id : 4,
            title : "Đóng góp ý kiến",
            icon : <AiFillExclamationCircle className={cx("icon_header")} />,
            onClick : () => {

            }
        },
        {
            id : 1,
            title : "Đăng xuất",
            icon : <IoLogOut className={cx("icon_header")} />,
            onClick : () => {
                sessionStorage.clear()
                navigate("/")
            }
        },
    ]
   
        useEffect(() => {
        axios({
          method : "get",
          url : process.env.REACT_APP_BASE_URL + "/user/searchuser?q=" + searchUserTrue + "&limit=" + limit + "&limitBlog=" + limitBlog + "&limitVideo=" + limitVideo,
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        .then(res => {
            const lengthdata  = res.data.data.length
            for (let i = 0 ; i < lengthdata ; i ++ ) {
                for (let j = 0 ; j > lengthdata ; j ++) {
                    if (res.data.data[i].followingOfUser < res.data.data[j].followingOfUser) {
                        let temp = res.data.data[i]
                        res.data.data[i] = res.data.data[j]
                        res.data.data[j] = temp
                    }
                }
            }
          dispatch(searchUser.actions.resultListUser(res.data.data))
          dispatch(searchUser.actions.resultListBlog(res.data.dataBlog))
          dispatch(searchUser.actions.resultListVideo(res.data.dataVideo))
        })
        .catch(err => {
            console.log(err);
        })
      }, [searchUserTrue, limit, limitBlog, limitVideo])
    
      const handleSearchUser = () => {
        setSearchUserTrue(searchUserText)
        navigate("/searchuser")
      }

     
  return (
    <div className={cx("wrapper")}>
          {showMore && <SHOWMORE/>}
          {showCommentVideo && <SHOWMOREVIDEO />}
          {editPost && <EDITPOST />}
        <div className={cx("search_user_header")}>
            <BsFacebook 
            onClick={() => {
                navigate("/facebook")
            }}
            style={
                {
                    width : 45,
                    height : 45,
                    rotate : "90deg",
                    color : "blue",
                    marginLeft : 20
                }
            } />
            <input className={cx("styles_input")} type='text' placeholder='search'
            onChange={(e) => {
                setSearchUserText(e.target.value)
            }}
            />
            <button 
            onClick={handleSearchUser}
            className={cx("styles_button")}>search</button>
        </div>
        <div className={cx("navbar_header")}>
            <NavLink className={cx("nav_item1_header")} style={
                {
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    textAlign : 'center',
                    width : 200,
                }
            } to={"/facebook"}><VscHome className={cx("icon")} /></NavLink>
            <NavLink className={cx("nav_item1_header")} style={
                {
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    textAlign : 'center',
                    width : 200
                }
            } to={"/facebook/pagegroup"}><BsFlag style={
                {
                    width : 24,
                    height  :24,
                    marginTop : 3
                }
            } className={cx("icon")} /></NavLink>
            <NavLink className={cx("nav_item1_header")} style={{
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    textAlign : 'center',
                    width : 200
                   
                }} to={"/facebook/watch"}><svg style={
                    {
                    width : 30,
                    height : 30,
                    rotate : "90deg",
                    marginLeft : 20,
                    marginRight : 20,
                }
            } viewBox="0 0 28 28" class="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6"  height="28" width="28"><path d="M8.75 25.25C8.336 25.25 8 24.914 8 24.5 8 24.086 8.336 23.75 8.75 23.75L19.25 23.75C19.664 23.75 20 24.086 20 24.5 20 24.914 19.664 25.25 19.25 25.25L8.75 25.25ZM17.163 12.846 12.055 15.923C11.591 16.202 11 15.869 11 15.327L11 9.172C11 8.631 11.591 8.297 12.055 8.576L17.163 11.654C17.612 11.924 17.612 12.575 17.163 12.846ZM21.75 20.25C22.992 20.25 24 19.242 24 18L24 6.5C24 5.258 22.992 4.25 21.75 4.25L6.25 4.25C5.008 4.25 4 5.258 4 6.5L4 18C4 19.242 5.008 20.25 6.25 20.25L21.75 20.25ZM21.75 21.75 6.25 21.75C4.179 21.75 2.5 20.071 2.5 18L2.5 6.5C2.5 4.429 4.179 2.75 6.25 2.75L21.75 2.75C23.821 2.75 25.5 4.429 25.5 6.5L25.5 18C25.5 20.071 23.821 21.75 21.75 21.75Z"></path></svg></NavLink>
            <NavLink 
            to={"/facebook/marketplace"}
            className={cx("nav_item1_header")}  style={
                {
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    textAlign : 'center',
                    width : 200
                }
            } ><svg style={
                {
                    width : 30,
                    height : 30,
                    rotate : "90deg",
                    marginLeft : 20,
                    marginRight : 20,
                    
                }
            } viewBox="0 0 28 28" class="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6"  height="28" width="28"><path d="M17.5 23.75 21.75 23.75C22.164 23.75 22.5 23.414 22.5 23L22.5 14 22.531 14C22.364 13.917 22.206 13.815 22.061 13.694L21.66 13.359C21.567 13.283 21.433 13.283 21.34 13.36L21.176 13.497C20.591 13.983 19.855 14.25 19.095 14.25L18.869 14.25C18.114 14.25 17.382 13.987 16.8 13.506L16.616 13.354C16.523 13.278 16.39 13.278 16.298 13.354L16.113 13.507C15.53 13.987 14.798 14.25 14.044 14.25L13.907 14.25C13.162 14.25 12.439 13.994 11.861 13.525L11.645 13.35C11.552 13.275 11.419 13.276 11.328 13.352L11.155 13.497C10.57 13.984 9.834 14.25 9.074 14.25L8.896 14.25C8.143 14.25 7.414 13.989 6.832 13.511L6.638 13.351C6.545 13.275 6.413 13.275 6.32 13.351L5.849 13.739C5.726 13.84 5.592 13.928 5.452 14L5.5 14 5.5 23C5.5 23.414 5.836 23.75 6.25 23.75L10.5 23.75 10.5 17.5C10.5 16.81 11.06 16.25 11.75 16.25L16.25 16.25C16.94 16.25 17.5 16.81 17.5 17.5L17.5 23.75ZM3.673 8.75 24.327 8.75C24.3 8.66 24.271 8.571 24.238 8.483L23.087 5.355C22.823 4.688 22.178 4.25 21.461 4.25L6.54 4.25C5.822 4.25 5.177 4.688 4.919 5.338L3.762 8.483C3.729 8.571 3.7 8.66 3.673 8.75ZM24.5 10.25 3.5 10.25 3.5 12C3.5 12.414 3.836 12.75 4.25 12.75L4.421 12.75C4.595 12.75 4.763 12.69 4.897 12.58L5.368 12.193C6.013 11.662 6.945 11.662 7.59 12.193L7.784 12.352C8.097 12.609 8.49 12.75 8.896 12.75L9.074 12.75C9.483 12.75 9.88 12.607 10.194 12.345L10.368 12.2C11.01 11.665 11.941 11.659 12.589 12.185L12.805 12.359C13.117 12.612 13.506 12.75 13.907 12.75L14.044 12.75C14.45 12.75 14.844 12.608 15.158 12.35L15.343 12.197C15.989 11.663 16.924 11.663 17.571 12.197L17.755 12.35C18.068 12.608 18.462 12.75 18.869 12.75L19.095 12.75C19.504 12.75 19.901 12.606 20.216 12.344L20.38 12.208C21.028 11.666 21.972 11.666 22.62 12.207L23.022 12.542C23.183 12.676 23.387 12.75 23.598 12.75 24.097 12.75 24.5 12.347 24.5 11.85L24.5 10.25ZM24 14.217 24 23C24 24.243 22.993 25.25 21.75 25.25L6.25 25.25C5.007 25.25 4 24.243 4 23L4 14.236C2.875 14.112 2 13.158 2 12L2 9.951C2 9.272 2.12 8.6 2.354 7.964L3.518 4.802C4.01 3.563 5.207 2.75 6.54 2.75L21.461 2.75C22.793 2.75 23.99 3.563 24.488 4.819L25.646 7.964C25.88 8.6 26 9.272 26 9.951L26 11.85C26 13.039 25.135 14.026 24 14.217ZM16 23.75 16 17.75 12 17.75 12 23.75 16 23.75Z"></path></svg></NavLink>
        </div>
        <div className={cx("info_user")}>
            <div style={
                {
                    width : 50,
                    height : "100%",
                    display : "flex",
                    justifyContent : 'center',
                    alignItems :'center',
                    textAlign : "center"
                }
            }>
                <button style={
                    {
                        width : 40,
                        height : 40,
                        borderRadius : "50%",
                        border : "none",
                        outline : "none",
                        backgroundColor : "#e4e6eb",
                        display : 'flex',
                        justifyContent : "center",
                        alignItems : "center",
                        textAlign : 'center'
                    }
                }><AiOutlinePlus style={
                    {
                        width : 17,
                        height : 17,
                        rotate : "90deg"
                    }
                } /></button>
            </div>
            <div style={
                {
                    width : 50,
                    height : "100%",
                    display : "flex",
                    justifyContent : 'center',
                    alignItems :'center',
                    textAlign : "center"
                }
            }>
                <button 
                onClick={() => {
                    navigate("/chat")
                }}
                style={
                    {
                        width : 40,
                        height : 40,
                        borderRadius : "50%",
                        border : "none",
                        outline : "none",
                        backgroundColor : "#e4e6eb",
                        display : 'flex',
                        justifyContent : "center",
                        alignItems : "center",
                        textAlign : 'center',
                        cursor : "pointer"
                    }
                }><BsMessenger style={
                    {
                        width : 17,
                        height : 17,
                        rotate : "90deg"
                    }
                } /></button>
            </div>
            <div style={
                {
                    width : 50,
                    height : "100%",
                    display : "flex",
                    justifyContent : 'center',
                    alignItems :'center',
                    textAlign : "center"
                }
            }>
                <button style={
                    {
                        width : 40,
                        height : 40,
                        borderRadius : "50%",
                        border : "none",
                        outline : "none",
                        backgroundColor : "#e4e6eb",
                        display : 'flex',
                        justifyContent : "center",
                        alignItems : "center",
                        textAlign : 'center'
                    }
                }><HiBellAlert style={
                    {
                        width : 22,
                        height : 22,
                        rotate : "90deg"
                    }
                } /></button>
            </div>
           <Tippy
           interactive
           placement='bottom-start'
           render={attrs => (
             <div className={cx("item_menu_header")} tabIndex={"-1"} {...attrs}>
                <div className={cx("info_user_header")}>
                    <div className={cx("container_infoUser_header")}>
                        <div 
                        onClick={() => {
                            navigate("/profile/" + userId)
                        }}
                        style={
                            {
                                width : "100%",
                                height : "70%",
                                display : "flex",
                                justifyContent : "flex-start",
                                alignItems : "center",
                                textAlign : 'center',
                                borderBottom : "1px solid #333",
                                cursor : "pointer"
                            }
                        }>
                            <div><img style={
                                {
                                    width : 40,
                                    height : 40,
                                    borderRadius : "50%"
                                }
                            } src={avatar || ""} /></div>
                            <div
                            style={
                                {
                                    marginLeft : 10
                                }
                            }
                            >{username}</div>
                        </div>
                        <div style={
                            {
                                width : "100%",
                                height : "50%",
                                display : "flex",
                                justifyContent : "flex-start",
                                alignItems : "center",
                                textAlign : 'center',
                                cursor : "pointer"
                            }
                        }>
                            <p 
                            onClick={() => {
                                navigate("/profile/" + userId)
                            }}
                            style={
                                {
                                    marginTop : 0,
                                    fontSize : ".9rem",
                                    color : '#3386f4'
                                }
                            }>Xem tất cả trang cá nhân</p>
                        </div>
                        {MENU_ITEM.map(el => (
                            <div key={el.id} className={cx("content_item")} onClick={el.onClick}>
                                <button style={
                                    {
                                        borderRadius : "50%",
                                        border : "none",
                                        outline : "none",
                                        display : "flex",
                                        justifyContent : 'center',
                                        alignItems : 'center',
                                        textAlign : "center",
                                        width : 40,
                                        height : 40
                                    }
                                }>{el.icon}</button>
                                <div style={
                                    {
                                        marginLeft : 10
                                    }
                                }><p style={
                                    {
                                        fontWeight : 600,

                                    }
                                }>{el.title}</p></div>
                            </div>
                        ))}
                        <div style={
                            {
                                width : '100%',
                                height : 50,
                            }
                        }>
                            <span style={
                                {
                                    fontSize : ".8rem"
                                }
                            }>Quyền riêng tư . Điều khoản . Quảng cáo . Lựa chọn</span>
                            <span style={
                                {
                                    fontSize : ".8rem"
                                }
                            }>quảng cáo . Cookie . Xem thêm . Meta @ 2023</span>
                        </div>
                    </div>
                </div>
            </div>
           )}
           >
                <img className={cx("infoUser")} src={avatar} alt='a' />
           </Tippy>
        </div>
    </div>
  )
}

export default HEADERSEARHUSER