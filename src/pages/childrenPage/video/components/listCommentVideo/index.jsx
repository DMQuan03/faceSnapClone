import React from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import { format } from 'timeago.js'
const cx = classNames.bind(styles)

const LISTCOMMENTVIDEOWATCH = ({data}) => {
  return (
    <div className={cx("wrapper")}>
        <div>
            <img style={
                {
                    width : 40,
                    height : 40,
                    borderRadius : "50%",
                    position : 'absolute',
                    top : 10,
                    left : 10
                }
            } src={data?.userId?.avatar || ""} alt='' />
        </div>
        <div className={cx("info_comment")}>
            <div style={
                {
                    width : "100%",
                    height : 10,
                    display : 'flex',
                    justifyContent : 'flex-start',
                    alignItems : "center",
                    textAlign : 'start',
                    backgroundColor : "#f0f2f5",
                    borderTopLeftRadius : 20,
                    borderTopRightRadius : 20,
                    
                }
            }><p style={
                {
                    marginLeft : 10,
                    fontWeight : 700,
                    marginTop : 30
                }
            }>{data?.userId?.fullName || "user"}</p></div>
            <div style={
                {
                    display : "flex",
                    justifyContent : "flex-start",
                    alignItems : "center",
                    textAlign : 'start',
                    padding : 10,
                    boxSizing : "border-box",
                    borderBottomLeftRadius : 20,
                    borderBottomRightRadius : 20,
                    backgroundColor : "#f0f2f5"
                }
            }>
                <span>{data?.text}</span>
            </div>
            <div style={
                {
                    width : "100%",
                    height : 20,
                    display : "flex",
                    justifyContent : "flex-end",
                    alignItems : "center",
                    textAlign : "center"
                }
            }>
                <p style={
                    {
                        marginRight : 10
                    }
                }>{format(data?.createdAt) || "just now"}</p>
            </div>
        </div>
    </div>
  )
}

export default LISTCOMMENTVIDEOWATCH