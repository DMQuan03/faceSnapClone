import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./lsr.module.scss"
import ROOMS from './rm'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import chatSlice from '../../../../redux/slice/chatSlice'

const cx = classNames.bind(styles)

const LISTROOM = () => {
  const { token } = sessionStorage

  const [listRoom , setListRoom] = useState([])

 
  useEffect(() => {
    axios({
      method : "get",
      url : process.env.REACT_APP_API2,
      headers : {
        authorization : `Bearer ${token}`
      }
    })
    .then(res => {
      setListRoom(res.data.user.roomChats);
    })
    .catch(err => {
      console.log(err.message);
    })
  }, [])
  return (
    <div style={
      {
        position : 'absolute',
        height : "76.7%",
        width : "99.7%"
      }
    }>
      <div className={cx("lsr_wrapper")}>
          {listRoom?.map((rm) => {
              return <ROOMS key={rm._id} data={rm} />
          })}
      </div>
      
    </div>
  )
}

export default LISTROOM