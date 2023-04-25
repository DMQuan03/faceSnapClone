import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./prf.module.scss"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { io } from 'socket.io-client'
import {
    BsFillPatchCheckFill
} from "react-icons/bs"

const cx = classNames.bind(styles)
const { token } = sessionStorage
const socket = io.connect("http://localhost:3456", {
    query: {
        token: `${token}`

    }
})

const Profils = () => {

    const navigate = useNavigate()
    const { userId, token } = sessionStorage
    const params = useParams()
    const [infoUser, setInfoUser] = useState([])
    const [blogOfUser, setBlogOfUser] = useState([])
    const [listFr , setListFr] = useState([])
    const [flow , setFlow] = useState([])
    const [currentusers , setCurrentUsers] = useState([])
    const [settingUser , setSettingUser] = useState(false)
    const [check , setCheck] = useState(true)
    const [checkAdd , setCheckAdd] = useState(true)
    const [check1 , setCheck1] = useState(true)
    const [check2 , setCheck2] = useState(true)
    const [check3 , setCheck3] = useState(true)
    const [check4 , setCheck4] = useState(true)
    
    const [editUsername , setEditUsername] =useState("")
    const [editage , setAge] =useState("")
    const [editPhone , setEditPhone] =useState("")
    const [editAvatar , setEditAvatar] =useState("")
    const [textTitle , setTextTitle] =useState("")

    const handleEditUser = () => {
        axios({
            method : "patch",
            url : process.env.REACT_APP_API15,
            data : {
                fullName : editUsername,
                phone : Math.floor(editPhone),
                avatar : editAvatar,
                age : Math.floor(editage)
            },
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            setEditUsername("")
            setEditPhone("")
            setAge("")
            setEditAvatar("")
            setSettingUser(true)
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    const handleFollowUser = () => {
        axios({
            method : "put",
            url : process.env.REACT_APP_API16 + params.id,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            setFlow(flow + 1)
        })
    }

    const unfollowing = () => {
        axios({
            method : "put",
            url : process.env.REACT_APP_API17 + params.id,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            setFlow(flow - 1)
        })
    }

    const handleCreateBlog = () => {
        socket.emit("create_blog", { title : textTitle })
    }

    useEffect(() => {
        socket.on("return_blog", async(data) => {
            try {
                setBlogOfUser(prev => [ data, ...prev])
            } catch (error) {
                console.log(error.message);
            }
        })
    }, [socket])


    useEffect(() => {
        axios({
            method : "get",
            url : process.env.REACT_APP_API18 + params.id,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            setInfoUser(res.data.data)
            setListFr(res.data.data.friends)
            setFlow(res.data.data.followingOfUser)
        })
    }, [])

    useEffect(() => {
        axios({
            method : "get",
            url : process.env.REACT_APP_API19 + params.id,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            setBlogOfUser(res.data.data)
        })
    }, [])

    useEffect(() => {
        axios({
            method : "get",
            url : process.env.REACT_APP_API2,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            // setBlogOfUser(res.data.user.friends)
            setCurrentUsers(res.data.user)
        })
        .catch(err => {
            navigate("/")
            console.log(err.message)
            return 0
        })
    }, [])

    const handleAddFriend = () => {
        socket.emit("send_req_to_user_add", {userId : infoUser._id})
    }

    const handleRemoveAddfr = () => {
        axios({
            method : "put",
            url : process.env.REACT_APP_API20 + infoUser._id,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            return 1
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    const addFrOk = () => {
        socket.emit("add_Friend", { userId : infoUser?._id })
    }

    useEffect(() => {
        const result = currentusers?.listAwait?.some((el) => {
            return el._id === infoUser._id
        })
        if (result) {
            setCheck1(true)
        }else {
            setCheck1(false)
        }
    }, [infoUser])

    useEffect(() => {
        const result = currentusers?.friends?.some((el) => {
            return el._id === infoUser._id
        })
        if (result) {
            setCheck3(true)
        }else {
            setCheck3(false)
        }
    }, [infoUser])

    const handleUnFriend = () => {
        axios({
            method : "put",
            url :process.env.REACT_APP_API21 +  infoUser._id,
            headers : {
                authorization : `Bearer ${token}`
            }
        })
    }

    useEffect(() => {
        console.log(infoUser);
    }, [infoUser])
    

    return (
        <div className={cx("wrapper9999")}>
            <header className={cx("header-prf")}>
                <div className={cx("bia-user")}></div>
                <div className={cx("info-user")}>
                    <div><img className={cx("avt-user")} src={infoUser?.avatar || "https://tse4.mm.bing.net/th?id=OIP.PwEh4SGekpMaWT2d5GWw0wHaHt&pid=Api&…"} alt='user' /></div>
                    <div className={cx("username-user")}>
                        <h1 style={{ position: "absolute", marginTop: 10 }}>{infoUser?.fullName}
                        {infoUser?.tick  && <span style={
                            {
                                marginLeft : 20,
                                top : 10
                            }
                        }><BsFillPatchCheckFill style={
                            {
                                width : 20,
                                height : 20,
                                rotate : "90deg",
                                color : "#18cadd"
                            }
                        } /></span>}
                        </h1>
                        <p style={{ position: "absolute", bottom: 10, marginBottom: 20, fontWeight: 700 }}>{infoUser?.friends?.length} ban be</p>
                        <div style={{ display: "flex", position: "absolute", bottom: 0, maxWidth: "200px", maxHeight: 20 }}>
                            <div className={cx("user-fr")}>
                                <img style={{ width: 30, height: 30, borderRadius: "50%" }} src={listFr[0]?.avatar || 'https://tse4.mm.bing.net/th?id=OIP.PwEh4SGekpMaWT2d5GWw0wHaHt&pid=Api&…'} />
                            </div>

                            {listFr[1] ?<div className={cx("user-fr")}>
                                <img style={{ width: 30, height: 30, borderRadius: "50%" }}  src={listFr[1]?.avatar || 'https://tse4.mm.bing.net/th?id=OIP.PwEh4SGekpMaWT2d5GWw0wHaHt&pid=Api&…'} />
                            </div> : <Fragment />}

                            {listFr[2] ? <div className={cx("user-fr")}>
                                <img style={{ width: 30, height: 30, borderRadius: "50%" }}  src={listFr[2]?.avatar || 'https://tse4.mm.bing.net/th?id=OIP.PwEh4SGekpMaWT2d5GWw0wHaHt&pid=Api&…'} />
                            </div> : <Fragment />}
                            
                            {listFr[3] ? <div style={{
                                width : 30,
                                height : 30,
                                backgroundColor : "black",
                                marginLeft : 10,
                                display : "flex",
                                justifyContent : "center",
                                alignItems : "center",
                            }} className={cx("user-fr")}>
                               <p>+{listFr?.length - 3}</p>
                            </div> : <Fragment />}
                        </div>
                    </div>
                    {infoUser._id === userId ? <div className={cx("btn-user")}>
                        <button className={cx("btn_user-main")} > + Thêm vào tin</button>
                        <button className={cx("btn_user-main")} style={{ marginLeft: 20 }} onClick={() => {
                            setSettingUser(true)
                        }} >chỉnh sửa trang cá nhân</button>
                    </div> :
                    <div className={cx("btn-user")}>
                        {check3 ? 
                            check4 ? <button className={cx("btn_user-main")} style={{ marginLeft: 20 }}  onClick={() => {
                            handleUnFriend()
                            setCheck4(false)
                        }} >bạn bè</button>
                        :
                        <button className={cx("btn_user-main")} style={{ marginLeft: 20 }}  onClick={() => {
                        }} >thêm bạn</button>  
                        : 
                        check1 ? 
                        check2 ?
                         <button onClick={() => {
                            addFrOk()
                            setCheck2(false)
                        }}>add</button> :
                        <button>bạn bè</button>
                         :  !infoUser?.friends?.includes(userId) ?  !infoUser?.listAwait?.includes(userId) ? 
                        checkAdd ?
                        <button className={cx("btn_user-main")} style={{ marginLeft: 20 }} onClick={() => {
                            handleAddFriend()
                            setCheckAdd(false)
                        }} >+ thêm bạn bè</button> 
                        : 
                        <button className={cx("btn_user-main")} style={{ marginLeft: 20 }} onClick={() => {
                            handleRemoveAddfr()
                            setCheckAdd(true)
                        }} >xóa lời mời</button>
                        :
                        checkAdd ? <button className={cx("btn_user-main")} style={{ marginLeft: 20 }}  onClick={() => {
                            handleRemoveAddfr()
                            setCheckAdd(false)
                        }} >xóa lời mời</button>
                        :
                        <button className={cx("btn_user-main")} style={{ marginLeft: 20 }}  onClick={() => {
                            handleAddFriend()
                            setCheckAdd(true)
                        }} >+ thêm bạn</button> 
                        
                        :
                        checkAdd ? <button className={cx("btn_user-main")} style={{ marginLeft: 20 }}  onClick={() => {
                            // handleRemoveAddfr()
                            setCheckAdd(false)
                        }} >bạn bè</button>
                        :
                        <button className={cx("btn_user-main")} style={{ marginLeft: 20 }}  onClick={() => {
                            // handleAddFriend()
                            setCheckAdd(true)
                        }} >+ thêm bạn</button>
                      
                        }
                        {!infoUser?.otherFollowing?.includes(userId) ? 
                        check ?
                        <button className={cx("btn_user-main")} style={{ marginLeft: 20 }} onClick={() => {
                            handleFollowUser()
                            setCheck(false)
                        }} >theo dõi</button> 
                        : 
                        <button className={cx("btn_user-main")} style={{ marginLeft: 20 }} onClick={() => {
                            unfollowing()
                            setCheck(true)
                        }} >hủy theo dõi</button>
                        :
                        check ? <button className={cx("btn_user-main")} style={{ marginLeft: 20 }}  onClick={() => {
                            unfollowing()
                            setCheck(false)
                        }} >hủy theo dõi</button>
                        :
                        <button className={cx("btn_user-main")} style={{ marginLeft: 20 }}  onClick={() => {
                            handleFollowUser()
                            setCheck(true)
                        }} >theo dõi</button> 
                        }
                    </div>
                    }
                </div>
                <div className={cx("navbar-user")}>
                    <div >
                        <Link style={{ textDecoration: "none", color: "wheat", marginLeft: 13 }}>Bài Viết</Link>
                        <Link style={{ textDecoration: "none", color: "wheat", marginLeft: 13 }}>Giới thiệu</Link>
                        <Link style={{ textDecoration: "none", color: "wheat", marginLeft: 13 }}>Bạn bè</Link>
                        <Link style={{ textDecoration: "none", color: "wheat", marginLeft: 13 }}>Ảnh</Link>
                        <Link style={{ textDecoration: "none", color: "wheat", marginLeft: 13 }}>Video</Link>
                        <Link style={{ textDecoration: "none", color: "wheat", marginLeft: 13 }}>Check in</Link>
                        <Link style={{ textDecoration: "none", color: "wheat", marginLeft: 13 }}>Xem Thêm</Link>
                    </div>
                    <div style={{ marginRight: 20 }}>
                        <button>...</button>
                    </div>
                </div>
            </header>
            <main className={cx("main")} >
                <div className={cx("main-user")}>
                    <nav className={cx("nav-main")}>
                        <div style={{ width: "100%", backgroundColor: "gray", marginTop: 0, height: "auto", minHeight: 710, padding: 10, boxSizing: "border-box", borderRadius: 10 }}>
                            <h1 style={{ marginLeft: -170 }}>Gioi thieu</h1>
                            <button style={{ width: 290, height: 30, borderRadius: 10, border: "none" }}>Them thieu su</button>
                            <p >tham gai vao ngay</p>
                            <p >co <span>{flow || 0}</span> nguoi theo doi</p>
                            <button 
                            onClick={() => {
                                setSettingUser(true)
                            }}
                            style={{ width: 290, height: 30, borderRadius: 10, border: "none", marginTop: 10 }}>Chỉnh sửa chi tiết</button>
                            <button style={{ width: 290, height: 30, borderRadius: 10, border: "none", marginTop: 10 }}>thêm sở thích</button>
                            <div>
                                <div style={{ width: 130, height: 160, backgroundColor: "wheat", borderRadius: 10, marginTop: 20, marginLeft: 15, marginRight: 5, marginBottom: 20 }}></div>
                            </div>
                            <button style={{ width: 290, height: 30, borderRadius: 10, border: "none", marginTop: 10, marginBottom: 20 }}>Chỉnh sửa phần đáng chú ý</button>
                            <p>welcom to my profile</p>
                            <p>to introduce oneself</p>
                        </div>
                    </nav>
                    <div className={cx("content-main")}>
                        {userId === infoUser?._id ? <div className={cx("text-input-content")}>
                            <div className={cx("header-input-type")}>
                                <img style={{ width: 30, height: 30, borderRadius: "50%", marginLeft: 20 }} src='https://tse1.mm.bing.net/th?id=OIP.-F2PBG6kVVxK6a8Dw_mqXQHaFs&pid=Api&rs=1&c=1&qlt=95&w=139&h=106' />
                                <input onChange={(e) => {
                                    setTextTitle(e.target.value)
                                }} className={cx("header-input-user")} />
                                <label style={{ position: "absolute", marginLeft: 70, marginTop: -10 }}>ban dang nghi gi</label>
                            <button onClick={handleCreateBlog}>Craete</button>
                            </div>
                            <div style={{ marginTop: 5 }} className={cx("event-input")}>
                                <span></span>
                                <p>video truc tiep</p>
                                <span></span>
                                <p>Anh / Video</p>
                                <span></span>
                                <p>Su kien trong doi</p>
                            </div>
                        </div> : <Fragment />}
                        {userId === infoUser?._id ? <div className={cx("loc-blog")}>
                            <div className={cx("loc-blog-1")}>
                                <p style={{ marginLeft: 20 }}>Bài Viết</p>
                                <div style={{ marginRight: 20 }}>
                                    <button style={{ marginRight: 20 }}>Bộ lọc</button>
                                    <button>Quản lý vài viết</button>
                                </div>
                            </div>
                            <div style={{ marginTop: 5 }} className={cx("loc-blog-2")}>
                                <div>Xem theo danh sách</div>
                                <div>Chế dộ xem lưới</div>
                            </div>
                        </div> : <Fragment />}
                        <div>
                            {
                                blogOfUser?.map((blogs) => {
                                    {/* return <BLOG className={"bloguser"} key={blogs._id} data={blogs} /> */}
                                })
                            }
                        </div>
                    </div>
                </div>
            </main>
            {settingUser ? <div className={cx("settingUser")}>
                <div className={cx("settingUser1")}>
                    <h2>EDIT PROFILE</h2>
                    <div className={cx("username")}>
                    <p className={cx('name1')}>username</p>
                        <input value={editUsername} className={cx('input1')} onChange={(e) => {
                            setEditUsername(e.target.value)
                        }} />
                    </div>
                    <div className={cx("username")}>
                    <p className={cx('name1')}>phone</p>
                        <input value={editPhone} className={cx('input1')} onChange={(e) => {
                            setEditPhone(e.target.value)
                        }} />
                    </div>
                    <div className={cx("username")}>
                    <p className={cx('name1')}>age</p>
                        <input value={editage} className={cx('input1')} onChange={(e) => {
                            setAge(e.target.value)
                        }} />
                    </div>
                    <div className={cx("username")}>
                    <p className={cx('name1')}>avatar</p>
                        <input value={editAvatar} className={cx('input1')} onChange={(e) => {
                            setEditAvatar(e.target.value)
                        }} />
                    </div>
                    <button style={{marginTop : 40, width : 150, height : 50, fontSize : "1rem", fontWeight : 600}} onClick={handleEditUser}>EDIT</button>
                    <button style={{ fontWeight : 600, position : "absolute", top : 20, right : 20}} onClick={() => {
                        setSettingUser(false)
                    }} >CLOSE</button>
                </div>
            </div> : <Fragment />}
        </div>
    )
}

export default Profils