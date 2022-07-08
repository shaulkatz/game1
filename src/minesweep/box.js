import React from "react"
import Bomb from "./bomb.png"
import Flag from "./flag.png"

export default function Box (props){
	return(
		<div 
			onContextMenu={(event)=> props.handelContextMenu(event,props.tile)}
			onClick={()=> props.handelClick(props.tile)}
			className={props.className}>
			{props.clicked? 
				props.isBomb? 
					<img className="bomb-mine" src={Bomb}/>
				: props.value===0?
					"" 
					: props.value 
			: props.rightClick? 
				<img className="bomb-mine" src={Flag}/>
				:""}
		</div>
		)
	
}

