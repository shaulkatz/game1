
import React from "react"
import BordArray from "./bordArray"
import Colors from "./colors"
import RestartBlack from "./restartIcon.png"
import RestartWhite from "./restartIconWhite.png"

export default function App() {
const [bordGrid, setBordGrid] = React.useState(BordArray)
const [changed, setChanged] = React.useState(false)
const [pressed, setPressed] = React.useState(false)
const [whatPressed, setWhatPressed] = React.useState("")
const [score, setScore] = React.useState(0)
const [gameOver, setGameOver] = React.useState(false)
const [bordCopy, setBordCopy] = React.useState(BordArray)
const [numAdded, setNumAdded] = React.useState(false)
const [didWin, setDidWin] = React.useState(false)
const [newGame, setNewGame] = React.useState(false)
const [moves, setMoves] = React.useState(0)

let renderedBord = bordGrid.map(row => row.map(tile => <div key={tile.id} className="tile-2048" style={{backgroundColor: Colors[tile.value]}}>{tile.value? tile.value : ""}</div>))

React.useEffect(()=> {
  let didWin = false
  bordGrid.map(row => row.map(tile => tile.value===2048 ? setDidWin(true) : ""))
  NewNumber()
  setNumAdded(prev => !prev)
},[changed])


React.useEffect(()=>{
    let newGrid = copy(bordGrid)
    let noMoves = false
  let openedTiles = []
  newGrid.map(row => row.map(tile => tile.value===0 ? openedTiles.push(tile) : "" ))
  if (openedTiles.length===0 && !checkForMoves(newGrid)){
    setGameOver(true)
  }
},[numAdded])

React.useEffect(()=> {
  window.addEventListener('keyup', (event) => {
  event.preventDefault()
  setStatePress(event.key) 
});

},[])
React.useEffect(()=> {
  window.addEventListener('keydown', (event) => {
  event.preventDefault()
});

},[])

React.useEffect(()=>{
 if (whatPressed==="ArrowRight"){
  HandelClickRight()
 }else if (whatPressed==="ArrowLeft"){
  HandelClickLeft()
 }else if (whatPressed==="ArrowUp"){
  HandelClickUp()
 }else if (whatPressed==="ArrowDown"){
  HandelClickDown()
 }

},[whatPressed, pressed])

React.useEffect(()=>{
  NewNumber()
},[newGame])

function restart(){
setBordGrid(BordArray)
setChanged(prev => !prev)
setScore(0)
setGameOver(false)
setBordCopy(BordArray)
setDidWin(false)
setNewGame(prev => !prev)
setMoves(0)
}

function setStatePress(key){
  setWhatPressed(null)
  setWhatPressed(key)
}

function NewNumber(){
  let options = []
  let switchNum = Math.floor(Math.random()*2)
  let newValue = switchNum===0 ? 2 : 4
  bordGrid.map(row => row.map(tile => tile.value===0 ? options.push(tile.id) : ""))
  let randumNum = Math.floor(Math.random()* options.length)
  setBordGrid(prev => prev.map(row => row.map(tile => tile.id===options[randumNum]? {...tile, value:newValue} : tile)))

}

function checkForMoves(grid){
  let moves = false
  for(let i=0; i<4; i++){
    for(let j=0; j<3; j++){
      if(grid[i][j].value===grid[i][j+1].value){
        moves = true
      }
    }
  }
  for(let i=0; i<3; i++){
    for(let j=0; j<4; j++){
      if(grid[i][j].value===grid[i+1][j].value){
        moves = true
      }
    }
  }
  return moves
}

function blankGrid(){
  let grid = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
  ]
  return grid
}

function rotateGrid(grid){
  let newGrid = blankGrid()
   for (let i=0; i<4; i++){
    for(let j=0; j<4; j++){
      newGrid[i][j] = grid[j][i]
    }
  }
  newGrid = newGrid.map(row => reverseArray(row))
  return newGrid
}

function slideArray(arr){
  let useArray = arr
  let full = []
  let empty = []
  useArray.map(tile => tile.value===0? empty.push(tile) : full.push(tile))
  let newArray =  empty.concat(full)
  return newArray
}



function reverseArray(arr){
  let newArray = arr.reverse()
  return newArray
}

function copy(grid){
  let newGrid =blankGrid()
  for (let i=0; i<4; i++){
    for(let j=0; j<4; j++){
      newGrid[i][j] = grid[i][j]
    }
  }
  return newGrid
}

function compare(a, b){
  let same = false
  for (let i=0; i<4; i++){
    for(let j=0; j<4; j++){
       a[i][j] !== b[i][j] ? same = true : same = same
    }
  }
  return same
}



function copyArr (arr){
  let newArr = [0,0,0,0]
  for(let i=0; i<4; i++){
    newArr[i] = arr[i]
  }
  return newArr
}

function combineArray(arr){
  let newArr = copyArr(arr)
    for(let i=2; i>=0; i--){
      if(newArr[i].value!==0 && newArr[i].value===newArr[i+1].value){
        newArr = newArr.map (tile => newArr.indexOf(tile)===i+1 ? {...tile, value: newArr[i].value + newArr[i+1].value } 
                : newArr.indexOf(tile)===i ? {...tile, value: 0 }
                  : tile)
        setScore(prev => prev + newArr[i].value + newArr[i+1].value)
    }
  }
    return newArr
}


function HandelClickDown(){
  let past = copy(bordGrid)
  let templateGrid = rotateGrid(bordGrid)
  templateGrid = rotateGrid(templateGrid)
  templateGrid = rotateGrid(templateGrid)
  templateGrid = templateGrid.map(row => slideArray(row))
  templateGrid = templateGrid.map(row => combineArray(row))
  templateGrid = templateGrid.map(row => slideArray(row))
  templateGrid = rotateGrid(templateGrid)
  

  if (compare(templateGrid, past)){
    setChanged(prev => !prev)
    setBordGrid(copy(templateGrid))
  setBordCopy(copy(templateGrid))
  setMoves(prev => prev+1)
  }
  
  
  
}

function HandelClickLeft(){
  let past = copy(bordGrid)
  let templateGrid = copy(bordGrid)
  templateGrid = templateGrid.map(row => reverseArray(row))
  templateGrid = templateGrid.map(row => slideArray(row))
  templateGrid = templateGrid.map(row => combineArray(row))
  templateGrid = templateGrid.map(row => slideArray(row))
  templateGrid = templateGrid.map(row => reverseArray(row))

  if (compare(templateGrid, past)){
    setChanged(prev => !prev)
     setBordGrid(copy(templateGrid))
  setBordCopy(copy(templateGrid))
  setMoves(prev => prev+1)
  }
  
 
  
}


function HandelClickRight(){
  let past = copy(bordGrid)
  let templateGrid = copy(bordGrid)
  templateGrid = templateGrid.map(row => slideArray(row))
  templateGrid = templateGrid.map(row => combineArray(row))
  templateGrid = templateGrid.map(row => slideArray(row))

  if (compare(templateGrid, past)){
    setChanged(prev => !prev)
    setBordGrid(copy(templateGrid))
  setBordCopy(copy(templateGrid))
  setMoves(prev => prev+1)
  }
  
  
 
}

function HandelClickUp(){
  let past = copy(bordGrid)
  let templateGrid = rotateGrid(bordGrid)
  templateGrid = templateGrid.map(row => slideArray(row))
  templateGrid = templateGrid.map(row => combineArray(row))
  templateGrid = templateGrid.map(row => slideArray(row))
  templateGrid = rotateGrid(templateGrid)
  templateGrid = rotateGrid(templateGrid)
  templateGrid = rotateGrid(templateGrid)

  if (compare(templateGrid, past)){
    setChanged(prev => !prev)
    setBordGrid(copy(templateGrid))
  setBordCopy(copy(templateGrid))
  setMoves(prev => prev+1)
  }
  
  
  
}


  return (
    <div className="screen-2048">
    <div className="game-name-2048">2048</div>
       
    <div className="game-2048">
    <div className="grid-2048">
      {!didWin && !gameOver ? renderedBord : gameOver? <div className="end-box-2048"> <div className="end-text-2048">game over</div> <div onClick={restart} className="restart-2048">⟳</div></div> : <div className="end-box-2048"> <div className="end-text-2048">YOU WIN!</div> <div onClick={restart} className="restart-2048">⟳</div></div> }

    </div>
    
        <div className="header-2048">
            
            <div className= "score-2048"><div>SCORE: </div><div className="score-num-2048"> {score}</div></div>
            <div className= "score-2048"><div>MOVES: </div><div className="score-num-2048"> {moves}</div></div>
            <div onClick={restart} className="restart-2048">⟳</div>
        </div>
    </div>

    </div>
  );
}

