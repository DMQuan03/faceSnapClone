import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./index.module.scss"
import LISTFRIENDS from './listfriends'
import {
    BiArrowBack,
    
} from "react-icons/bi"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import friends from '../../../../redux/slice/friends'


const cx = classNames.bind(styles)

const test = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
]
const ALLFRIENDS = () => {

    const {token} = sessionStorage
    const dispatch = useDispatch()
    const [listFriends , setListFriends] = useState([] ?? [])

    useEffect(() => {
        axios({
            method : "get",
            url : "http://localhost:3456/api/utils/getlistfriends",
            headers : {
               authorization :  `Bearer ${token}`
            } 
        })
        .then(res => {
            setListFriends(res.data.data);
        })
        .catch(err => {
            console.log(err);
            return 0
        })
    }, [])

    useEffect(() => {
        return () => {
            setListFriends([])
        }
    }, [])
  return (
    <div className={cx("wrapper")}>
        <header className={cx("header_all_friends")}>
            <div style={
                {
                    width : 50,
                    height : "100%",
                    display : "flex",
                    justifyContent : "center",
                    textAlign : 'center',
                    alignItems : 'center'
                }
            }>
                <div onClick={() => {
                    dispatch(friends.actions.showHomePage())
                }}>
                    <BiArrowBack style={
                        {
                            width : 20,
                            height : 20,
                            rotate : '90deg'
                        }
                    } />
                </div>
            </div>
            <div style={
                {
                    width : 200,
                    height : "100%"
                }
            }>
                <div style={
                    {
                        position :"relative",
                        display : "flex",
                        justifyContent : "flex-start",
                        alignItems : "center",
                        textAlign : 'center',
                        width : "100%",
                        height : "50%",
                    }
                }>
                    <p style={
                        {
                        }
                    }>ban be</p>
                </div>
                <div style={
                    {
                        width : "100%",
                        height : "50%",
                        display : "flex",
                        justifyContent : "flex-start",
                        alignItems : "center",
                        textAlign : "center",
                    }
                }>
                    <h2>Tất cả bạn bè</h2>
                </div>
            </div>
        </header>
        
        <div style={
            {
                width : "100%",
                height : "100%",
                maxHeight : 712,
                marginBottom : 20,
                overflow : "auto",
                marginLeft : 12
            }
        }>
            <div style={
            {
                width : "100%",
                height : 50,
                display : "flex",
                justifyContent : 'center',
                alignItems : "center",
                textAlign : "center"
            }
            }>
                <input placeholder='Tìm kiếm bạn bè' style={
                    {
                        width : '90%',
                        height : "60%",
                        border : "none",
                        outline : "none",
                        borderRadius : 20,
                        backgroundColor : "#f0f2f5"
                    }
                } />
            </div>
            <div style={
                {
                    width : "100%",
                    height : 30,
                    display : "flex",
                    alignItems : "center",
                    textAlign : "center",
                    justifyContent : "flex-start"
                }
            }>
                <p style={
                    {
                        fontWeight : 500
                    }
                }>1.324 người bạn</p>
            </div>
            <div>
                {listFriends &&  listFriends?.map(el => (
                    <LISTFRIENDS key={el._id} data={el} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default ALLFRIENDS