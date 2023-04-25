import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import VIDEOHOMEPAGE from './video'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import videoSlice from '../../../../../../../redux/slice/videoSlice'

const cx = classNames.bind(styles)

const test = [
    1,1,1,1,1,1,1,1,1,1
]
const HOMEPAGEVIDEO = () => {

    const dispatch = useDispatch()
    const listVideo = useSelector(state => state.video.listVideo)

  return (
    <div className={cx("wrapper")}>
        <div style={
            {
                position : 'absolute',
                top : 0,
                paddingBottom : 20
            }
        }>
            {listVideo && listVideo?.map(el => {
                return <VIDEOHOMEPAGE key={el._id} data={el} />
            })}
            <p 
            onClick={() => {
                dispatch(videoSlice.actions.seeMoreVideo())
            }}
            style={
                {
                    cursor : "pointer"
                }
            }>Xem thêm</p>
        </div>
    </div>
  )
}

export default HOMEPAGEVIDEO