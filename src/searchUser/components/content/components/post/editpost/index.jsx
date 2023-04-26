import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import {BiArrowBack} from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import blogSlice from '../../../../../../redux/slice/blogSlice'
import axios from 'axios'

const cx = classNames.bind(styles)

const EDITPOST = () => {
    const {avatar , username, token} = sessionStorage
    const dispatch = useDispatch()
    const infoPostEdit = useSelector(state => state.blog.infoBlogEdit)
    const [textTitle , setTextTitle] = useState("")

    useEffect(() => {
        setTextTitle(infoPostEdit.title)

        return () => {
            setTextTitle("")
        }
    }, [])

    const handleEditBlog = () => {
    
        axios({
          method : "patch",
          url : process.env.REACT_APP_BASE_URL + "/blog/update/" + infoPostEdit._id ,
          data : {
            title : textTitle,
          },
          headers : {
            authorization : `Bearer ${token}`
          }
        })
        .then(res => {
          dispatch(blogSlice.actions.unEditPost())
          return 1
        })
        .catch(err => {
          console.log(err.message)
          return 0
        })
      }
  return (
    <div className={cx("wrapper")} >
        <div className={cx("title_edit")}>
            <h2>Chỉnh sửa bài viết</h2>
            <div 
            onClick={() => {
                dispatch(blogSlice.actions.unEditPost())
            }}
            style={
                {
                    position : 'absolute',
                    right : 20
                }
            }>
                <BiArrowBack style={
                    {
                        width : 20,
                        height : 20,
                        rotate : '90deg'
                    }
                } />
            </div>
        </div>
        <div className={cx("infoUser_edit")}>
            <div style={
                {
                    width : 60,
                    display  :"flex",
                    justifyContent : "center",
                    alignItems : "center",
                    textAlign : "center"
                }
            }>
                <img style={
                    {
                        width : 40,
                        height : 40,
                        borderRadius : "50%",
                        marginLeft :10
                    }
                } src={avatar} alt='a' />
            </div>
            <div style={
                {
                    position :'absolute',
                    left : 70,
                    width : "auto",
                    maxWidth : 400
                }
            }>
                <p>{username}</p>
            </div>
        </div>
        <div className={cx("edit_post_true")}>
            <div className={cx("edit_title")}>
                <input value={textTitle} onChange={(e) => {
                    setTextTitle(e.target.value)
                }} style={
                    {
                        width : "99%",
                        height : "90%",
                        border : "none",
                        outline : "none",
                        marginLeft : 20
                    }
                } type='text'></input>
            </div>
            <div className={cx("img_post")}>
                <img style={
                    {
                        width : "100%",
                        height : "100%"
                    }
                } src={infoPostEdit.img || avatar} alt='a' />
            </div>
        </div>
        <div className={cx("btn_save")}>
            <button
            onClick={handleEditBlog}
            style={
                {
                    width : "90%",
                    height : "70%",
                    borderRadius : 10,
                    outline : "none",
                    border : "none",
                    cursor : 'pointer',
                    backgroundColor : "#e4e6eb"
                }
            }>Lưu</button>
        </div>
    </div>
  )
}

export default EDITPOST