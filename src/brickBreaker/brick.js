import React from "react"

export default function Brick(props){

	const mystyle = {
		top: props.y,
		left: props.x,
		border: "2px green solid",
		boxSizing: "border-box",
		width: props.width,
		height: props.height,
		backgroundColor: "blue"

	}
	return (
			<div className="brick" style={mystyle}> </div>
		)
}