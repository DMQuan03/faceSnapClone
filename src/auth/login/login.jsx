import React, { useState } from 'react'
import "./login.css"
import bg from "../../picture/bg.jpg"
import trees from "../../picture/trees.png"
import girl from "../../picture/girl.png"
import leaf_01 from "../../picture/leaf_01.png"
import leaf_02 from "../../picture/leaf_02.png"
import leaf_03 from "../../picture/leaf_03.png"
import leaf_04 from "../../picture/leaf_04.png"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const LOGIN = () => {

  // thu vien
  const navigate = useNavigate()

  // state register
  const [ register , setRegister ] = useState(false)
  const [textEmailRegister , setTextEmailRegister] = useState("")
  const [textPasswordRegister , setTextPasswordRegister] = useState("")
  const [textPhoneRegister , setTextPhoneRegister] = useState("")
  // state login
  const [textEmailLogin , setTextEmailLogin] = useState("")
  const [textPasswordLogin , setTextPasswordLogin] = useState("")

  // func hanld input

  // handle input of Login //
  const handleInputEmailLogin = (e) => {
    setTextEmailLogin(e.target.value)
  }
  const handleInputPasswordLogin = (e) => {
    setTextPasswordLogin(e.target.value)
  }
  const handleSubmitLogin = () => {
    axios({
      method: "POST",
      url : process.env.REACT_APP_API3,
      data : {
        email : textEmailLogin,
        password : textPasswordLogin
      }
    })
    .then(res => {
      console.log(res);
      sessionStorage.setItem("token", res.data.data.accessToken)
      sessionStorage.setItem("avatar", res.data.data.avatar)
      sessionStorage.setItem("username", res.data.data.fullName)
      sessionStorage.setItem("userId", res.data.data._id)
      setTextEmailLogin("")
      setTextPasswordLogin("")
      navigate("/home")
    })
    .catch(err => {
      console.log(err.message)
      return 0
    })
  }
  // handle input of register //
  const handleInputEmailRegister = (e) => {
    setTextEmailRegister(e.target.value)
  }
  const handleInputPasswordRegister = (e) => {
    setTextPasswordRegister(e.target.value)
  }
  const handleInputPhoneRegister = (e) => {
    setTextPhoneRegister(e.target.value)
  }
  const handleSubmitRegister = async() => {
    try {
      const res = await axios({
        method : "POST",
        url : process.env.REACT_APP_API4,
        data : {
          email : textEmailRegister,
          password : textPasswordRegister,
          phone : Math.floor(textPhoneRegister)
        }
      })
      if (res) {
        setRegister(false)
        setTextEmailRegister("")
        setTextPasswordRegister("")
        setTextPhoneRegister("")
      }
      
    } catch (error) {
      throw new Error(error.message)
    }
  }

  // handle input of Login and register //

  return (
    <section >
      <div className='leaves'>
        <div className='set'>
          <div><img src={`${leaf_01}`} /></div>
          <div><img src={`${leaf_02}`} /></div>
          <div><img src={`${leaf_03}`} /></div>
          <div><img src={`${leaf_04}`} /></div>
          <div><img src={`${leaf_01}`} /></div>
          <div><img src={`${leaf_02}`} /></div>
          <div><img src={`${leaf_03}`} /></div>
          <div><img src={`${leaf_04}`} /></div>
        </div>
      </div>
      <img src={`${bg}`} alt='' className='bg' />
      <img src={`${girl}`} alt='' className='girl' />
      <img src={`${trees}`} alt='' className='trees' />
      {register ?
        <div className='register'>
        <h2>REGISTER</h2>
        <div className='inputBox1'>
          <input value={textEmailRegister} type='text' placeholder='email' onChange={handleInputEmailRegister} />
        </div>
        <div className='inputBox1'>
          <input value={textPasswordRegister} type='password' placeholder='password' onChange={handleInputPasswordRegister} />
        </div>
        <div className='inputBox1'>
          <input value={textPhoneRegister} type='text' placeholder='phone' onChange={handleInputPhoneRegister} />
        </div>
        <div className='inputBox1'>
          <input type='submit' value="Register" id="btn" onClick={handleSubmitRegister} />
        </div>
        <div className='group1'>
          <a href='#'>Forget password</a>
          <a href='#' onClick={() => {
            setRegister(false)
            setTextEmailLogin("")
            setTextPasswordLogin("")
            setTextEmailRegister("")
            setTextPasswordRegister("")
            setTextPhoneRegister("")
          }} >Sign In</a>
        </div>
      </div>
       :
      
      <div className='login'>
        <h2>Sign in</h2>
        <div className='inputBox'>
          <input value={textEmailLogin} type='text' placeholder='email' onChange={handleInputEmailLogin} />
        </div>
        <div className='inputBox'>
          <input value={textPasswordLogin} type='password' placeholder='password' onChange={handleInputPasswordLogin} />
        </div>
        <div className='inputBox'>
          <input type='submit' value="Login" id="btn" onClick={handleSubmitLogin} />
        </div>
        <div className='group'>
          <a href='#'>Forget password</a>
          <a href='#' onClick={() => {
            setRegister(true)
            setTextEmailLogin("")
            setTextPasswordLogin("")
            setTextEmailRegister("")
            setTextPasswordRegister("")
            setTextPhoneRegister("")
          }}>Sign up</a>
        </div>
      </div>
      }
    </section>
  )
}

export default LOGIN