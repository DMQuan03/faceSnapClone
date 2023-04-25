import React from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)
const PEOPLESEARCH = ({data}) => {

  const navigate = useNavigate()
  return (
    <div className={cx("wrapper")}>
      <div className={cx("avatar_user")}>
        <img 
        onClick={() => {
          navigate("/profile/" + data?._id)
        }}
        className={cx('img_user')} src={data?.avatar || 'https://s.yimg.com/fz/api/res/1.2/NZypHNbfvFBJtdqRyoBqrQ--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0xOTI7cHhvZmY9MDtweW9mZj0wO3E9ODA7dz0xOTI-/https://s.yimg.com/zb/imgv1/6ed861d1-a1e0-36b0-9f36-4a88049ac421/s_140x140'} alt='a' />
      </div>
      <div className={cx("info_user_intro")}>
        <div className={cx("name_user")}>
          <p style={
            {
              marginLeft : 10,
              marginTop : 35,
              fontWeight : 700,
              fontSize : "1.3rem"
            }
          } >{data.fullName || "User"}</p>
        </div>
        <div className={cx("intro_user")}>
          <p style={
            {
              marginLeft : 10
            }
          } >co {data.followingOfUser} theo doi , {data.friends.length} ban be </p>
        </div>
      </div>
    </div>
  )
}

export default PEOPLESEARCH