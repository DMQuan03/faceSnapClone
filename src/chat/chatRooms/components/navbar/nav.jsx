import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./navchat.module.scss"
import INFOUSERCHAT from '../infouserchat'
import {
    CiUser
}from "react-icons/ci"
import {
    BiArrowBack
}from 'react-icons/bi'
import {
    AiOutlineUsergroupAdd
}from "react-icons/ai"
import LISTROOM from '../ListRoom/listroom'
import { useDispatch, useSelector } from 'react-redux'
import chatSlice from '../../../../redux/slice/chatSlice'
import axios from 'axios'

const cx = classNames.bind(styles)

const NAYBARCHAT = () => {
    const { token } = sessionStorage
    const dispatch = useDispatch()
    const checkAddRoom = useSelector(state => state.chat.checkAddRoom)
    const [nameRoom , setNameRoom] = useState("")
    const [addRoomSuccess , setAddRoomSuccess] = useState(false)

    const handleAddGroup = () => {
        axios({
            method : "post",
            url : "http://localhost:3456/api/room/addgroup",
            data : {
                nameRoom
            },
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            setAddRoomSuccess(true)
            dispatch(chatSlice.actions.checkAddRoom(false))
            setTimeout(() => {
                setAddRoomSuccess(false)
            }, 4000);
        })
        .catch(err => {
            console.log(err.message);
            return 0
        })
    }
  return (
    <div>
        <INFOUSERCHAT />
        <div className={cx("select_nav")}>
            <nav 
            onClick={() => {
                dispatch(chatSlice.actions.checkAddRoom(false))
            }}
            ><CiUser className={cx("icons_nav_chat")} /></nav>
            <nav 
            onClick={() => {
                dispatch(chatSlice.actions.checkAddRoom(true))
            }}
            ><AiOutlineUsergroupAdd  className={cx("icons_nav_chat")}/></nav>
        </div>
        <LISTROOM />
        {addRoomSuccess && <div style={
            {
                position : "fixed",
                width : 300,
                height : 50,
                color : "wheat",
                background : "#465d26",
                zIndex : 100000000000000000000000,
                marginTop : -700,
                marginLeft : 920,
                display :"flex",
                justifyContent : "center",
                textAlign : "center",
                alignItems : "center",
                borderRadius : 20
            }
        }><h2>create success</h2></div>}
        {checkAddRoom && <h1 style={
            {
                position : "fixed",
                top : -20,
                left : 0,
                right : 0,
                bottom : -22,
                zIndex : 10000000000000,
                display : "flex",
                justifyContent : "center",
                textAlign : "center",
                alignItems : "center"
            }
        }>
            <div style={
                {
                    width : 400,
                    height : 100,
                    backgroundColor : '#7d4848',
                    position : "relative",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    textAlign : 'center',
                    borderRadius : 20,
                    color : "wheat"
                }
            }>
                <h4 style={
                    {
                        position : "absolute",
                        top : -40
                    }
                }>Create Group</h4>
                <BiArrowBack
                onClick={() => {
                    dispatch(chatSlice.actions.checkAddRoom(false))
                }}
                style={
                    {
                        position : "absolute",
                        color : "wheat",
                        width : 40,
                        height : 40,
                        rotate : "90deg",
                        right : 20,
                        top : 10
                    }
                }>
                </BiArrowBack>
                    <input style={
                        {
                            marginTop : 30
                        }
                    } placeholder='create room' value={nameRoom} onChange={(e) => {
                        setNameRoom(e.target.value)
                    }} />
                    <button  style={
                        {
                            marginTop : 30
                        }
                    } onClick={handleAddGroup} >create</button>
                    
            </div>
        </h1>}
        <div style={
              {
                  position : 'absolute',
                  height : 76,
                  width : '99.7%',
                  backgroundColor : "#171717",
                  bottom : 0,
                  borderRight : "1px solid #fff"
              }
          }>
            <h2 style={
              {
                color : 'wheat',
                marginTop : 10
              }
            }>Message of FaceSnap</h2>
            <p style={
              {
                marginTop : -20,
                color :"wheat"
              }
            }>Welcome to FaceSnap</p>
          </div>
    </div>
  )
}

export default NAYBARCHAT