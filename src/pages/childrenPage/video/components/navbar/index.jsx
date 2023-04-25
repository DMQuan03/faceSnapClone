import React from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import {
    AiTwotoneSetting
} from "react-icons/ai"
import {
    BsCollectionPlay,
    BsCameraReelsFill
} from "react-icons/bs"
import {
    RiLiveFill
} from "react-icons/ri"
import {
    GiFilmSpool
} from "react-icons/gi"
import {
    HiBookmark
} from "react-icons/hi"
import SEARCHVIDEO from '../searchvideo'
import SHOWMOREVIDEO from '../showMoreVideo'
const cx = classNames.bind(styles)
const NAVBARVIDEO = () => {

    const MENU_ITEMS = [
        {
            icon : <BsCollectionPlay className={cx("icon_navbar_Video")} />,
            title : "Trang chủ",
            onclick : () => {

            }
        },

        {
            icon : <RiLiveFill className={cx("icon_navbar_Video")} />,
            title : "Trực tiếp",
            onclick : () => {

            }
        },

        {
            icon : <BsCameraReelsFill className={cx("icon_navbar_Video")} />,
            title : "Reels",
            onclick : () => {

            }
        },

        {
            icon : <GiFilmSpool className={cx("icon_navbar_Video")} />,
            title : "Chương trình",
            onclick : () => {

            }
        },

        {
            icon : <HiBookmark className={cx("icon_navbar_Video")} />,
            title : "Video đã lưu",
            onclick : () => {

            }
        },
        
    ]
  return (
    <div className={cx("wrapper")}>
        <div className={cx("header_nav")}>
            <h2>Watch</h2>
            <button className={cx("btn_setting_video")}><AiTwotoneSetting className={cx("icon_navbar_Video")} /></button>
        </div>
        <SEARCHVIDEO />
        {MENU_ITEMS.map(el =>(
            <div className={cx("container_icon")}> 
                <div style={
                    {
                        marginLeft : 20
                    }
                } >{el.icon}</div>
                <div style={
                    {
                        width : 300,
                        marginLeft : 20,
                        display : 'flex',
                        justifyContent : "flex-start"
                    }
                }>
                    <p style={
                        {
                            fontWeight : 600,
                            fontSize : "1rem"
                        }
                    }>{el.title}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default NAVBARVIDEO