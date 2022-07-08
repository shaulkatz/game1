import React from "react"
import Box from "./box"

export default function(props){

	const grid = props.Array
	.map(row => 
		<div key={row[0].id}
			className="row-mine">
			{row
				.map(clm => 
					<Box 
					className={clm.rightClick? "flag-mine" : props.gameOver? "gameOver-mine" : clm.clicked? "clicked-mine" : "box-mine"} 
					handelClick={props.handelClick} 
					key={clm.id} 
					id={clm.id} 
					clicked={clm.clicked}
					isBomb={clm.isBomb}
					value={clm.value}
					tile={props.Array[clm.y][clm.x]}
					gameOver={props.gameOver}
					handelContextMenu={props.handelContextMenu}
					rightClick={clm.rightClick}
			
					/>)}
				</div>)


	return(
		<div className="grid-mine">

			{grid}
		</div>
		)
}