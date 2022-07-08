import React from "react"
import ChessIcon from "./icons/Chess-icon.png"
import ThousendIcon from "./icons/2048-icon.jpg"
import MineIcon from "./icons/Bomb-icon.png"
import BrickBreakerIcon from "./icons/Brick-icon.png"
import SnakeIcon from "./icons/Snake-icon.png"
import XOIcon from "./icons/xo-icon.png"

export default function NavBar (props){

	let chooseGame = props.handelClick

return (
	<div>
		<h1 className="navbar-title">MY GAMES</h1>
		<div className="game-index-grid">
			<img src={ChessIcon} className="game-index-tile" onClick={() => chooseGame("Chess")} />
		    <img src={SnakeIcon} className="game-index-tile" onClick={() => chooseGame("Snake")} />
		    <img src={XOIcon} className="game-index-tile" onClick={() => chooseGame("TicTacToe")} />
		    <img src={BrickBreakerIcon} className="game-index-tile" onClick={() => chooseGame("BrickBreaker")} />
			<img src={ThousendIcon} className="game-index-tile" onClick={() => chooseGame("Thousend")} />
			<img src={MineIcon} className="game-index-tile" onClick={() => chooseGame("MineSweep")} />
	    </div>
	 </div>
	)
}