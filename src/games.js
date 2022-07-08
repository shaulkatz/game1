import React from "react"
import Chess from "./chess/App"
import MineSweep from "./minesweep/App"
import Thousend from "./2048/App"
import BrickBreaker from "./brickBreaker/App"
import Snake from "./snake/App"
import TicTacToe from "./tic-tac-toe/App"
import GamesIndex from "./games-index"

export default function Games (props){
	let showenGame = props.gameShow

	return(
		<div className="gameShowing">
		{showenGame==="Chess" ? <Chess />: ""}
		{showenGame==="MineSweep" ? <MineSweep />: ""}
		{showenGame==="Thousend" ? <Thousend />: ""}
		{showenGame==="BrickBreaker" ? <BrickBreaker />: ""}
		{showenGame==="Snake" ? <Snake />: ""}
		{showenGame==="TicTacToe" ? <TicTacToe />: ""}

		</div>
		)
}