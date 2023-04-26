import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import chatSlice from '../../../../../redux/slice/chatSlice'
import axios from 'axios'
import { Col } from 'antd'
const {token} = sessionStorage
const socket = io.connect(process.env.REACT_APP_SOCKET, {
    query : {
        token
    }
})


const HEADERROOM = ({data}) => {
    const dispatch = useDispatch()
    const { userId } = sessionStorage
    const [avatarRooms , setAvatarRoom ] = useState("")
    const [nameRooms , setNameRoom ] = useState("")
    const [searchUserTrue , setSearchUserTrue] = useState('')
    const [searchText , setSearchText] = useState('')
    const [idUserAdd , setIdUserAdd] = useState('')
    const [nameUserAdd , setNameUserAdd] = useState('')
    const [nameRoomText , setNameRoomText] = useState('')
    const [themesText , setThemesText] = useState('')
    const [ImageText , setImageText] = useState('')
    const [infoRoom , setInfoRooms ] = useState(false)
    const [listUserCanAdd , setListUserCanAdd ] = useState(false)
    const [editRooms , setEditRooms ] = useState(false)
    const [adminGroup , setAdminGroup ] = useState(false)
    const [listMembersCheck , setListMembersCheck ] = useState(false)
    const [listUser , setListUser ] = useState([])
    const [listMember , setListMember ] = useState([])
    const [limits , setLimit] =useState(5)
    const room = useSelector(state => state.chat.infoRoom)
    
    useEffect(() => {
        if (data[0]?.user1?._id === userId) {
            setAvatarRoom(data[0]?.user2?.avatar)
            setNameRoom(data[0]?.user2?.fullName)
        }else {
            setAvatarRoom(data[0]?.user1?.avatar)
            setNameRoom(data[0]?.user1?.fullName)
        }
    }, [data])

    useEffect(() => {
        setListMember(room.members)
    }, [data])

    useEffect(() => {
        console.log(listMember);
    }, [data])

   const handleOutRoom = () => {
    axios({
        method : "post",
        url : "http://localhost:3456/api/room/outroom",
        data : {
            RoomId : room._id
        },
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then((res) => {
        dispatch(chatSlice.actions.infoRoom({}))
        dispatch(chatSlice.actions.listMessages([]))
    })
    .catch(err => {
        console.log(err.message)
    })
   }

   useEffect(() => {
    console.log(data);
   }, [data])

   const handleDeleteRoom = () => {
    axios({
        method : "delete",
        url : "http://localhost:3456/api/room/deleteroom/" + room._id,
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then((res) => {
        dispatch(chatSlice.actions.infoRoom({}))
        dispatch(chatSlice.actions.listMessages([]))
    })
    .catch(err => {
        console.log(err.message)
    })
   }


   useEffect(() => {
    axios({
      method : "get",
      url : process.env.REACT_APP_BASE_URL + '/user/searchuser?q=' + searchUserTrue + "&limit=" + limits,
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
    .then(res => {
      setListUser(res.data.data)
    })
  }, [searchUserTrue, limits])

  const handleSearchUser = () => {
    setSearchUserTrue(searchText)
  }

  const handleAddUser = () => {
    axios({
        method : "put",
        url : process.env.REACT_APP_BASE_URL + "/room/addusertoroom/" + room._id,
        data : {
            userId : idUserAdd
        },
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then(res => {
        setIdUserAdd("")
        setNameUserAdd("")
        setListUserCanAdd(false)
        setInfoRooms(false)
    })
    .catch(err => {
        console.log(err.message);
    })
  }

  const handleEditRoom =() => {
    axios({
        method : "put",
        url : process.env.REACT_APP_BASE_URL + "/room/updateroom/" + room._id,
        data : {
            nameRoom : nameRoomText,
            themes : themesText,
            avatarRoom : ImageText
        },
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then(res => {
        setEditRooms(false)
        setInfoRooms(false)
        setImageText("")
        setNameRoomText("")
        setThemesText("")
    })
    .catch(err => {
        console.log(err);
    })
  }

  const handleBlockUserChat = (mbId) => {
    axios({
        method : "put",
        url : process.env.REACT_APP_BASE_URL + "/room/blockchatuser/" + room._id,
        data : {
            userId : mbId
        },
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then(res => {
        console.log(1);
        return 1
    })
    .catch(err => {
        console.log(0);
        return 0
    })
  }

  const handleUnblockChatUser = (mbId) => {
    axios({
        method : "put",
        url : process.env.REACT_APP_BASE_URL + "/room/unblockchatuser/" + room._id,
        data : {
            userId : mbId
        },
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then(res => {
        console.log(1)
        return 1
    })
    .catch(err => {
        console.log(0);
        return 0
    })
  }
 

  const handleCheckAdmin = (userId) => {
    axios({
        method : "put",
        url : process.env.REACT_APP_BASE_URL + "/room/admingroup/" + room._id,
        data : {
            userId
        },
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then(res => {
        console.log("admin success");
    })
    .catch(err => {
        return 0
    })
  }
  return (
    <div style={
        {
            width : "100%",
            height : 80,
            backgroundColor : "#171717",
            display : "flex",
            justifyContent : "center",
            alignItems : "center",
            textAlign : "center",
            position : "absolute",
            color : "wheat",
            zIndex: 1000000000000
        }
    }>
        <div
        onClick={() => {
            setInfoRooms(true)
        }}
         style={
            {
                position : "absolute",
                left : 20
            }
        }>
            <img style={
                {
                    width : 60,
                    height : 60,
                    borderRadius : "50%",
                    left : 20
                }
            } src={ room?.avatarRoom || avatarRooms|| 'https://tse1.mm.bing.net/th?id=OIP.vR3c8gJDtTZuFFJLa3nHcwHaHC&pid=Api&P=0'} alt='' />
        </div>
        <div style={
            {
                position : "absolute",
                display : "flex",
                justifyContent : "flex-start",
                alignItems : "center",
                textAlign : "center",
                left : 150,
                fontWeight : 700,
                fontSize : "1.6rem"
            }
        }>
            <p>{ data[0]?.nameRoom ? data[0]?.nameRoom : nameRooms || "room"}</p>
        </div>
        <div style={
            {
                display : "flex",
                justifyContent :"space-around",
                alignItems : "center",
                position : "absolute",
                right : 20
            }
        }>
            <div><img style={
                {
                    width : 50,
                    height : 50,
                    borderRadius : "50%"
                }
            } src={data[0]?.user1?.avatar || 'https://tse1.mm.bing.net/th?id=OIP.vR3c8gJDtTZuFFJLa3nHcwHaHC&pid=Api&P=0'} alt='a' /></div>
            {data[0]?.members?.length >= 2 && <div><img style={
                {
                    width : 50,
                    height : 50,
                    borderRadius : "50%"
                }
            } src={ data[0]?.members[1]?.avatar || data[0]?.user2?.avatar || 'https://tse1.mm.bing.net/th?id=OIP.vR3c8gJDtTZuFFJLa3nHcwHaHC&pid=Api&P=0'} alt='a' /></div>}
            {data[0]?.members?.length >= 3 && data[0].description === "group" && <div><img style={
                {
                    width : 50,
                    height : 50,
                    borderRadius : "50%"
                }
            } src={data[0]?.members[2]?.avatar ||  'https://tse1.mm.bing.net/th?id=OIP.vR3c8gJDtTZuFFJLa3nHcwHaHC&pid=Api&P=0'} alt='' /></div>}
            {data[0]?.members?.length >= 4 && data[0].description === "group" && data[0].description === "group" && <div
            style={
                {
                    width : 50,
                    height : 50,
                    borderRadius : "50%",
                    backgroundColor : "gray",
                    display : "flex",
                    justifyContent : 'center',
                    alignItems : "center",
                }
            }
            >
                <p>+{data[0]?.members?.length - 3 || 0}</p>
            </div>}
        </div>
        {infoRoom && <div style={
            {
                position : "fixed",
                top : 0,
                bottom : 0,
                right : 0,
                left : 0,
                zIndex : 100000,
                display : "flex",
                justifyContent : "center",
                alignItems :"center",
                textAlign : "center"
            }
        }>
            <div style={
                {
                    width : 400,
                    height : 250,
                    backgroundColor : "#1c1a1a",
                    position : "relative",
                    borderRadius : 20
                }
            }>
                <div style={
                    {
                        position : "relative",
                        height : 70,
                        backgroundColor : "#664949",
                        width : "100%",
                        display : "flex",
                        justifyContent : "center",
                        textAlign : "center",
                        alignItems : "center",
                        borderTopLeftRadius : 20,
                        borderTopRightRadius : 20
                    }
                }>
                    <img style={
                        {
                            width : 70,
                            height : 70,
                            borderRadius : "50%",
                            position : "absolute",
                            bottom : -30
                        }
                    } src={data[0]?.avatarRoom || avatarRooms || 'https://tse1.mm.bing.net/th?id=OIP.vR3c8gJDtTZuFFJLa3nHcwHaHC&pid=Api&P=0' } />
                </div>
                <div style={
                    {
                        position : "relative",
                        width : "100%",
                        height : 60,
                        display : "flex",
                        justifyContent : "center",
                        alignItems : "center",
                        textAlign : "center",
                        marginTop : 10
                    }
                }>
                    <h2 style={
                        {
                            marginTop : 30
                        }
                    }>{data[0]?.nameRoom || nameRooms}</h2>
                </div>
                <div style={
                    {
                        display : "flex",
                        justifyContent : "space-around",
                        textAlign : "center",
                        alignItems : "center",
                        flexWrap : 'wrap'
                    }
                }>
                    {!data[0]?.user2 && data[0]?.admin?.includes(userId) && <button 
                    onClick={() => {
                        setListUserCanAdd(true)
                    }}
                    style={
                        {
                            width : 90,
                            marginTop : 10
                        }
                    }>them user</button>}
                    {!data[0]?.user2 && data[0]?.createBy?.includes(userId) && <button 
                    onClick={() => {
                        setEditRooms(true)
                    }}
                    style={
                        {
                            width : 90,
                            marginTop : 10
                        }
                    }>edit room</button>}
                    {!data[0]?.user2 && data[0]?.createBy?.includes(userId) && <button 
                    onClick={() => {
                        setAdminGroup(true)
                    }}
                    style={
                        {
                            width : 90,
                            marginTop : 10
                        }
                    }>admin room</button>}
                    <button 
                    onClick={handleOutRoom}
                    style={
                        {
                            width : 90,
                            marginTop : 10
                        }
                     } >roi room</button>
                    {!data[0]?.user2 && data[0].description === "group" && data[0]?.admin?.includes(userId) && <button 
                    onClick={() => {
                        setListMembersCheck(true)
                    }}
                    style={
                        {
                            width : 90,
                            marginTop : 10
                        }
                     } >block chat</button>}
                    <button style={
                        {
                            width : 90,
                            marginTop : 10
                        }
                    } onClick={() => {
                        socket.emit("leave_room_chat", {roomChat : room._id})
                        dispatch(chatSlice.actions.infoRoom({}))
                        dispatch(chatSlice.actions.listMessages([]))
                    }}>Leave</button>
                    {room.createBy.includes(userId) && <button 
                    onClick={handleDeleteRoom}
                    style={
                        {
                            width : 90,
                            marginTop : 10
                        }
                     } >delete</button>}
                </div>
                <button 
                onClick={() => {
                    setInfoRooms(false)
                }}
                style={
                    {
                        position : "absolute",
                        top : 20,
                        right  :20
                    }
                }>close</button>
            </div>
        </div>}
        {listUserCanAdd && <div style={
            {
                position : "fixed",
                top : 0,
                bottom : 0,
                left : 0,
                right : 0,
                zIndex : 100000000,
                display : "flex",
                justifyContent : "center",
                alignItems :'center',
                textAlign : "center"
            }
        }>
            <div style={
                {
                    position :"relative",
                    height : 300,
                    width : 400,
                    backgroundColor : "#3a2d2d",
                    borderRadius : 20,
                }
            }>
               <div style={
                {
                    marginTop  : 20
                }
               }>
                    <input value={searchText} onChange={(e) => {
                    setSearchText(e.target.value)
                   }} placeholder='search' />
                    <button onClick={handleSearchUser} >search</button>
               </div>
               <div style={
                {
                    position : "relative",
                    width : "100%",
                    display : "flex",
                    justifyContent : "center",
                    marginTop : 20
                }
               }>
                   <input style={
                    {
                    }
                   } value={nameUserAdd} placeholder='add'  />
                   <button 
                   onClick={handleAddUser}
                   style={
                    {
                        width : 55
                    }
                   }>add</button>
               </div>
               <div style={
                {
                    position : "relative",
                    width : "80%",
                    marginTop : 20,
                    backgroundColor : "#000000",
                    marginLeft : 40,
                    maxHeight : 180,
                    overflow : "auto",
                    height : "auto",
                    borderRadius : 20

                }
               }>
                    {listUser && listUser.map((us) => {
                        return <div style={
                            {
                                width : "90%",
                                height : 60,
                                backgroundColor : "#5f4444",
                                marginTop : 10,
                                marginLeft : 15,
                                display : "flex",
                                justifyContent : "space-around",
                                textAlign : "center",
                                alignItems : "center",
                                borderRadius : 20
                            }
                        }>
                            <img 
                            onClick={() => {
                                setIdUserAdd(us?._id)
                                setNameUserAdd(us?.fullName)
                            }}
                            style={
                                {
                                    width  :50,
                                    borderRadius : "50%",
                                    position : "absolute",
                                    left : 40
                                }
                            } src={us?.avatar || 'https://tse1.mm.bing.net/th?id=OIP.vR3c8gJDtTZuFFJLa3nHcwHaHC&pid=Api&P=0' } />
                            <p style={
                                {
                                    position : "absolute",
                                    left : 120
                                }
                            }>{us?.fullName || "User"}</p>
                        </div>
                    })}
                    <p onClick={() => {
                        setLimit(limits + 5)
                    }}>see more</p>
               </div>
               <div 
               onClick={() => {
                setListUserCanAdd(false)
               }}
               style={
                {
                    position : "absolute",
                    top : 10,
                    right : 20
                }
               }>close</div>
            </div>
        </div>}
        {editRooms && <div style={
            {
                position : "fixed",
                top : 0,
                bottom : 0,
                right : 0,
                left : 0,
                zIndex : 1000000000000000,
                display : "flex",
                justifyContent : "center",
                alignItems : "center"
            }
        }>
            <div style={
                {
                    position : "relative",
                    width : 400,
                    height : 250,
                    backgroundColor : "#3a2f2f",
                    borderRadius : 20
                }
            }>
                <h2>EDIT ROOM</h2>
                <span>Name Room</span>
                <Col span={24}>
                    <input placeholder='Name Room...' value={nameRoomText} onChange={(e) => {
                        setNameRoomText(e.target.value)
                    }} />
                </Col>
                <span>Themes Room</span>
                <Col span={24}>
                    <input placeholder='themes Room...' value={themesText} onChange={(e) => {
                        setThemesText(e.target.value)
                    }} />
                </Col>
                <span>Image Room</span>
                <Col span={24}>
                    <input value={ImageText} placeholder='Image Room...' onChange={(e) => {
                        setImageText(e.target.value)
                    }} />
                </Col>
                <button onClick={handleEditRoom} >edit</button>
                <button onClick={() => {
                    setEditRooms(false)
                }}>close</button>
            </div>
        </div>}



        {/* block chat user */}

        {listMembersCheck && <div style={
            {
                position : "fixed",
                top : 0,
                bottom : 0,
                right : 0,
                left : 0,
                zIndex : 1000000000000000,
                display : "flex",
                justifyContent : "center",
                alignItems : "center"
            }
        }>
            <div style={
                {
                    position : "relative",
                    width : 500,
                    height : 350,
                    backgroundColor : "#3a2f2f",
                    borderRadius : 20
                }
            }>
                <h2>List User</h2>
                <div 
                onClick={() => {
                    setListMembersCheck(false)
                }}
                style={
                    {
                        position : "absolute",
                        top : 10,
                        right : 20
                    }
                }>close</div>
                <div style={
                    {
                        width : "80%",
                        height : "100%",
                        backgroundColor : "#635f51",
                        marginLeft : 50,
                        maxHeight : 270,
                        marginTop : -10,
                        borderRadius : 20,
                        overflow : "auto",
                        position : "relative"
                    }
                }>
                {listMember?.map(mb => {
                    return <div style={
                            {
                                width : "90%",
                                height : 60,
                                backgroundColor : "#5f4444",
                                marginTop : 10,
                                marginLeft : 15,
                                display : "flex",
                                justifyContent : "space-around",
                                textAlign : "center",
                                alignItems : "center",
                                borderRadius : 20,
                                overflow : "hidden",
                                position : 'relative'
                            }
                        }>
                            <img 
                            style={
                                {
                                    width  :50,
                                    borderRadius : "50%",
                                    position : "absolute",
                                    left : 40
                                }
                            } src={mb?.avatar || 'https://tse1.mm.bing.net/th?id=OIP.vR3c8gJDtTZuFFJLa3nHcwHaHC&pid=Api&P=0' } />
                            <p style={
                                {
                                    position : "absolute",
                                    left : 120
                                }
                            }>{mb?.fullName || "User"}</p>
                            {!data[0]?.blockChat?.includes(mb._id) ? <button 
                            onClick={() => {
                                handleBlockUserChat(mb._id)
                            }}
                            style={
                                {
                                    position : "absolute",
                                    right : 20,
                                    width : 60
                                }
                            }>block</button> : 
                            <button 
                            onClick={() => {
                                handleUnblockChatUser(mb._id)
                            }}
                            style={
                                {
                                    position : "absolute",
                                    right : 20,
                                    width : 60
                                }
                            }>unBlock</button>
                            }
                        </div>
                    })}
                </div>
            </div>
        </div>}
        {adminGroup && <div
        style={
            {
                position : "fixed",
                top : 0,
                left : 0,
                right : 0,
                bottom : 0,
                zIndex : 10000000000000,
                display :"flex",
                justifyContent : "center",
                alignItems : "center",
                textAlign : 'center'
            }
        }
        >
            <div style={
                {
                    position :"relative",
                    width : 400,
                    height : 400,
                    backgroundColor :"greenyellow",
                    borderRadius : 20
                }
            }>
                <h2>ADMIN</h2>
                <div style={
                    {
                        position : "relative",
                        width : "80%",
                        height : 300,
                        backgroundColor : "red",
                        marginLeft : 40,
                        overflow :  "auto"
                    }
                } >
                {listMember?.map((mb) => {
                    return <>
                        <div style={
                            {
                                position :"relative",
                                width : "80%",
                                height : 60,
                                backgroundColor : "gray",
                                marginTop : 20,
                                marginLeft : 30,
                                borderRadius : 20,
                                display :"flex",
                                justifyContent : "center",
                                alignItems : "center",
                                textAlign : "center"
                            }
                        }>
                        <img style={
                            {
                                width : 50,
                                height : 50,
                                position : 'absolute',
                                borderRadius : "50%",
                                left :20,
                                marginTop : 5
                            }
                        } src={mb?.avatar} />
                        <p style={
                            {
                                position : "absolute",
                                left : 80
                            }
                        }>{mb.fullName}</p>
                        <button
                        onClick={() => {
                            handleCheckAdmin(mb._id)
                        }}
                        style={
                            {
                                position : "absolute",
                                right : 10
                            }
                        }
                        >admin</button>
                        </div>
                    </>
                })}
                </div>
                        <p 
                        onClick={() => {
                            setAdminGroup(false)
                        }}
                        style={
                            {
                                position : "absolute",
                                top : 20,
                                right : 20,
                                color : "black"
                            }
                        }>close</p>
            </div>
        </div>}

    </div>
  )
}

export default HEADERROOM