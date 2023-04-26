import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./chatroom.module.scss"
import NAYBARCHAT from './components/navbar/nav'
import INFOROOMCHAT from './components/room/room'
import { io } from 'socket.io-client'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const { token } = sessionStorage
const socket = io.connect(process.env.REACT_APP_SOCKET, {
  query : {
    token
  }
})

const cx = classNames.bind(styles)

const CHATROOM= () => {

  const navigate = useNavigate()
  const {token} = sessionStorage
  const [checkLogin , setCheckLogin] = useState(false)

  useEffect(() => {
    axios({
        method : "get",
        url : process.env.REACT_APP_BASE_URL + '/user/currentuser/',
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then(res => {
      setCheckLogin(true)
        return 1
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
    <>
      {checkLogin && <div className={cx("CHAT_wrapper")}>
          <div className={cx("CHAT_navbar")}>
              <NAYBARCHAT />
          </div>
          <div className={cx("CHAT_info")}>
              <INFOROOMCHAT />
          </div>
      </div>}
    </>
  )
}

export default CHATROOM