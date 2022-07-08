import React from "react"
import Snake from "./snake"
import snakeArray from "./snakeArray"
import Food from "./Food"
// import useInterval from 'use-interval'
import playIcon from "./playIcon.png"
import pauseIcon from "./pauseIcon.png"
import restartIcon from "./restartIcon.png"
import restartIconWhite from "./restartIconWhite.png"


export default function App(){

		const [newSnakeArray, setNewSnakeArray] = React.useState(snakeArray)
		const [direction, setDirection] = React.useState("right")
		const [whatPress, setWhatPress] = React.useState("right")
		const [play, setPlay] = React.useState(false)
		const [speed, setSpeed] = React.useState(null)
		const [gameOver, setGameOver] = React.useState(false)
		const [moved, setMoved] = React.useState(true)
		const [score, setScore] = React.useState(0)
		const [foodLeft, setFoodLeft] = React.useState ()
		const [foodTop, setFoodTop] = React.useState ()
		const [levelPicked, setLevelPicked] = React.useState(false)
		const [initialSpeed, setInitialSpeed] = React.useState()
		

		const snakeRender = newSnakeArray.map(box => {
		return(
		<Snake left={box.left} top={box.top} />

		)
	})



React.useEffect(()=> {
	asignFoodCords()
},[score])


React.useEffect(()=>{
	const left = newSnakeArray[newSnakeArray.length-1].left
	const top = newSnakeArray[newSnakeArray.length-1].top
	 if (left===foodLeft && top===foodTop){
			setScore(prevScore => prevScore +1)
		setNewSnakeArray(prevSnake => {
			return([
				{
					left: prevSnake[0].left,
					top: prevSnake[0].top
				},
				...prevSnake
				])
		})
	}
},[moved])

React.useEffect(()=>{
	if(whatPress===" "){
	setPlay(prevPlay => !prevPlay)
}
},[whatPress])

React.useEffect(()=>{
	if (play && !gameOver){
		setSpeed(initialSpeed)
	}else if (gameOver || !play){
		setSpeed(null)
	}
},[play, gameOver])


function restart(){
	setNewSnakeArray(snakeArray)
	setDirection("right")
	setWhatPress("right")
	setPlay(false)
	setSpeed(null)
	setGameOver(false)
	setScore(0)
	setInitialSpeed()
	setLevelPicked(false)
}

function pickLevel(pickedspeed){
	setInitialSpeed(pickedspeed)
	setLevelPicked(true)
}
function initialPlay (){
	if(levelPicked && !gameOver){
		setPlay(prevPlay=> !prevPlay)
	}
}


function asignFoodCords(){
		const newFoodLeft=Math.floor(Math.random() * 33)*3
		const newFoodTop=Math.floor(Math.random() * 33)*3
		newSnakeArray.map(box => {
			if (newFoodLeft===box.left && newFoodTop===box.top){
				asignFoodCords()
			}else{
				setFoodLeft(newFoodLeft)
				setFoodTop(newFoodTop)
			}
		})
	}


function moveSnake(newLeft, newTop){
	newSnakeArray.map(box => {
		if (box.left===newLeft && box.top===newTop){
			setGameOver(true)
		}
	})
	if (newLeft<0 || newLeft>97 || newTop<0 || newTop>97){
		setGameOver(true)
	} else{
		setNewSnakeArray(prevSnake => {
		return(
			[
			...prevSnake,
			{
				left: newLeft,
				top: newTop
			}


			]
			)
	})
	setNewSnakeArray(prevSnake => {
		return(
			prevSnake.slice(1)
			)
	})}
}


		
	function moveRight(){
		if (direction !== "left"){
			setDirection("right")
			const newLeft= newSnakeArray[newSnakeArray.length-1].left+3
			const newTop = newSnakeArray[newSnakeArray.length-1].top
			moveSnake(newLeft, newTop)
			setMoved(prevMove => !prevMove)
	}

	}

	function moveLeft(){
		if (direction !== "right"){
			setDirection("left")
			const newLeft= newSnakeArray[newSnakeArray.length-1].left-3
			const newTop = newSnakeArray[newSnakeArray.length-1].top
			moveSnake(newLeft, newTop)
			setMoved(prevMove => !prevMove)
}
}

function moveDown(){
	if (direction !== "up"){
		setDirection("down")
		const newLeft= newSnakeArray[newSnakeArray.length-1].left
		const newTop = newSnakeArray[newSnakeArray.length-1].top+3
		moveSnake(newLeft, newTop)
		setMoved(prevMove => !prevMove)
}
}

function moveUp(){
	if (direction !== "down"){
		setDirection("up")
		const newLeft= newSnakeArray[newSnakeArray.length-1].left
		const newTop = newSnakeArray[newSnakeArray.length-1].top -3
		moveSnake(newLeft, newTop)
		setMoved(prevMove => !prevMove)
}
}

useInterval(()=>{
	if(direction==="right"){
  		moveRight()
  	} else if (direction==="left"){
  		moveLeft()
  	} else if (direction==="up"){
  		moveUp()
  	}else if(direction==="down"){
  		moveDown()
  	}
},speed)

React.useEffect(()=>{
	if(whatPress==="ArrowRight" || whatPress==="d"){
  		if (direction !== "left" ){
  		setDirection("right")
  		setPlay(true)
  	}
  	} else if (whatPress==="ArrowLeft" || whatPress==="a"){
  		if (direction !== "right"){
  		setDirection("left")
  		setPlay(true)
  	}
  	} else if (whatPress==="ArrowUp" || whatPress==="w"){
  		if (direction !== "down"){
  		setDirection("up")
  		setPlay(true)
  	}
  	}else if(whatPress==="ArrowDown" || whatPress==="s"){
  		if (direction !== "up"){
  		setDirection("down")
  		setPlay(true)
  	}
  	}
},[whatPress])

function setStatePress(key){
	setWhatPress(null)
	setWhatPress(key)
}

React.useEffect(()=> {
	window.addEventListener('keydown', (event) => {
	event.preventDefault()
	setStatePress(event.key) 
});

},[])

 function useInterval(callback, delay) {
  const savedCallback = React.useRef(callback)


  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}



	return(
		<div>
			<div className="top-bar-snake">
			{levelPicked && !gameOver?<img  className="button-snake"src={play? pauseIcon : playIcon} onClick={initialPlay}/> : ""}
			{!gameOver && levelPicked? <img  className="button-snake"src={restartIcon} onClick={restart}/> : ""}		
			<h1 className="score-snake">SCORE: {score}</h1>
			</div>

			<div className={gameOver || !levelPicked? "game-area-dark-snake" : "game-area-snake"} >
				<div className="test"></div>
				{levelPicked && !gameOver? <Food left={foodLeft} top={foodTop}/>:""}
				{gameOver? <img  className="dark-restart-snake"src={restartIconWhite} onClick={restart}/> : ""}
				{gameOver? <h1 className="game-over-snake">GAME OVER</h1> : ""}
				{gameOver? <h1 className="your-score-snake">you score is {score}</h1> : ""}
				{!levelPicked? <div>
					<h1 className="level-snake" onClick={()=>pickLevel(400)}>EASY</h1>
					<h1 className="level-snake" onClick={()=>pickLevel(200)}>MEDIUM</h1>
					<h1 className="level-snake" onClick={()=>pickLevel(100)}>HARD</h1>
				</div> :""}

			{levelPicked && !gameOver? snakeRender : ""}
			
		</div>
		
		</div>

	)
}
