import React from 'react'
import classNames from 'classnames/bind'
import styles from "./popper.module.scss"

const cx = classNames.bind(styles)
const POPPER = ({children}) => {
  return (
    <div className={cx("wrapper")}>
        {children}
    </div>
  )
}

export default POPPER