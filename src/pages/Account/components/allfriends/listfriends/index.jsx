import React from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import {
    BiDotsHorizontalRounded
} from "react-icons/bi"

const cx = classNames.bind(styles)
const LISTFRIENDS = ({data}) => {

    const {avatar} = sessionStorage
  return (
    <div className={cx("wrapper")} style={
        {
            width : "100%",
            height : 80,
            maxHeight : 100,
            display : 'flex',
            justifyContent : "flex-start",
            alignItems : "center",
            textAlign : 'center',
            position : "relative"
        }
    }>
        <div>
            <img style={
                {
                    width : 50,
                    height : 50,
                    borderRadius : "50%"
                }
            } src={data?.avatar || ""} />
        </div>
       <div style={
        {
            width : 300,
            height : "100%",
            display : "flex",
            justifyContent : "flex-start",
            alignItems : "center",
            textAlign : "center"
        }
       }>
        <p style={
            {
                marginLeft : 10
            }
        }>{data?.fullName}</p>
       </div>
       <div style={
        {
            position : "absolute",
            right : 20
        }
       }>
        <BiDotsHorizontalRounded style={
            {
                width : 20,
                height : 20,
                rotate : "90deg",
            }
        } />
       </div>
    </div>
  )
}

export default LISTFRIENDS