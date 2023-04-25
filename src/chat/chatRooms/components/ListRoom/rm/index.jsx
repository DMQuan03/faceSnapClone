import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import chatSlice from '../../../../../redux/slice/chatSlice'
import { io } from 'socket.io-client'
const {token} = sessionStorage
const socket = io.connect(process.env.REACT_APP_SOCKET, {
    query : {
        token
    }
})
const ROOMS = ({data}) => {
    const {userId} = sessionStorage
    const dispatch = useDispatch()
    const [userid , setUserid] = useState("")

    const room = useSelector(state => state.chat.infoRoom)

    const handleGetInfoRoom = async() => {
        try {
            socket.emit("leave_room_chat", {roomChat : room._id})
            socket.emit("join_room", { id : data._id })
            socket.emit("getMessageRoomChat", { idRoomChat : data._id })
            sessionStorage.setItem("asdaskdiisadkjnkcjhajshdahsdlkasdkh", data._id)
            await dispatch(chatSlice.actions.infoRoom(data))
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        dispatch(chatSlice.actions.listMessages([]))
        dispatch(chatSlice.actions.infoRoom({}))
    }, [])
    useEffect(() => {
        socket.on("user_send_mess_to_room", (cmt) => {
            if (data._id === cmt.idRoom) {
                dispatch(chatSlice.actions.chatRealTime(cmt))
                return 1
            }else {
                return 0
            }
        })
    }, [socket, data])

    useEffect(() => {
        socket.on("serer_return_message_of_ROOM", async(mess) => {
            dispatch(chatSlice.actions.listMessages(mess.messages))
        })
    }, [socket])


    useEffect(() => {
        if (data?.user1?._id === userId ) {
            setUserid(data?.user2?._id)
        }else {
            setUserid(data?.user1?._id)
        }
    }, [])
  return (
    <div style={
        {
            width : "100%",
            height : 100,
            backgroundColor : "#5f705f",
            marginTop : 5,
            display : "flex",
            justifyContent : "space-around",
            alignItems : "center",
            textAlign :"center",
            position : "relative"
        }
    }>
        <div 
        
        style={
            {
                width : 50,
                height : "100%",
                display : "flex",
                justifyContent : "center",
                alignItems : "center"
            }
        }>
            <img 
            onClick={handleGetInfoRoom}
            style={
                {
                    width : 50,
                    height : 50,
                    position : "absolute",
                    left : 20,
                    borderRadius : "50%",
                }
            } src={data?.user1?._id === userId ? data.avatarRoom || data?.user2?.avatar    : data.avatarRoom ||  data?.user1?.avatar || "https://www.pmc-kollum.nl/wp-content/uploads/2017/05/no_avatar.jpg"}
            />
        </div>
        <div style={
            {
                position : "absolute",
                width : "auto",
                maxWidth : 300,
                top : 10,
                marginLeft : 40
            }
        }>
            <h3>{data?.user1?._id === userId ?data.nameRoom ||  data?.user2?.fullName : data.nameRoom || data?.user1?.fullName || "User"}</h3>
        </div>
        <div style={{
            position : "absolute",
            bottom : 0,
            width : 200
        }}>
            <p>dang lam gi the</p>
        </div>
    </div>
  )
}

export default ROOMS