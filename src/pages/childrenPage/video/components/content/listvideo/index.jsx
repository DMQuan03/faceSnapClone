import React from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import HOMEPAGEVIDEO from '../components/Homepage'

const cx = classNames.bind(styles)
const LISTVIDEO = () => {
  return (
    <div className={cx("wrapper")}>
        <HOMEPAGEVIDEO />
    </div>
  )
}

export default LISTVIDEO