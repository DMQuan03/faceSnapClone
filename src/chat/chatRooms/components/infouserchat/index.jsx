import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from "./only.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import chatSlice from '../../../../redux/slice/chatSlice'
const {token} = sessionStorage
const socket = io.connect("http://localhost:3456", {
    query : {
        token
    }
})
const cx = classNames.bind(styles)

const INFOUSERCHAT = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { avatar , username } = sessionStorage
    const room = useSelector(state => state.chat.infoRoom)

  return (
    <div style={{
        width : "99.7%",
        backgroundColor : "#171717",
        height : 80,
        display : "flex",
        justifyContent : "space-around",
        alignItems :"center",
        color : "wheat",
        borderRight : "1px solid #fff",
        position : "relative"
    }}>
        <img style={
            {
                width : 50,
                height : 50,
                borderRadius : "50%"
            }
        } src={avatar} />
        <p>{username}</p>
        <button className={cx('btn-header-info888')} 
        onClick={() => {
            socket.emit("leave_room_blog", {idBlog : room._id})
            navigate("/home")
            dispatch(chatSlice.actions.infoRoom({}))
            dispatch(chatSlice.actions.listMessages([]))
        }}
        >Home</button>
        
    </div>
    
  )
}

export default INFOUSERCHAT