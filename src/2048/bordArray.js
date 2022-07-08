import React from "react"

export default function BordArray (){
	let bord = new Array(4)
	for(let i=0; i<4; i++){
		bord[i] = new Array(4)
		for(let j=0; j<4; j++){
			bord[i][j] = {id:`${i}${j}`, value: 0 , color: "blue", x: i, y: j, option: true}
		}
	}

	return(
		bord
		)
}