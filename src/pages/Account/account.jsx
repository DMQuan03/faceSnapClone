import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import NAVBARFRIENDS from './components/navbar'
import LISTAWAIT from './components/listAwaitUser'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import ALLFRIENDS from './components/allfriends'
import { useSelector } from 'react-redux'
const {token} = sessionStorage
const socket = io.connect("http://localhost:3456", {
    query : {
        token
    }
})

const cx= classNames.bind(styles)


const ACCOUNTUSER = () => {

    const {token} = sessionStorage
    const navigate = useNavigate()
    const [listAwait , setListAwait] = useState([] ?? [])

    const showHomePage = useSelector(state => state.friends.homePage)
    const showListFriends = useSelector(state => state.friends.allFriends)

    useEffect(() => {
        axios({
            method : "get",
            url : process.env.REACT_APP_API2,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            setListAwait(res.data.user.listAwait)
            console.log(res.data.user);
        })
        .catch(err => {
            navigate("/")
            console.log(err.message)
            return 0
        })
    }, [])

    useEffect(() => {
        socket.emit("leave_all_room")
        return () => {
            socket.emit("leave_all_room")
        }
    }, [])
  return (
    <div className={cx("wrapper_friends")}>
        {showListFriends && <ALLFRIENDS />}
        { showHomePage && <div className={cx("content_friends")}>
        <NAVBARFRIENDS />
            <div style={
                {
                    width : "100%",
                    display : "flex",
                    justifyContent : 'space-between'
                }
            }>
                <h2>Lời mời kết bạn</h2>
                <p style={
                    {
                        color : "blue",
                        cursor : "pointer"
                    }
                }>Xem tất cả</p>
            </div>
            <div style={
                {
                    display  :'flex',
                    justifyContent  : "flex-start",
                    alignItems : "center",
                    textAlign : "center",
                    overflow  : "hidden",
                    flexWrap : "wrap"
                }
            }>
                {listAwait && listAwait.map(el => {
                    return <LISTAWAIT key={el._id} data={el} />
                })}
            </div>
        </div>}
    </div>
  )
}

export default ACCOUNTUSER