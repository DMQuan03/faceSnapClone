import React, { Fragment, useEffect, useRef, useState } from 'react'
import { format } from 'timeago.js'
import {
    MdPreview
} from "react-icons/md"
import {
    BiShareAlt,
    BiEditAlt
}from "react-icons/bi"
import {
    AiOutlineComment,
    AiOutlineHeart
}from "react-icons/ai"
import {
    FcLike
}from "react-icons/fc"
import {
    RiDeleteBin5Line,
    RiDeleteBin5Fill
} from "react-icons/ri"
import {
    TbMessageCircleOff
}from "react-icons/tb"
import axios from 'axios'

import ScrollToBottom from "react-scroll-to-bottom"
import { Col } from 'antd'
import VIDEOSHOW from '../chat/video'
import {io} from "socket.io-client"
const { token } = sessionStorage

var socket = io.connect(process.env.REACT_APP_SOCKET, {
    query : {
        token : token
    }
})



const VIDEO = ({data}) => {

    const {userId, token } = sessionStorage
    const [likes , setLikes] = useState([])

    const [check , setCheck] = useState(true)
    const [showCmtofVideo , setShowCmtOfCmt] = useState(false)
    const [checkDeleteSuccess , setCheckSuccess ] = useState(false)
    const [answerDelete , setAnswerDelete ] = useState(false)
    const [checkEditVideo , setCheckEdtVideo ] = useState(false)
    const [checkdeleteCmtVideo , setCheckDeleteCmtVideo ] = useState(false)

    const [onlyVideo , setOnlyVideo] = useState([])
    const [listCmtofVideo , setListCmtOfVieo] = useState([])
    const [textCmt , setTextCmt] = useState("")
    const [titleEdit , setTitleEdit] = useState("")
    const [VideoEdit , setVideoedit] = useState("")

    const myRef = useRef()

    

    const handleLike = () => {
        axios({
          method : "put",
          url : process.env.REACT_APP_API13 + data._id,
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        .then(res => {
            setLikes(likes + 1)
        })
        .catch(err => {
          console.log(err);
        })
      }
    
      const handleDislike = () => {
        axios({
          method : "put",
          url : process.env.REACT_APP_API12 + data._id,
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        .then(res => {
            setLikes(likes - 1)
        })
        .catch(err => {
          console.log(err);
        })
      }


      useEffect(() => {
        setLikes(data.likes)
      }, [])

    const handleDeleteVideo = () => {
      axios({
        method : "delete",
        url : process.env.REACT_APP_API22 + data._id,
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      .then(res => {
        setAnswerDelete(false)
        setCheckSuccess(true)
      })
      .catch(err => {
        console.log(err.message);
      })
    }

    const handleEditVideo = () => {
      axios({
        method : "patch",
        url : process.env.REACT_APP_API23 + data._id,
        data : {
          title : titleEdit,
          video : VideoEdit
        },
        headers : {
          authorization : `Bearer ${token}`
        }
      })
      .then(res => {
        setCheckEdtVideo(false)
      })
      .catch(err => {
        console.log(err.message);
      })
    }
    
    const handleUserCommentVideo = () => {
        socket.emit("user_comment_video", { text : textCmt, idVideo : data._id})
        myRef.current.focus()
        setTextCmt("")
    }

    useEffect(() => {
        socket.on("sever_return_comment_video", (data) => {
            setListCmtOfVieo(prev => [...prev , data])
        })
    }, [socket])
    const handleGetComment = () => {
        socket.emit("getCMTVideo", {videoId : data._id})
     }

     const handleJoinRoom = () => {
        socket.emit("join_room", {id : data._id})
     }

     useEffect(() => {
        socket.on("serer_return_commented_video", (data) => {
            setListCmtOfVieo(data.comment)
            setOnlyVideo(data)
        })
     }, [socket])


   

   
  return (
    <div className='wrapper_video'>
        <div style={{
            display :"flex",
            justifyContent : "flex-start",
            height : 80
        }}>
            <img style={
                {
                    width : 50,
                    height : 50,
                    borderRadius
                     : "50%",
                    position : "absolute",
                    top : 10,
                    left : 20
                }
            } src={data?.userId?.avatar || 'https://tse3.mm.bing.net/th?id=OIP.17_SWxBNo9THUtD8M_n-ZwAAAA&pid=Api&P=0'} alt='' />
            <p style={
                {
                    maxWidth : "300px",
                    position : "absolute",
                    display : "flex",
                    justifyContent : "flex-start",
                    left : 90,
                    top : 0,
                    height : "20px",
                    width : "auto"
                }
            }>{data?.userId?.fullName || "user"}</p>
            <p style={
                {
                    position : "absolute",
                    minWidth : 100,
                    top : 22,
                    left: 90,
                    display : "flex",
                    maxWidth : 150,
                    width : "auto",
                    justifyContent : "flex-start"
                }
            }>{format(data?.createdAt) || "just now"}</p>
            {/* edit video */}
            {data.userId._id === userId ? <p
            onClick={() => {
              setCheckEdtVideo(true)
            }}
            style={
              {
                position : "absolute",
                right : 70,
                top : 12,
                cursor :"pointer"
              }
            }>
              <BiEditAlt
              style={
              {
                width : 20,
                rotate : "90deg",
                height : 20
              }
            }
              />
            </p> 
            :
            <Fragment/>
            }
            {checkEditVideo ? <div style={
              {
                position : "fixed",
                top : 0,
                bottom : 0,
                right : 0,
                left : 0,
                backdropFilter : "blur(15px)",
                display : "flex",
                justifyContent :"center",
                alignItems : "center",
                zIndex : 10000
              }
            }>
              <div style={
                {
                  position : 'relative',
                  width : "400px",
                  height : "300px",
                  backgroundColor : "black",
                  borderRadius : 20,
                  color : "wheat"
                }
              }>
                <h2>EDIT VIDEO</h2>
                <span>Title</span>
                <div>
                  <input value={titleEdit} placeholder='edit title' onChange={(e) => {
                    setTitleEdit(e.target.value)
                  }} />
                </div>
                <span>video</span>
                <div>
                  <input value={VideoEdit} placeholder='edit video' onChange={(e) => {
                    setVideoedit(e.target.value)
                  }} />
                </div>
                <div style={
                  {
                    marginTop : 20
                  }
                }>
                  <button
                  onClick={handleEditVideo}
                  >Edit</button>
                  <button onClick={() => {
                    setCheckEdtVideo(false)
                  }}>Close</button>
                </div>
              </div>
            </div> : <Fragment/>}
            {/* edit video */}

            {/* delete Video */}
            {data?.userId?._id === userId ? checkDeleteSuccess ? 
              <p className='check_delete_video' style={
              {
                position : "absolute",
                right : 40,
                top : 12,
                color : "#8fdd15"
              }
            }><RiDeleteBin5Fill
            style={
              {
                width : 20,
                rotate : "90deg",
                height : 20
              }
            }
             /></p>
            :
            <p
            onClick={() => {
              setAnswerDelete(true)
            }}
             style={
              {
                position : "absolute",
                right : 40,
                top : 12,
                cursor : "pointer"
              }
            }><RiDeleteBin5Line
            style={
              {
                width : 20,
                rotate : "90deg",
                height : 20
              }
            }
             /></p>
             :
             <Fragment />
            }

            {/* delete Video */}
            {answerDelete ? <div style={
              {
                position : "fixed",
                backdropFilter : "blur(3px)",
                zIndex : 10000,
                top: 0,
                right : 0,
                left : 0,
                bottom : 0,
                display : "flex",
                justifyContent : "center",
                alignItems : "center",
                textAlign : "center"
              }
            }>
              <div
              style={
                {
                  width : 400,
                  height : 100,
                  backgroundColor : "black",
                  borderRadius : 20,
                  border : "1px solid #fff",
                  position : "relative",
                }
              }
              >
                <h2 style={
                  {
                    position : "absolute",
                    top : 0,
                    marginLeft : 30
                  }
                }>Bạn chắc chắn muốn xóa chứ ?</h2>
                <div style={
                  {
                    position : "absolute",
                    bottom : 10,
                    display : "flex",
                    justifyContent : "center",
                    width : "100%"
                  }
                }>
                  <button
                  onClick={() => {
                    handleDeleteVideo()
                  }}
                  style={
                    {
                      marginRight : 10,
                      backgroundColor : "red",
                      color : "wheat",
                      border : "none",
                      borderRadius : 20,
                      fontWeight : 600,
                      cursor : "pointer"
                    }
                  }>YES</button>
                  <button
                  onClick={() => {
                    setAnswerDelete(false)
                  }}
                  style={
                    {
                      border : "none",
                      background : "#1d7fdd",
                      color : "wheat",
                      borderRadius : 20,
                      width : 40,
                      fontWeight : 600,
                      cursor : "pointer"
                    }
                  }>NO</button>
                </div>
              </div>
            </div> : 
            <Fragment />
            }
        </div>
        <div style={{
            height : "auto",
            marginLeft : 60,
            width : "80%",
            display : "flex",
            justifyContent : "flex-start",
            alignItems : "center",
            backgroundColor : "#444",
            borderRadius : 20,
            padding : 10,
            boxSizing : "border-box"
        }}>
            <p>{data?.title}</p>
        </div>
        <div
         style={
            {
                width : "100%",
                height : 530,
            }
        }>
            <iframe width="560" height="415" style={{
                marginTop : 20,
                borderRadius : 20
            }}  src={  `https://www.youtube.com/embed/${data.video}` || "https://www.youtube.com/embed/m80hv6LCNy0"} title="YouTube video player" frameborder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
        
        <div style={
            {
                display : "flex",
                justifyContent  : "space-around",
                height : 40,
                position : "absolute",
                bottom : 20,
                marginLeft: 20,
                width : "100%",
                textAlign : "center",
                alignItems : "center",
                padding : 20,
                boxSizing : "border-box"
            }
        }>

            {/* like */}
            {!data?.userLikes?.includes(userId) ?  check ? <div style={{display : "flex"}} onClick={() => { handleLike()
        setCheck(false) }}>
        
          {!data?.userLikes?.includes(userId) ?  <AiOutlineHeart style={{rotate : "90deg", width : 20, height : 20 , marginTop : -5}} /> : <FcLike style={{rotate : "90deg", width :230, height :230}} />}<p style={{marginLeft : 30, marginTop : -3, position : "absolute"}}>{likes || 0}</p>
        </div> 
        : 
        <div style={{display : "flex"}} onClick={() => {handleDislike() 
        setCheck(true)
        }}>
          {!data?.userLikes?.includes(userId) ? <FcLike style={{rotate : "90deg", width : 22, height : 22, marginTop : -5 }} /> : <AiOutlineHeart style={{rotate : "90deg", width : 20, height : 20}} /> }<p style={{marginLeft : 30, marginTop : -3, position : "absolute"}}>{likes || 0}</p>
          
        </div> :
        check ? <div style={{display : "flex"}} onClick={() => { handleDislike()
        setCheck(false)
         }}>
        
          {data?.userLikes?.includes(userId) ?  <FcLike style={{rotate : "90deg", width : 22, height : 22, marginTop : -5}} /> : <AiOutlineHeart style={{rotate : "90deg", width :20, height :20}} />}<p style={{marginLeft : 30, marginTop : -3, position : "absolute"}}>{likes || 0}</p>
        </div> 
        : 
        <div style={{display : "flex"}} onClick={() => {handleLike()
        setCheck(true)}}> 
          {data?.userLikes?.includes(userId) ? <AiOutlineHeart style={{rotate : "90deg", width : 22, height : 22, marginTop : -5}} /> : <FcLike style={{rotate : "90deg", width : 20, height : 20}} /> }<p style={{marginLeft : 30, marginTop : -3, position : "absolute"}}>{likes || 0}</p>
          
        </div>
        }

            <div style={
                {
                    width : "20%",
                    maxWidth : "20%",
                    display : "flex",
                    marginLeft : 20,
                    justifyContent : "center",
                    alignItems : "center",
                    color : "#8fdd15"
                }
            }><AiOutlineComment
            onClick={() => {
                handleGetComment()
                setShowCmtOfCmt(true)
                handleJoinRoom()
            }}
             style={
                {
                    rotate : "90deg",
                    width : 20,
                    height : 30,
                    marginRight : 10,
                    cursor : "pointer"

                }
            } /><p>{data?.comment?.length || 0}</p></div>
            <div style={
                {
                    width : "20%",
                    maxWidth : "20%",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center"
                }
            }><MdPreview style={
                {
                    rotate : "90deg",
                    width : 20,
                    height : 30,
                    marginRight : 10,
                    color : "#1d7fdd"
                }
            } /><p>{data.views || 0}</p></div>
            <div style={
                {
                    width : "20%",
                    maxWidth : "20%",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                }
            }><BiShareAlt style={
                {
                    rotate : "90deg",
                    width : 20,
                    height : 30,
                    marginRight : 10,
                    cursor : "pointer"
                }
            } /><p>{data.shares || 0}</p></div>
        </div>
        
          {showCmtofVideo && 

          <div className={("wrapperasd")}>
            <div className={("info_video")}>
            <iframe width="100%" height="100%" style={{
                    }}  src={ `https://www.youtube.com/embed/${onlyVideo.video}` ||"https://www.youtube.com/embed/m80hv6LCNy0"} frameborder={0} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>

            </div>
            <div className={("show_cmt")}>
            <ScrollToBottom className='scr_bt'>
                {listCmtofVideo?.map((cm) => {
                  return <VIDEOSHOW key={cm._id} data={cm} idVideo={data._id} />
                })}
            </ScrollToBottom>
        <div className={"input_cmt"}>
        <button onClick={() => {
          setShowCmtOfCmt(false)
        }}>go back</button>
        <img />
        <input ref={myRef} value={textCmt} placeholder='bạn đang nghĩ gì ...' onChange={(e) => {
            setTextCmt(e.target.value)
        }} />
        <input type='submit' onClick={() => {
            handleUserCommentVideo()
        }} />
      </div>
      </div>
    </div>}
    
    </div>
  )
}

export default VIDEO

