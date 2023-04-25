import React from 'react'
import classNames from 'classnames/bind'
import styles from "./incdex.module.scss"
import { useNavigate } from 'react-router-dom'
const cx = classNames.bind(styles)

const LISTFRIENDS = ({data}) => {
  const navigate = useNavigate()
  return (
    <div className={cx("wrapper")}>
        <img 
        onClick={() => {
          navigate(`/profile/${data._id}`)
        }}
        className={cx("img_user")}  src={data.avatar || "" } alt='a' />
        <div className={cx("username_friends")}>
            <p style={
                {
                    marginLeft : 10,
                    fontWeight : 600,
                    fontSize : "1.1rem"
                }
            }>{data.fullName || "user"}</p>
        </div>
        {data.isActive && <div className={cx("online")}></div>}
    </div>
  )
}

export default LISTFRIENDS