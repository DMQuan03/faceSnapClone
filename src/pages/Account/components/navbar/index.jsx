import React from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import {
    AiTwotoneSetting,
    AiFillGift
} from "react-icons/ai"
import {
    FaUserFriends,
    FaUserCheck,
    FaUserEdit
} from "react-icons/fa"
import {
    RiUserShared2Fill,
    RiUserAddFill
} from "react-icons/ri"
import { useDispatch } from 'react-redux'
import friends from '../../../../redux/slice/friends'

const cx = classNames.bind(styles)

const NAVBARFRIENDS = () => {

    const dispatch = useDispatch()

    const MENU_ITEM = [
        {
            icon : <FaUserFriends className={cx("icon_navbar_1")}  />,
            title : "Trang chủ",
            id : 1,
            onclick : () => {

            }
        },
        {
            icon : <RiUserShared2Fill className={cx("icon_navbar_1")}  />,
            title : "Lời mời kết bạn",
            id : 2,
            onclick : () => {

            }
        },
        {
            icon : <RiUserAddFill className={cx("icon_navbar_1")}  />,
            title : "Gợi ý",
            id : 3,
            onclick : () => {

            }
        },
        {
            icon : <FaUserCheck className={cx("icon_navbar_1")}  />,
            title : "Tất cả bạn bè",
            id : 4,
            onclick : () => {
                dispatch(friends.actions.ShowAllfriends())
            }
        },
        {
            icon : <AiFillGift className={cx("icon_navbar_1")}  />,
            title : "Sinh nhật",
            id : 5,
            onclick : () => {

            }
        },
        {
            icon : <FaUserEdit  className={cx("icon_navbar_1")} />,
            title : "Danh sách tùy chỉnh",
            id : 6,
            onclick : () => {

            }
        },
    ]
  return (
    <div className={cx("wrapper")}>
        <header className={cx("header_navbar_friends")}>
            <div>
                <h2 style={
                    {
                        marginLeft : 10
                    }
                }>Bạn bè</h2>
            </div>
            <div>
                <button className={cx("btn_header_nav_friends")} style={
                    {
                        borderRadius : 9999,
                        width : 30,
                        height : 30,
                        display : "flex",
                        justifyContent  :'center',
                        alignItems  :"center",
                        textAlign : "center",
                        fontSize : "1rem",
                        border : "none",
                        outline : "none"
                    }
                }>
                    <div ><AiTwotoneSetting style={
                        {
                            top : 2
                        }
                    } className={cx("icon_friends")} /></div>
                </button>
            </div>
        </header>
        <div className={cx("nav_item")}>
            {MENU_ITEM.map(el => (
                <div key={el.id} onClick={el.onclick} className={cx("container_item")}>
                    <div style={
                        {
                            marginLeft : 10
                        }
                    }>
                        <div style={
                        {
                            width : 40,
                            height : 40,
                            backgroundColor : "white",
                            borderRadius : "50%",
                            display : "flex",
                            justifyContent : "center",
                            alignItems : "center",
                            textAlign :'center'
                        }
                    }>{el.icon}</div>
                    </div>
                    <div style={
                        {
                            marginLeft : 20,
                            fontSize : "1.1rem",
                            fontWeight : 600
                        }
                    }>
                        {el.title}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default NAVBARFRIENDS