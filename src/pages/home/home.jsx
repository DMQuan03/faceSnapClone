import React, { useEffect, useState } from 'react'
import "./home.css"
import avatar4k from "../../picture/hinh-nen-4k-game_105910896.jpg"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const HOME = () => {
    // thu vien
    const navigate = useNavigate()
    const { token } = sessionStorage
    const [checkLogin , setCheckLogin] = useState(false)

    useEffect(() => {
        axios({
            method : "get",
            url : process.env.REACT_APP_BASE_URL + "/user/currentuser/",
            headers : {
                authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            setCheckLogin(true)
            return 1
        })
        .catch(err => {
            navigate("/")
            console.log(err.message)
            return 0
        })
    }, [])

    useEffect(() => {
        if (checkLogin) {
            let days = document.getElementById("days")
            let hours = document.getElementById("hours")
            let minutes = document.getElementById("minutes")
            let seconds = document.getElementById("seconds")
    
            let dd = document.getElementById("dd")
            let hh = document.getElementById("hh")
            let mm = document.getElementById("mm")
            let ss = document.getElementById("ss")
    
            let day_dot = document.querySelector(".day_dot")
            let hr_dot = document.querySelector(".hr_dot")
            let min_dot = document.querySelector(".min_dot")
            let sec_dot = document.querySelector(".sec_dot")
    
            let endDate = "01/01/2024 00:00:00"
    
            let x = setInterval(() => {
                let now = new Date(endDate).getTime();
                let countDown = new Date().getTime()
                let distance = now - countDown
    
                let d = Math.floor(distance/ (1000 * 60 * 60 * 24))
                let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                let s = Math.floor((distance % (1000 * 60)) / (1000))
                
                days.innerHTML = d + "<br/><span>Days</span>"
                hours.innerHTML = h + "<br/><span>Hours</span>"
                minutes.innerHTML = m + "<br/><span>Minutes</span>"
                seconds.innerHTML = s + "<br/><span>Seconds</span>"
                
                dd.style.strokeDashoffset = 440 - (440 * d) / 365
                hh.style.strokeDashoffset = 440 - (440 * h) / 24
                mm.style.strokeDashoffset = 440 - (440 * m) / 60
                ss.style.strokeDashoffset = 440 - (440 * s) / 60
    
                day_dot.style.transform = `rotateZ(${d * 0.986}deg)`
                hr_dot.style.transform = `rotateZ(${h * 15}deg)`
                min_dot.style.transform = `rotateZ(${m * 6}deg)`
                sec_dot.style.transform = `rotateZ(${s * 6}deg)`
    
                if (distance < 0) {
                    clearInterval(x)
                    document.getElementById("time").style.display = "none"
                    document.querySelector(".newYear").style.display = "block"
                }
            }, 1000)
        }
    }, [checkLogin])


  return (
    <>
        {checkLogin && <div className='wrapper888'>
            <img className='earth' src={`${avatar4k}`} />
            <nav className='navbar'>
                <button className='btn_nav one'>HOME</button>
                <button className='btn_nav two' onClick={() => {
                    navigate("/facebook")
                }}>FACEBOOK</button>
                <button className='btn_nav three'>PROFILE</button>
                <button className='btn_nav four' onClick={() => {
                    navigate("/chat")
                }}>CHAT</button>
                <button className='btn_nav five' 
                onClick={() => {
                    navigate("/searchuser")
                }}
                >SEARCH</button>
                <button className='btn_nav six' onClick={() => {
                    navigate("/")
                    sessionStorage.clear()
                }}>LOGOUT</button>
            </nav>
            <div id="time">
                <div className='circle'>
                    <div className='dots day_dot'></div>
                    <svg>
                        <circle cx={70} cy={70} r={70}></circle>
                        <circle cx={70} cy={70} r={70} id='dd'></circle>
                    </svg>
                    <div id="days" >00<br/><span>Days</span></div>
                </div>
        
                <div className='circle1'>
                    <div className='dots hr_dot'></div>
                    <svg>
                        <circle cx={70} cy={70} r={70}></circle>
                        <circle cx={70} cy={70} r={70} id='hh'></circle>
                    </svg>
                    <div id="hours" >00</div>
                </div>
        
                <div className='circle2'>
                    <div className='dots min_dot'></div>
                    <svg>
                        <circle cx={70} cy={70} r={70}></circle>
                        <circle cx={70} cy={70} r={70} id='mm'></circle>
                    </svg>
                    <div id="minutes" >00</div>
                </div>
        
                <div className='circle3'>
                    <div className='dots sec_dot'></div>
                    <svg>
                        <circle cx={70} cy={70} r={70}></circle>
                        <circle cx={70} cy={70} r={70} id='ss'></circle>
                    </svg>
                    <div id="seconds" >00</div>
                </div>
        
                
            </div>
                <h2 className='newYear'>2023<br/><span>Happy New Year</span></h2>
        </div>}
    </>
  )
}

export default HOME