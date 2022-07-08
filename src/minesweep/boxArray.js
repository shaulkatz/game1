import React from "react"

export default function CreatArray (bordSize){

	 let bord = new Array(bordSize)
	 for (let i=0; i<bord.length; i++){
	 	bord[i] = new Array(bordSize)
	 		for( let j=0; j<bord[i].length; j++){
	 			bord[i][j] = {value: 0, clicked: false, id: `${i}-${j}`, x: j, y: i, isBomb: false, rightClick: false, flag: false}
	 		}
	 }

	return(
		bord
		)
}