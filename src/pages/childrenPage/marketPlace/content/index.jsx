import React from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import LISTPRODUCT from './listProduct'

const test = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

const cx = classNames.bind(styles)

const MARKETPLACECONTENT = () => {
  return (
    <div className={cx("wrapper")}>
        <div className={cx("container_product")}>
            {test.map(el => {
                return <LISTPRODUCT />
            })}
        </div>
    </div>
  )
}

export default MARKETPLACECONTENT