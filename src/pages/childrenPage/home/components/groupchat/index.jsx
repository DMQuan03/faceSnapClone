import React from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import { useNavigate } from 'react-router-dom'
const cx = classNames.bind(styles)

const GROUPCHATLIST = ({data}) => {
    const navigate = useNavigate()
  return (
    <div className={cx("wrapper_group")}>
        <img 
        onClick={() => {
            navigate("/chat")
        }}
        className={cx("img_group")}  src={data?.avatarRoom || "" } alt='a' />
        <div className={cx("name_group")}>
            <p style={
                {
                    marginLeft : 10,
                    fontWeight : 600,
                    fontSize : "1.1rem"
                }
            }>{data.nameRoom || "group"}</p>
        </div>
    </div>
  )
}

export default GROUPCHATLIST