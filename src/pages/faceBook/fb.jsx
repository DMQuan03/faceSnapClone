import React, { useEffect, useState } from 'react'
import HEADERSEARHUSER from '../../searchUser/components/header/header'
import { io } from 'socket.io-client'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const {token} = sessionStorage
const socket = io.connect("http://localhost:3456", {
  query : {
    token
  }
})

const FACEBOOK = ({children}) => {

  const navigate = useNavigate()
  const [checkLogin , setCheckLogin] = useState(false)
  const [infoUser , setInfoUser] = useState([])
  const {token} = sessionStorage
  useEffect(() => {
    axios({
        method : "get",
        url : process.env.REACT_APP_API2,
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then(res => {
      setInfoUser(res.data.user)
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
  
  useEffect(() => {
    socket.on("alert_mess", (cmt) => {
      alert(1)
        if (infoUser.roomChats.includes(cmt.idRoom)) {
            return 1
        }else {
            return 0
        }
    })
}, [socket])

  return (
    <>
      {checkLogin && <div>
          <HEADERSEARHUSER />
          {children}
      </div>}
    </>
  )
}

export default FACEBOOK