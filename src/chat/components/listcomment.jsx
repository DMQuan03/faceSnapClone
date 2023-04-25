import React, { Fragment, useEffect, useState } from 'react'
import "./lscmt.css"
import {BsReplyAll} from "react-icons/bs"
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import {TbMessageCircleOff} from "react-icons/tb"
import { format } from 'timeago.js'
import { io } from 'socket.io-client'

const {token} = sessionStorage

const socket = io.connect("http://localhost:3456", {
    query : {
        token : token
    }
})

const LISTCOMMENT = ({data, idBlog}) => {

    const [check , setCheck] = useState(true)
    const [checkDelete , setCheckDelete] = useState(false)
    useEffect(() => {
        socket.on("remove_comment_success", (cmt) => {
          if (data._id === cmt) {
            setCheckDelete(false)
            setCheck(false)
          }
        })
      }, [socket])
  return (
    <>
        {check ? <div className='wrapper_lscmt'>
            <div className='infoUser_cmt'>
            <img style={{
                  width : 40,
                  height : 40,
                  borderRadius : "50%",
                  position : "absolute",
                  left : 20,
                  top : 5
                  }} src={data?.userId?.avatar || "https://tse3.mm.bing.net/th?id=OIP.17_SWxBNo9THUtD8M_n-ZwAAAA&pid=Api&P=0" } alt='' />
                <div style={{
                    marginLeft : 75,
                    display : "flex",
                    justifyContent : "flex-start",
                    width : 180,
                    maxWidth : 200
                }}><p style={{marginTop : 2}}>{data?.userId?.fullName || "User"}</p>
                <p style={{position : "absolute", marginTop : 20}}>{format(data?.createdAt )|| "just now"}</p></div>
               
            </div>
            <div style={{
                backgroundColor : "wheat",
                width : "auto",
                maxWidth : 400,
                minWidth : 100,
                marginTop : 10,
                overflow : "hidden",
                height : "auto",
                minHeight : 50,
                marginLeft : 25,
                color : "black",
                display : "flex",
                justifyContent : "flex-start",
                borderRadius : 20,
                padding : 10,
                position : "relative",
                boxSizing : "border-box"
            }}>
    
                <p style={{
                    marginLeft : 20,
                    marginRight : 20
                }}>{data.text}</p>
            </div>
            <div style={{
                display : "flex",
                justifyContent : "flex-start",
                width : 100,
                position : "absolute",
            }}>
                <div style={{
                    rotate : "90deg",
                    width : 20,
                    height : 20,
                    marginLeft : 45,
                    marginTop : 5
                }}><AiOutlineLike style={{width : 20 , height : 20}} /></div>
                <div style={{
                    rotate : "90deg",
                    width : 20,
                    height : 20,
                    marginLeft : 5,
                    marginTop : 5
                }}><TbMessageCircleOff style={{width : 20 , height : 20}}
                onClick={() => {
                    setCheckDelete(true)
                    
                }}
                /></div>
                <div style={{
                    rotate : "90deg",
                    width : 20,
                    height : 20,
                    marginLeft : 5,
                    marginTop : 5
                }}><BsReplyAll style={{width : 20 , height : 20}} /></div>
            </div>
        </div> : <Fragment />}
        {checkDelete ? <div style={
            {
                position : "fixed",
                top : 0,
                left : 0,
                right : 0,
                bottom : 0,
                display : "flex",
                justifyContent : "center",
                alignItems :"center",
                textAlign : "center",
                zIndex : 100000
            }
        }>
            <div style={
                {
                    width : 300,
                    height : 150,
                    borderRadius : 10,
                    backgroundColor : "black",
                    overflow : "hidden",

                }
            }>
                <h2 style={
                    {
                        cursor : "no-drop",
                        color : "wheat"
                    }
                }>bạn chắc chắn muốn xóa commnet này chứ ?</h2>
                <div style={
                    {
                        width : "100%",
                        display : "flex",
                        justifyContent : "space-around",
                        height : 40,
                        alignItems : "center",
                    }
                }>
                    <button
                    onClick={() => {
                        socket.emit("remove_comment", { id : data._id, idBlog : idBlog})
                    }}
                     style={
                        {
                            width : 80,
                            borderRadius : 20,
                            border : "none",
                            color : "wheat",
                            backgroundColor :"red",
                            fontWeight : 700,
                            cursor : "no-drop"
                        }
                    }>Yes</button>
                    <button
                    onClick={() => {
                        setCheckDelete(false)
                    }}
                    style={
                        {
                            width : 80,
                            borderRadius : 20,
                            border : "none",
                            color : "black",
                            backgroundColor : "#8fdd15",
                            fontWeight : 700
                        }
                    }>No</button>
                </div>
            </div>
        </div> : <Fragment />}
    </>
  )
}

export default LISTCOMMENT