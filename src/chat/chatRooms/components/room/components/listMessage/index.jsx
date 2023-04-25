import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./listrm.module.scss"
import { io } from 'socket.io-client'
import { format } from "timeago.js"
import { RiChatDeleteLine } from "react-icons/ri"

const {token} = sessionStorage
const socket = io.connect(process.env.REACT_APP_SOCKET, {
    query : {
        token
    }
})
const cx = classNames.bind(styles)

const LISTMESS = ({id, data}) => {

    const [checkShowMess , setCheckShowMess] = useState(true)
    const { userId} = sessionStorage
    
    useEffect(() => {
        socket.on("remove_message_success", (cmt) => {
            if (data._id === cmt) {
                setCheckShowMess(false)
                return 1
            }
        })
    }, [socket])

    useEffect(() => {
        console.log(data);
    }, [])
  return (
    <>
        {checkShowMess ? <div id={cx(id)} className={cx("ls_ms")}>
            <div style={
                {
                    height : "auto",
                    width : "auto",
                    minHeight : 60,
                    color : "wheat",
                    minWidth : 300,
                    marginLeft : 20,
                    position : "relative"
                }
            }>
                <div id={cx(id)} className={cx("info_user_mess")}>
                    <div><img id={cx(id)} className={cx("avt_user")} 
                    src={data?.userId?.avatar || 'https://tse4.mm.bing.net/th?id=OIP.AIEHY57YvBM9ZqYJgOCzjwAAAA&pid=Api&P=0'} /></div>
                    {id === "OTHER" && <div style={{
                        marginLeft : 20
                    }}><p>{data?.userId?.fullName || "User"}</p></div>}
                    {data?.userId?._id === userId && <p
                    
                    onClick={() => {
                        socket.emit("user_remove_message", { id : data._id , idRoom : data.idRoom })
                    }}
                    ><RiChatDeleteLine id={cx(id)} className={cx("icon_dlt")} /></p>}
                </div>
                <div id={cx(id)} className={cx("mess_true")}>
                    <p style={
                        {
                            marginLeft : 20,
                            marginRight : 20
                        }
                    }>{data.text}</p>
                    
                </div>
                <div id={cx(id)} className={cx("time_ago")}>
                    <p id={cx(id)} className={cx("site_time")}>{format(data.createdAt)}</p>
                    
                </div>
            </div>
        </div> : <Fragment />}
    </>
  )
}

export default LISTMESS