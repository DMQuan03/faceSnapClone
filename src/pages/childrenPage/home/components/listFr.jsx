import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import {
    AiFillGift,
    AiOutlineSearch
} from "react-icons/ai"
import {
    FaVideo
} from "react-icons/fa"
import {
    BsThreeDots
} from "react-icons/bs"
import LISTFRIENDS from './listfriends'
import GROUPCHATLIST from './groupchat'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const test = [
    1,2,3,3,3,3,3,3,
]

const cx = classNames.bind(styles)
const NAVLISTFR = () => {
    // state thu vien
    const navigate = useNavigate()
    const { token } = sessionStorage

    // custom state
    const [listFriends , setListFriends] = useState([] ?? [])
    const [listGroup , setListGroup] = useState([] ?? [])

    useEffect(() => {
            
        axios({
            method : "get",
            url : process.env.REACT_APP_API2,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            const data = res.data.user.friends
            const rooms = res.data.user.roomChats
            for (let i = 0 ; i < data.length ; i ++) {
                for (let j = 0 ; j < data.length ; j++) {
                    if (data[i].sorts > data[j].sorts) {
                        let temp = data[i]
                        data[i] = data[j]
                        data[j] = temp
                    }
                }
            }
            const result = rooms.filter(el => {
                return el.description === "group"
            })

            setListGroup(result)
            setListFriends(data)
        })
        .catch(err => {
            navigate("/")
            console.log(err.message)
            return 0
        })
    }, [])
  return (
    <div className={cx("Wrapper_lsFr")}>
        <div className={cx("lsFr_birthDay")}>
                <div style={
                    {
                        display  : "flex",
                        justifyContent  : "flex-start",
                        alignItems  : "center",
                        textAlign  : "center",
                        height : 40
                    }
                }>
                    <h3 style={
                        {
                            fontWeight : 500,
                            marginLeft : 10,
                            color : "gray",
                            fontSize : "1.2rem"
                        }
                    }>Sinh nhat</h3>
                </div>
                <div 
                className={cx("nav_item1_fb2")}
                style={
                    {
                        display : "flex",
                        justifyContent : "center",
                    }
                }>
                    <div style={
                        {
                            left : 0,
                            color : "pink"
                        }
                    }>
                        <AiFillGift style={
                            {
                                color : "#d52241"
                            }
                        } className={cx("icon")} />
                    </div>
                    <div style={
                        {
                            left : 50,
                            marginTop : -12,
                            overflow : "hidden",
                            height : "auto"
                        }
                    }><p>Hom nay sinh nhat quan va 2 nguoi khac asdasd asd asdsa d</p>
                    </div>
                </div>
            </div>
            <div className={cx("list_user_nav_fb2")}>
                <div className={cx("title_list_user")}>
                    <div className={cx("nav_item2_fb2")}>
                        <h3 style={
                            {
                                fontSize : "1.2rem",
                                fontWeight : 500,
                                color : "gray",
                                marginLeft : 10
                            }
                        }>Nguoi lien he</h3>
                    </div>
                    <div style={
                        {
                            display : "flex",
                            justifyContent : "space-around",
                            alignItems : "center",
                            textAlign : "center"
                        }
                    }>
                        <div><FaVideo style={
                            {
                                width : 20,
                                height : 20,
                                rotate : "90deg",
                                marginRight : 15,
                                marginTop : 10
                            }
                        } /></div>
                        <div><AiOutlineSearch style={
                            {
                                width : 20,
                                height : 20,
                                rotate : "90deg",
                                marginRight : 15,
                                marginTop : 10
                            }
                        }  /></div>
                        <div><BsThreeDots style={
                            {
                                width : 20,
                                height : 20,
                                rotate : "90deg",
                                marginRight : 15,
                                marginTop : 10
                            }
                        }  /></div>
                    </div>
                </div>
                { listFriends.length > 0 && listFriends?.map(us => {
                    return <LISTFRIENDS key={us._id} data={us} />
                })}
            </div>
            <div className={cx("title_group_chat")}>
                <p style={
                    {
                        fontSize : "1.2rem",
                        fontWeight : 500,
                        color : "gray",
                        marginLeft : 10,
                        marginTop : 5
                    }
                }>Cuoc tro chuyen nhom</p>
            </div>
            <div>
                { listGroup.length > 0 && listGroup?.map(el => {
                    return <GROUPCHATLIST key={el._id} data={el} />
                })}
            </div>
    </div>
  )
}

export default NAVLISTFR