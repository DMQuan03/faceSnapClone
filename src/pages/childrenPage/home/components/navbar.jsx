import React from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import {
    FaUserFriends
}from "react-icons/fa"
import {
    BsShopWindow,
    BsDisplay
} from "react-icons/bs"
import {
    MdExpandMore
} from "react-icons/md"
import { NavLink, useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)
const NAVBARFACEBOOK = ({data}) => {
    const navigate = useNavigate()
    const {userId} = sessionStorage
   
  return (
    <div className={cx("Wrapper")}>
        <div className={cx("navbar_fb")}>
            <div 
            onClick={() => {
                navigate("/profile/" + userId)
            }}
            className={cx("info_user")}>
                <img className={cx("img_user")} src={data?.avatar || ""} alt='a' />
                <div className={cx("username_info")}>
                    <p style={
                        {
                            fontWeight : 700,
                            fontSize : "1.2rem"
                        }
                    }>{data?.fullName || "user"}</p>
                </div>
            </div>
            <div className={cx("nav_item1")}>
                <div 
                onClick={() => {
                    navigate("/facebook/friends")
                }}
                className={cx("nav_item1_icon")}>
                    <FaUserFriends className={cx("icon")} />
                </div>
                <div className={cx("title_nav_item1")}>
                    <p style={
                        {
                            fontWeight : 700
                        }
                    }>ban be</p>
                </div>
            </div>
            <div 
            onClick={() => {
                navigate("/facebook/marketplace")
            }}
            className={cx("nav_item2")}>
                <div className={cx("nav_item2_icon")}>
                    <BsShopWindow className={cx("icon")} />
                </div>
                <div className={cx("title_nav_item2")}>
                    <p style={
                        {
                            fontWeight : 700
                        }
                    }>MarketPlace</p>
                </div>
            </div>
            <div 
            onClick={() => {
                navigate("/facebook/watch")
            }}
            className={cx("nav_item3")}>
                <div className={cx("nav_item3_icon")}>
                    <BsDisplay className={cx("icon")} />
                </div>
                <div className={cx("title_nav_item3")}>
                    <p style={
                        {
                            fontWeight : 700
                        }
                    }>Watch</p>
                </div>
            </div>
            <div className={cx("nav_item3")}>
                <div className={cx("nav_item3_icon")}>
                    <button style={
                        {
                            width : 32,
                            height : 32,
                            borderRadius :"50%",
                            display : "flex",
                            justifyContent : "center",
                            alignItems : "center",
                            textAlign : "center",
                            outline : "none",
                            border : "none",
                            cursor : "pointer"
                        }
                    }>
                        <MdExpandMore style={
                            {
                                rotate : "90deg"
                            }
                        } />
                    </button>
                </div>
                <div className={cx("title_nav_item3")}><p>xem them</p></div>
            </div>
        </div>
        <div className={cx("navbar_fb2")}>
            <div className={cx("title_nav_fb2")}>
                <NavLink style={
                    {
                        textDecoration : "none",
                        color : "gray",
                        fontWeight : 600,
                        fontSize : "1.1rem"
                    }
                }>Lối tắt của bạn</NavLink>
                <button>Chinh sua</button>
            </div>
            {data?.roomChats?.length > 0 && data?.roomChats?.map(room => {
                return <div className={cx("nav_item_fb2")}>
                <div className={cx("nav_item_icon_fb2")}>
                    <img style={
                        {
                            width : 40,
                            height : 40,
                            borderRadius : 10,
                            
                        }
                    } src={room?.avatarRoom ? room.avatarRoom  : room?.user1?.avatar === data?._id ? room?.user2?.avatar : room?.user1?.avatar || 'https://s.yimg.com/fz/api/res/1.2/N4PStbPmrKVPHjjP1lTbaA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0xOTI7cHhvZmY9MDtweW9mZj0wO3E9ODA7dz0xOTI-/https://s.yimg.com/zb/imgv1/79b80442-4073-33e6-8f32-b8d2e1282f5d/s_140x140'} />
                </div>
                <div className={cx("nav_item_title_fb2")}>
                    <p>{room?.nameRoom ? room.nameRoom  : room?.user1?.fullName === data?._id ? room?.user2?.fullName : room?.user1?.fullName || "room"}</p>
                </div>
            </div>
            })}
        </div>
        <footer style={
            {
                width : "100%",
                height : "auto",
            }
        }>
            <p style={
                {
                    fontSize : ".8rem"
                }
            }>Quyền riêng tư . Điều khoản . Quảng cáo . Lựa chọn</p>
            <p style={
                {
                    fontSize : ".8rem"
                }
            }>quảng cáo . Cookie . xem thêm . Meta @ 2023 </p>
        </footer>
    </div>
  )
}

export default NAVBARFACEBOOK