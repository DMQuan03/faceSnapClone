import React, { useEffect, useState } from 'react'
import HEADERROOM from './components/header'
import CONTENTROOM from './components/contentRoom'
import { useSelector } from 'react-redux'

const INFOROOMCHAT = () => {
  const [data , setData] = useState([])
  const room = useSelector(state => state.chat.infoRoom)

  useEffect(() => {
    setData(room)
  }, [room])

  return (
    <div style={
      {
        position : "absolute",
        bottom : 0,
        top : 0,
        width : '100%'
      }
    }>
      {Object.keys(room)?.length > 0 ? <div>
        <HEADERROOM data={[data]} />
        <CONTENTROOM data={data} />
      </div> : 
      <div style={
        {
          width : "100%",
          height : "100%",
          backgroundColor : "black",
          color : "wheat"
        }
      }>ban chua vao room nao ca</div>
      }
    </div>
  )
}

export default INFOROOMCHAT