import React from "react"

export default function Food (props){
	const mystyle = {
      position: "absolute",
      left: `${props.left}%`,
      top: `${props.top}%`
      
    };  
	return(
		<div className="food-snake" style={mystyle}></div>)
}