import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import LISTMESS from '../listMessage'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'
import classNames from 'classnames/bind'
import styles from "./styles.icon.scss"
import ScrollToBottom from 'react-scroll-to-bottom'

const cx = classNames.bind(styles)
const {token } = sessionStorage
const socket = io.connect(process.env.REACT_APP_SOCKET)

const CONTENTROOM = ({data}) => {
    const [textMess , setTextMess] = useState("")
    const {userId, username , avatar} = sessionStorage
    const myref = useRef()
    const listMesss = useSelector(state => state.chat.listMessage)
    const room = useSelector(state => state.chat.infoRoom)

    const handleSendMess = () => {
        const infoPayload = {
            text : textMess,
            RoomId : room._id,
            currentUserId : userId,
            currentUserFullName : username,
            currentUserAvatar : avatar
        }
        socket.emit("user_send_mess_room_chat", { infoPayload})
        myref.current.focus()
        setTextMess("")
    }

    useEffect(() => {
        console.log(data,1);
    }, [])

    // useEffect(() => {
    //     socket.emit("join_room", {id : room._id})
    //     return () => {
    //         socket.emit("leave_room_chat", {roomChat : room._id})
    //     }
    // }, [room])
    
  return (
    <div style={
        {
            position : "absolute",
            bottom : 0,
            top : 0,
            width : "100%"
        }
    }>
            
        <div
        className={cx("styles_bgr_size")}
        style={
            {
                backgroundColor: "rgb(0, 0, 0)",
                position: "relative",
                height: "91%",
                top: 80,
                right: 0,
                marginTop: 0,
                width : "100%",
                backgroundImage : `url(${room.themes})`,
                backgroundRepeat : "no-repeat",
            }
        }>
        <ScrollToBottom className={cx('scr_bt1')}>
                    {listMesss?.map((ms) => {
                        if (ms.userId._id === userId) {
                            var id = "YOU"
                        }else {
                            var id = "OTHER"
                        }
                        return <LISTMESS key={ms._id} id={id} data={ms} />
                    })}
            </ScrollToBottom>
        </div>
        <div style={
            {
                position : "absolute",
                height : "9%",
                width : "100%",
                backgroundColor : "#171717",
                bottom : 0,
                display : "flex",
                justifyContent : "center",
                alignItems : "center",
            }
        }>
            {!room.blockChat.includes(userId) ? 
            <>
                <input ref={myref} className={cx("incon_style")} value={textMess} onChange={(e) => {
                    setTextMess(e.target.value)
                }} />
                <label className={cx("labelStyles")}>ban dang nghi gi ...</label>
                <input onClick={handleSendMess} type='submit' />
            </> : <p style={
                {
                    color : "wheat"
                }
            }>you have been blocked from chatting</p>
            }
        </div>
    </div>
  )
}

export default CONTENTROOM