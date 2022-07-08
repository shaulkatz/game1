import React from "react"

export default function Snake(props){
	const mystyle = {
      position: "absolute",
      left: `${props.left}%`,
      top: `${props.top}%`
    };
	return(
		<div>
			<div className="dot-snake" style={mystyle}></div>
		</div>
		)
}