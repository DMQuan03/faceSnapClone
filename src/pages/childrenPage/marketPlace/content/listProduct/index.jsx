import React from 'react'

const LISTPRODUCT = () => {

    const {avatar}= sessionStorage
  return (
    <div style={
        {
            position :"relative",
            width : 250,
            height : 330,
            marginLeft : 10,
            marginBottom : 60
        }
    }>
        <div style={
            {
                width : "100%",
                height : "80%",
            }
        }>
            <img style={
                {
                    width : "100%",
                    height : "100%",
                    borderRadius : 10
                }
            } src={avatar} alt='a' />
        </div>
        <div style={
            {
                width : "100%",
                height :"10%",
                backgroundColor : "gray",
                display : "flex",
                justifyContent : "flex-start",
                alignItems : "center",
                textAlign : "center"
            }
        }>
            <p style={
                {
                    marginLeft : 10
                }
            }>MIEN PHI</p>
        </div>
        <div style={
            {
                width : "100%",
                height :"10%",
                backgroundColor : "white",
                display : "flex",
                justifyContent : "flex-start",
                alignItems : "center",
                textAlign : "center"
            }
        }>
            <p style={
                {
                    marginLeft : 10
                }
            }>iphone 14</p>
        </div>
        <div style={
            {
                width : "100%",
                height :"10%",
                backgroundColor : "gray",
                display : "flex",
                justifyContent : "flex-start",
                alignItems : "center",
                textAlign : "center"
            }
        }>
            <p style={
                {
                    marginLeft : 10
                }
            }>noi ban</p>
        </div>
    </div>
  )
}

export default LISTPRODUCT