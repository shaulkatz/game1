import React from "react"


export default function Base(props){

	let myStyle = {
		position: "absolute",
		top: "350px",
		left: props.x,
		width: "100px",
		height: "25px",
		backgroundColor: "yellow"
	}
	return(
		<div className="base-brick" style={myStyle}></div>
		)
}