import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import NAVBARVIDEO from './components/navbar/index'
import LISTVIDEO from './components/content/listvideo'
import { io } from 'socket.io-client'

const socket = io.connect(process.env.REACT_APP_SOCKET)

const cx = classNames.bind(styles)
const WATCH = () => {
  useEffect(() => {
    socket.emit("leave_all_room")
    return () => {
        socket.emit("leave_all_room")
    }
}, [])
  return (
    <div className={cx("wrapper")}>
      <NAVBARVIDEO />
      <div className={cx("content_video")}>
        <LISTVIDEO />
      </div>
    </div>
  )
}

export default WATCH