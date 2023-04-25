import React from 'react'
import classNames from 'classnames/bind'
import styles from "./nav.module.scss"
import {
  FcGallery,
  FcVideoProjector
} from "react-icons/fc"

import {
  BsPostcardFill,
  BsFillPeopleFill,
} from "react-icons/bs"
import { useDispatch } from 'react-redux'
import searchUser from '../../../redux/slice/searchUser'

const cx = classNames.bind(styles)

const NAVBARSEARCHUSEr = () => {

  const dispatch = useDispatch()

  return (
    <div className={cx("wrapper")}>
      <div className={cx("title_nav")}>
        <h2 style={
          {
            marginLeft : 10
          }
        }>Kết quả tìm kiếm</h2>
      </div>
      <div className={cx("content_nav")}>
        <div className={cx("title_content_nav")}>
          <div className={cx("title_content")}>
            <h3 style={
              {
                marginLeft : 10,
                fontWeight : 500
              }
            }>Bộ lọc</h3>
          </div>
          <div 
          onClick={() => {
            dispatch(searchUser.actions.searchAll())
          }}
          className={cx("nav_all")}>
            <div>
              <FcGallery className={cx("icon")} />
            </div>
            <div>
              <p style={
                {
                  marginLeft : 20
                }
              }>Tất cả</p>
            </div>
          </div>
          <div 
          onClick={() => {
            dispatch(searchUser.actions.searchPost())
          }}
          className={cx("nav_post")}>
            <div>
              <BsPostcardFill className={cx("icon")} />
            </div>
            <div>
              <p style={
                {
                  marginLeft : 20
                }
              }>Bài viết</p>
            </div>
          </div>
          <div 
          onClick={() => {
            dispatch(searchUser.actions.searchPeoPle())
          }}
          className={cx("nav_people")}>
            <div>
              <BsFillPeopleFill className={cx("icon")} />
            </div>
            <div>
              <p style={
                {
                  marginLeft : 20
                }
              }>Mọi người</p>
            </div>
          </div>
          <div 
          onClick={() => {
            dispatch(searchUser.actions.searchVideo())
          }}
          className={cx("nav_video")}>
            <div>
              <FcVideoProjector className={cx("icon")} />
            </div>
            <div>
              <p style={
                {
                  marginLeft : 20
                }
              }>video</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NAVBARSEARCHUSEr