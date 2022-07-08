import React from "react"
import CreatArray from "./boxArray"
import Box from "./box"
import Render from "./render"
import RestartIcon from "./restartIcon.png"



export default function App(){



  const [bordSize, setBordSize] = React.useState()
  const [bord, setBord] = React.useState(CreatArray(bordSize))
  const [numOfMine, setNumOfMine] = React.useState()
  const [renderedMines, setRenderedMines] = React.useState(false)
  const [clickedTile, setclickedTile] = React.useState([])
  const [gameOver, setGameOver] = React.useState(false)
  const [clickedOpened, setClickedOpened] = React.useState(0)
  const [minesLeft, setMinesLeft] = React.useState(numOfMine)
  const [win, setWin] = React.useState(false)
  const [newGame, setNewGame] = React.useState(0)
  const [levelPicked, setLevelPicked] = React.useState(false)

  

  function renderMines(){
    const mines = []
      while(mines.length < numOfMine){
        const position ={
          x: Math.floor(Math.random()*(bordSize-1)),
          y: Math.floor(Math.random()*(bordSize-1))
        }
        if (!mines.some(bomb => match(bomb, position))){
           mines.push(position)
          setBord(prev => 
          prev.map(row => 
            row.map(clm => 
              clm.x===position.x && clm.y===position.y ? {...clm, isBomb: true} : clm)))
        }
      }
      setRenderedMines(true)
  }

  function match(a, b){
    return a.x===b.x && a.y===b.y
  }

  React.useEffect(()=>{
      let counter = 0
      bord.map(row => row.map(clm => clm.clicked ? counter += 1 : ""))
      if (counter=== (bordSize*bordSize) - numOfMine){
        setWin(true)
      }
      console.log(counter)
  },[bord])


function FindNearTiles({x, y}){
  const tiles = []

  for(let xoffset=-1; xoffset<=1; xoffset++){
    for(let yoffset=-1; yoffset<=1; yoffset++){
      const tile = bord[yoffset + y]?.[xoffset + x]
      if (xoffset!==0 || yoffset!==0){
        tiles.push(tile)
      }
      
    }
  }
 const filteredTiles = tiles.filter((item) => {
  return item
 })

  return filteredTiles
}
React.useEffect(()=>{
  restartGame()
},[levelPicked])


React.useEffect(()=>{
  SetValue()

},[renderedMines])

function SetValue(){
   for (let i=0; i<bordSize; i++){
    for (let j=0; j<bordSize; j++){
      let count = 0
      let near = FindNearTiles(bord[j][i])
      for (let w=0; w<near.length; w++){
        if(near[w].isBomb){
          count++
        }
      } 
      setBord(prev => prev.map(row => row.map(clm => clm.id===bord[j][i].id? {...clm, value: count} : clm)))
    }
  }
}

React.useEffect(()=>{
 clickedTile.shift()
},[clickedOpened])
  
  function manageZero(tile){
    let near = FindNearTiles(tile)
    near.map(tile => {
      HandelClick(tile)
    })
    setClickedOpened(prev => prev + 1)
  }
  
React.useEffect(()=> {

clickedTile.map(tile => manageZero(tile)  )

},[clickedTile])


  function HandelClick(tile){
    if(!tile.rightClick){
       if(!gameOver && !win){
        if(!tile.clicked){
     setBord(prev => prev.map(row => row.map(clm => clm.id===tile.id? {...clm, clicked: true} : clm)))
     if(tile.isBomb){
      setGameOver(true)
     }else if(tile.value===0){
      setclickedTile(prev => [...prev, tile])
    }
    } 
 
    }
    
    }
   
}

React.useEffect(()=> {
  if (gameOver){
    setBord(prev => prev.map(row => row.map(clm => clm.isBomb? {...clm, clicked: true} : clm)))
  }

},[gameOver])
    


function RightClick (event, tile){
  event.preventDefault()
  if(!win){
      if (!tile.clicked){
    if (!tile.rightClick){
      setBord(prev => prev.map(row => row.map(clm => clm.id===tile.id? {...clm, rightClick: true} : clm)))
      setMinesLeft(prev => prev -1)
    } else if (tile.rightClick){
      setBord(prev => prev.map(row => row.map(clm => clm.id===tile.id? {...clm, rightClick: false} : clm)))
      setMinesLeft(prev => prev +1)
    }
    
  }
  }

}

   // function winning(){
   //  setBord(prev => prev.map(row => row.map(clm => !clm.isBomb? {...clm, clicked: true} : clm)))
   // }
   // function flag(){
   //  setBord(prev => prev.map(row => row.map(clm => clm.isBomb? {...clm, rightClick: true} : clm)))
   // }

   // function Winner(){
   //  setWin(true)
   // }

   React.useEffect(()=>{
    renderMines()
   },[newGame])

function restartGame (){
  setBord(CreatArray(bordSize))
  setRenderedMines(false)
  setclickedTile([])
  setGameOver(false)
 setClickedOpened(0)
 setMinesLeft(numOfMine)
 setWin(false)
 setNewGame(prev=> prev+1)

}
function pickLevel(level){
  if (level==="easy"){
    setBordSize(10)
    setNumOfMine(15)
  } else if (level==="medium"){
    setBordSize(15)
    setNumOfMine(35)
  } else if (level==="hard"){
    setBordSize(20)
    setNumOfMine(50)
  }
  setLevelPicked(true)
}

function restart(){
  setLevelPicked(false)
}
 
  return(
    <div>

        

        {levelPicked? 
        <div className="grid-mine"> 
        {win || gameOver? <div className="placeHolder-mine"></div> :  ""}
        {win || gameOver? "":
            <div className="head-mine">
                <img src={RestartIcon} className="restartIconConstant-mine" onClick={restart}/>
                <h1 className="mineCounter-mine">MINES LEFT: {minesLeft>=0? minesLeft : "0"} </h1>
            </div>
          }
        {gameOver? 
              <div className="gameOverBase-mine">
                <h1 className="gameOverlable-mine">GAME OVER</h1>
                <img src={RestartIcon} className="restartIcon-mine" onClick={restart}/>
            </div>
            : win?
             <div className="gameOverBase-mine">
                <h1 className="gameOverlable-mine">You Win</h1>
                <img src={RestartIcon} className="restartIcon-mine" onClick={restart}/>
            </div>

            :""}
            <Render Array={bord} handelClick={HandelClick} gameOver={gameOver} handelContextMenu={RightClick}/>
           
       </div>
       : 
       <div className="gridPickLevel-mine">
        <div className="level-mine" onClick={() => pickLevel("easy")}>EASY</div>
        <div className="level-mine" onClick={() => pickLevel("medium")}>MEDIUM</div>
        <div className="level-mine" onClick={() => pickLevel("hard")}>HARD</div>
        </div>}
{/*       <button onClick={winning}>WIN</button>
       <button onClick={flag}>Flag</button>*/}
      
    </div>
  )
}
