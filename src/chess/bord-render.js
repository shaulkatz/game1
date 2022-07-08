import React from "react"


export default function BordRender (){

	const rows = ["8","7","6","5","4","3","2","1"]
	const clms = ["a","b","c","d","e","f","g","h"]

	let bord = []

	for(let i=0; i<rows.length; i++){
		for (let j=0; j<clms.length; j++){
			let className = (i+j)%2===0 ? "white-tile" : "black-tile"
			bord.push(<div className={className}>{rows[i]+clms[j]}</div>)
		}
	}
	return(
		<div className="bord">
			{bord}
		</div>
		)
}