import React from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import PEOPLESEARCH from './components/people'
import POSTSEARCH from './components/post/post'
import { useDispatch, useSelector } from 'react-redux'
import searchUser from '../../../redux/slice/searchUser'
import SHOWMORE from './components/post/showmorePost'
import VIDEOHOMEPAGE from '../../../pages/childrenPage/video/components/content/components/Homepage/video'

const test = [
  1,1,1,1,1,1
]

const cx = classNames.bind(styles)
const NAVALL = () => {

  const listUser = useSelector(state => state.searchUser.listUser)
  const listBlog = useSelector(state => state.searchUser.listBlog)
  const listVideo = useSelector(state => state.searchUser.listVideo)
  const navPost = useSelector(state => state.searchUser.navPost)
  const navPeople = useSelector(state => state.searchUser.navPeople)
  const navVideo = useSelector(state => state.searchUser.navVideo)
  const dispatch = useDispatch()
  return (
    <div className={cx("wrapper")}>
        {navPeople && 
        <div className={cx("NAVALL_people")}>
          <div className={cx("NAVALL_people_title")}>
            <h2 
            onClick={() => {
              dispatch(searchUser.actions.plusLimits())
            }}
            style={
              {
                marginLeft : 25
              }
            }>Mọi người</h2>
          </div>
          <div>
            { listUser.length > 0 && listUser?.map(us => {
              return <PEOPLESEARCH data={us} key={us._id} />
            })}
          </div>
          <button className={cx("btn_see_more")}><p style={
            {
              fontWeight : 700
            }
          }>Xem tất cả</p></button>
        </div>}
      {navPost && <div className={cx("NAVALL_post")}>
        {listBlog?.length > 0 &&  listBlog?.map(ps => {
          return <POSTSEARCH key={ps._id} data={ps} />
        })}
        {listBlog?.length > 4 && <p onClick={() => {
          dispatch(searchUser.actions.plusLimitBlog())
        }}>see more</p>}
      </div>}
      {navVideo && <div className={cx("NAV_VIDEO")} >
        {listVideo.map(vd => {
          return <VIDEOHOMEPAGE key={vd._id} data={vd} />
        }) }
        <p 
        onClick={() => {
          dispatch(searchUser.actions.plusLimitVideo())
        }}
        style={
          {
            marginLeft : -90
          }
        }>see more</p>
      </div>}
    </div>
  )
}

export default NAVALL