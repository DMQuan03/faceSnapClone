import React from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import { io } from 'socket.io-client'
import axios from 'axios'
const {token} = sessionStorage
const socket = io.connect(process.env.REACT_APP_SOCKET, {
    query : {
        token
    }
})
const cx = classNames.bind(styles)

const LISTAWAIT = ({data}) => {

    const addFrOk = () => {
        socket.emit("add_Friend", { userId : data._id })
    }
    const noAdd = () => {
        axios({
            method : "put",
            url : process.env.REACT_APP_BASE_URL + "/user/noaddfriend/" + data._id,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
    }
  return (
    <div className={cx("wrapper")}>
        <div style={
            {
                width : "100%",
                minHeight : 200,
                maxHeight : 200 ,
                backgroundColor : "white",
                borderTopLeftRadius : 10,
                borderTopRightRadius : 10,
                display : 'flex',
                justifyContent : "center",
                alignItems  :"center",
                textAlign : "center",
                position : "relative"
            }
        }>
            <img style={
                {
                    width : "100%",
                    height : "100%",
                    position : "absolute",
                    top : 0,
                    bottom : 0,
                    borderTopLeftRadius : 10,
                    borderTopRightRadius : 10
                }
            } src={data?.avatar || ""} />
        </div>
        <div style={
            {
                width : "100%",
                height : "auto",
                minHeight : 50,
                backgroundColor : '#fff',
                display : 'flex',
                justifyContent : "flex-start",
                textAlign  :"start",
                overflow : 'hidden'
            }
        }>
            <p style={{
                marginLeft : 10,
                fontWeight : 600
            }}>{data.fullName || "user"}</p>
        </div>
        <div style={
            {
                width : "100%",
                height : 41,
                display :"flex",
                justifyContent : "center",
                alignItems : "center",
                textAlign : "center"
            }
        }>
            <button 
            onClick={addFrOk}
            style={
                {
                    width : "90%",
                    height : "80%",
                    borderRadius : 10,
                    border : "none",
                    outline : "none",
                    backgroundColor : "#1b74e4",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    textAlign : "center"
                }
            }><p style={
                {
                    fontWeight : 700,
                    color : "white"
                }
            }>Xác nhận</p></button>
        </div>
        <div style={
            {
                width : "100%",
                height : 41,
                display :"flex",
                justifyContent : "center",
                alignItems : "center",
                textAlign : "center"
            }
        }>

            <button 
            onClick={noAdd}
            style={
                {
                    width : "90%",
                    height : "80%",
                    borderRadius : 10,
                    border : "none",
                    outline : "none",
                    borderBottomLeftRadius : 10,
                    borderBottomRightRadius : 10,
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    textAlign : "center"
                }
            }><p style={
                {
                    fontWeight : 700
                }
            }>Xóa</p></button>
        </div>
    </div>
  )
}

export default LISTAWAIT