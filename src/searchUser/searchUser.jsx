import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./search.module.scss"
import HEADERSEARHUSER from './components/header/header'
import NAVBARSEARCHUSER from './components/navbar/navbar'
import NAVALL from "./components/content/content"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

const SEARCHUSER = () => {

  const {token} = sessionStorage
  const navigate = useNavigate()
  const [check , setCheck] = useState(false)

  useEffect(() => {
    axios({
        method : "get",
        url : process.env.REACT_APP_BASE_URL + "/user/currentuser/",
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    .then(res => {
        setCheck(true)
        return 1
    })
    .catch(err => {
        navigate("/")
        console.log(err.message)
        return 0
    })
}, [])
  return (
    <>
      {check && <div className={cx("wrapper")}>
        <HEADERSEARHUSER />
        <div className={cx("content_search")}>
          <div className={cx("content_navbar")}>
            <NAVBARSEARCHUSER />
          </div>
          <div className={cx("content_true")}>
            <NAVALL />
          </div>
        </div>
      </div>}
    </>
  )
}

export default SEARCHUSER