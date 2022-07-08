import React from "react"

export default function Ball(props){

  const mystyle ={
    top: props.y,
    left: props.x
  }

  return(
    <div id="ball" style={mystyle}>
    </div>
  )
}