import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import NAVBARFACEBOOK from './components/navbar'
import NAVLISTFR from './components/listFr'
import POSTSEARCH from '../../../searchUser/components/content/components/post/post'
import axios from 'axios'
import {
  FaBookOpen,

}from "react-icons/fa"
import {
  HiOutlinePlus
} from "react-icons/hi"
import LISTSTORY from './components/listStory'
import { useNavigate } from 'react-router-dom'
import CREATEPOST from './components/createPost'
import { useDispatch, useSelector } from 'react-redux'
import blogSlice from '../../../redux/slice/blogSlice'


const cx = classNames.bind(styles)
const test = [
  1,1,1,1
]
const HOME = () => {
  // state thu vien
  const navigate = useNavigate()
  const {token , avatar} = sessionStorage
  const dispatch = useDispatch()
  const showCreate = useSelector(state => state.blog.ShowCreateBlog)
  const listBlg = useSelector(state => state.blog.listBlog)
  
  // custom state
  const [limit , setLimit] = useState(20)
  const [listPost , setListPost] = useState([] ?? [])
  const [infoUser , setInfoUser] = useState([] ?? [])
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
       return 1
    })
    .catch(err => {
        navigate("/")
        console.log(err.message)
        return 0
    })
  }, [])
  
  useEffect(() => {

    axios({
        method : "get",
        url : process.env.REACT_APP_GETALL_BLOG + "?limit=" + limit,
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then(res => {
        dispatch(blogSlice.actions.listPost(res.data.data))
    })
    .catch(err => {
        console.log(err.message);
    })
   }, [limit])

  

   useEffect(() => {
    setListPost(listBlg)
   }, [listBlg])

  
   
  return (
    <div className={cx("wrapper")}>
      {showCreate && <CREATEPOST />}
      <NAVBARFACEBOOK data={infoUser} />
      <div className={cx("content_home")}>
        <div className={cx("content_true")}>
        <div className={cx("story_fb")}>
          <div className={cx("nav_story_fb")}>
            <div style={
              {
                display : "flex",
                justifyContent : "center",
                alignItems : "center",
                textAlign : "center",
                width : 300,
              }
            }><FaBookOpen style={
              {
                width : 23,
                height : 23,
                rotate : "90deg",
                color : "gray"
              }
            } />
            <p style={
              {
                marginLeft : 10
              }
            }>Tin</p>
            </div>
            <div style={
              {
                display : "flex",
                justifyContent : "center",
                alignItems : "center",
                textAlign : "center",
                width : 300
              }
            }><svg style={
              {
                width : 23,
                height : 23,
                rotate : "90deg",
                color : "gray"
              }
            } fill="currentColor" viewBox="0 0 20 20" width="1em" height="1em" class="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1qx5ct2 xw4jnvo"><g fill-rule="evenodd" transform="translate(-446 -350)"><path d="M454.59 355h4.18l-2.4-4h-3.28c-.22 0-.423.008-.624.017L454.59 355zm6.514 0h3.695c-.226-1.031-.65-1.79-1.326-2.489-1.061-1.025-2.248-1.488-4.392-1.511h-.379l2.401 4zm-8.78 0-1.942-3.64c-.73.247-1.315.63-1.868 1.165-.668.69-1.09 1.445-1.315 2.475h5.125zm7.043 7.989a.711.711 0 0 1-.22.202l-4.573 2.671-.05.027a.713.713 0 0 1-1.024-.643v-5.343l.002-.056a.714.714 0 0 1 1.072-.56l4.572 2.67.054.036a.714.714 0 0 1 .167.996zm-12.366-5.99V363.083l.001.03v.112l.005.048h.001c.05 2.02.513 3.176 1.506 4.203 1.102 1.066 2.324 1.525 4.577 1.525h5.99c2.144-.023 3.331-.486 4.392-1.511 1.005-1.04 1.467-2.198 1.517-4.217h.003c.003-.1.005-.1.006-.204l.001-.156V357h-18z"></path></g></svg>
            <p style={
              {
                marginLeft : 10
              }
            }>Reels</p>
            </div>
            <div style={
              {
                display : "flex",
                justifyContent : "center",
                alignItems : "center",
                textAlign : "center",
                width : 300
              }
            }><svg style={
              {
                width : 23,
                height : 23,
                rotate : "90deg",
                color : "gray"
              }
            } fill="currentColor" viewBox="0 0 20 20" width="1em" height="1em" class="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1qx5ct2 xw4jnvo"><g fill-rule="evenodd" transform="translate(-446 -350)"><path d="M457.25 361H455v2.25a1 1 0 0 1-2 0V361h-2.25a1 1 0 0 1 0-2H453v-2.25a1 1 0 0 1 2 0V359h2.25a1 1 0 0 1 0 2m8.241-5.889a.962.962 0 0 0-.998.063L462 356.938v-1.188a2.754 2.754 0 0 0-2.75-2.75h-10.5a2.754 2.754 0 0 0-2.75 2.75v8.5a2.754 2.754 0 0 0 2.75 2.75h10.5a2.754 2.754 0 0 0 2.75-2.75v-1.188l2.503 1.77a.953.953 0 0 0 .988.057.95.95 0 0 0 .509-.841v-8.096a.95.95 0 0 0-.509-.841"></path></g></svg>
            <p style={
              {
                marginLeft : 10
              }
            }>Phòng họp mặt</p>
            </div>
          </div>
          <div className={cx("list_story")}>
            <div className={cx("video_story")}>
              <div className={cx("create_story")}>
                <div style={
                  {
                    position : 'relative',
                    width : 200,
                    height : 170
                  }
                }>
                  <div style={
                    {
                      width : 40,
                      height : 40,
                      borderRadius : "50%",
                      backgroundColor : "#bfbfbf",
                      position : "absolute",
                      bottom : 0,
                      left : 42,
                      display : "flex",
                      justifyContent : "center",
                      alignItems : "center",
                      textAlign : "center",
                    }
                  }>
                    <button
                    style={
                      {
                        backgroundColor : "#1876f2",
                        width : 25,
                        height : 25,
                        borderRadius : "50%",
                        border : "none",
                        outline : "none",
                        display : "flex",
                        justifyContent : "center",
                        alignItems : 'center'
                      }
                    }
                    ><HiOutlinePlus style={
                      {
                        width : 30,
                        height : 30,
                        rotate : "90deg"
                      }
                    } /></button>
                  </div>
                </div>
              </div>
              <div className={cx("video_true")}>
                {test.map(el => {
                  return <LISTSTORY />
                })}
              </div>
            </div>
        </div>
        </div>
        <div className={cx("create_post")}>
              <div style={{
                width : "100%",
                height : "50%",
                display : "flex",
                justifyContent  :"center",
                alignItems : "center",
                textAlign : "center",
                position : "relative",
                borderBottom : "1px solid #d5d1d1"
              }}>
                <img style={
                  {
                    width : 50,
                    height : 50,
                    borderRadius : "50%",
                    position : "absolute",
                    left : 20
                  }
                } src={avatar || ""} alt='a'/>
                  <button 
                  onClick={() => {
                    dispatch(blogSlice.actions.ShowCreateBlog())
                  }}
                  className={cx("btn_header_styles")}
                  ><p style={
                  {
                    marginLeft : 10,
                    color : "gray"
                  }
                }>ban dang nghi cai quan que gi vay...?</p></button>
              </div>
              <div style={
                {
                  width : "100%",
                  height : "50%",
                  display : "flex",
                  justifyContent : 'space-around',
                  alignItems : "center",
                  textAlign : "center"
                }
              }>
                <div style={{ display : "flex",
                justifyContent : "center",
                alignItems : "center",
                textAlign : "center"
                }}>
                  <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png" />
                  <p style={
                    {
                      marginLeft : 10
                    }
                  }>Video trực tiếp</p>  
                </div>
                <div 
                onClick={() => {
                    dispatch(blogSlice.actions.ShowCreateBlog())
                  }}
                style={{ display : "flex",
                justifyContent : "center",
                alignItems : "center",
                textAlign : "center"
                }}>
                  <img src='https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png' />
                  <p style={
                    {
                      marginLeft : 10
                    }
                  }>Ảnh/video</p>  
                </div>
                <div 
                onClick={() => {
                    dispatch(blogSlice.actions.ShowCreateBlog())
                  }}
                style={{ display : "flex",
                justifyContent : "center",
                alignItems : "center",
                textAlign : "center"
                }}>
                  <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png' />
                  <p style={
                    {
                      marginLeft : 10
                    }
                  }>Cảm xúc/hoạt động</p>  
                </div>
              </div>
        </div>
        <NAVLISTFR />
          {listPost?.length > 0 && listPost?.map(el => {
            return <POSTSEARCH data={el} />
          })}
          <p onClick={() => {
            setLimit(limit + 20)
          }}>Xem thêm</p>
        </div>
      </div>
    </div>
  )
}

export default HOME