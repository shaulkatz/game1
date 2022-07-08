import React from "react"
import Ball from "./ball"
import Brick from "./brick"
import Base from "./base"
// import useInterval from 'use-interval'

export default function Bord(){

  let [x, setX] = React.useState(130)
   let [y, setY] = React.useState(130)
   const [speed, setSpeed] = React.useState(20)
   const [xVel, setXVel] = React.useState(4)
    const [yVel, setYVel] = React.useState(2)
    const [bricksList, setBricksList] = React.useState([])
    const [brickProperties, setBrickProperties] = React.useState({})
    const [propertiesSet, setPropertiesSet] = React.useState(false)
    const [moved, setMoved] = React.useState(true)
    const [baseX, setBaseX] = React.useState(16)
    const [pressedKey, setPressedKey] = React.useState(true)
  

  useInterval(()=>{
  moveHorizontal()
  moveVertical()
},speed)

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

  function moveHorizontal(){
    setX(prev => prev + xVel)
  }
  function moveVertical(){
    setY(prev => prev + yVel)
  }

  React.useEffect(()=>{
    if(x >= 400-20 || x <= 0){
      setXVel(prev => -prev)
    }

  },[x])

   React.useEffect(()=>{
    
    if(y >= 400-20 || y <= 0){
      setYVel(prev => -prev)
    }
  },[y])

  function stop(){
    setSpeed(null)
  }


React.useEffect(()=>{
   setBrickProperties({
    width: 50,
    height: 25,
  })
   setPropertiesSet(true)

 },[])

React.useEffect(()=>{
  if(propertiesSet){
    for (let i=0; i<(400/brickProperties.width); i++){
      for (let j=0; j<(100/brickProperties.height); j++){
        let newBrick = {
          top: j * brickProperties.height,
          left: i * brickProperties.width,
          id: `${i}-${j}`,
        }
        setBricksList(prev => [...prev, newBrick])
      }

  }

  }

},[propertiesSet])
 

  let bricksRender =  bricksList.map(brick => {

   
      return(
          <Brick
           y={brick.top} 
           x={brick.left} 
           width={brickProperties.width} 
           height={brickProperties.height}
           key={brick.id}/>
        )
    })





  React.useEffect(()=> {
    setMoved(prev => !prev)
  },[y])

  function didHitTopOrBottum(brick){
    if(hitYAcces(brick.top) && inSides(brick.left)){
      return true
    }

  }

  // function didHitSides(brick){
  //   if(hitXAcces(brick.top) && inTopAndBottum(brick.top)){
  //     return true
  //   }

  // }


  function hitXAcces(side){
    if(x===side+brickProperties.width || x===side){
      return true
    }
  }
  function hitYAcces(top){
    if(y===top+brickProperties.height || y===top){
      return true
    }
  }


 function inSides(side){
  if(x<=side+brickProperties.width && x>=side){
    return true
  }
 }

 function inTopAndBottum(top){
  if(y<=top+brickProperties.height && y>=top){
    return true
  }
 }


 function deleteBrick(brick){
  setBricksList(prev => prev.filter(tile => tile.id===brick.id ? false : true))
 }


 function handelHitTopOrBottum(brick){

  setYVel(prev => -prev)
  deleteBrick(brick)
 }

 function handelHitBase(){

  if(yVel===2){
    setYVel(-2)
  }else if (yVel===-2){
    setYVel(2)
  }
 }

 function handelHitSide(brick){
  setXVel(prev => -prev)
  deleteBrick(brick)
 }

 function hitBase(){
  if (y===350 && x>=baseX &&x<=baseX-100){
    return true
  }
 }

 function handelHitBrick(brick) {
  didHitTopOrBottum(brick)? handelHitTopOrBottum(brick) : handelHitSide(brick)
 }


 // React.useEffect(()=>{
 //  bricksList.map(brick => didHitTopOrBottum(brick) ?
 //   handelHitTopOrBottum(brick) :
 //   didHitSides(brick) ?
 //   handelHitSide(brick) :
 //    "")
 // },[moved])

 function hitBrick(brick){
 return inTopAndBottum(brick.top) && inSides(brick.left) ? true : false
 }


 React.useEffect(()=>{
  bricksList.map(brick => 
    hitBrick(brick)
     ? handelHitBrick(brick) 
     : "")   
 },[moved])

 function pressed(event){
  if (event.key==="ArrowLeft" && baseX>=15){
setBaseX(prev => prev -15) 
 }
  }

  // React.useEffect(() => {
    
  //   console.log(baseX)
  // },[pressedKey])
  

React.useEffect(()=> {
  window.addEventListener('keydown', (event) => {
  event.preventDefault()
 pressed(event)
});

},[])




  return(
    <div id="bord">
        {bricksRender}
        <Base x={`${baseX}px`}/>

        
      <div>
    <Ball x={x} y={y}/>
    </div>
    <h1 className = "testing">{baseX}</h1>
    {/*<button onClick={stop}>stop</button>*/}
    </div>
  )
}