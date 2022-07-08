import React from "react"
import Boxes from "./Boxes"
import Box from "./Box.js"
import Restart from "./restart.js"

export default function App (){
    const [boxArray, setBoxArray] = React.useState(Boxes)
    const [whoTurn, setWhoTurn] = React.useState("X")
    const [winner, setWinner] = React.useState(null)
    const [draw, setDraw] = React.useState(false)

    
    function checkWinner(){
        let winArray = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        winArray.map(array => {
            const [a,b,c] = array
            if(boxArray[a].value 
            && boxArray[a].value === boxArray[b].value
            && boxArray[b].value === boxArray[c].value){
                setWinner(whoTurn==="X"? "O" : "X")
                
            }
        })
    }

    function checkDraw(){
        if(
        boxArray[0].value
        && boxArray[1].value
        && boxArray[2].value
        && boxArray[3].value
        && boxArray[4].value
        && boxArray[5].value
        && boxArray[6].value
        && boxArray[7].value
        && boxArray[8].value
        ){
            setDraw(true)
        }
    }
    
    
    React.useEffect(() => {
      checkWinner()
      },[whoTurn])
      
    //   יש מצב שיותר נכון להשתמש באלה כטריגר אבל זה עובד גם ככה
    // [boxArray[0].value,
    // boxArray[1].value,
    //  boxArray[2].value,
    //   boxArray[3].value,
    //    boxArray[4].value,
    //     boxArray[5].value,
    //      boxArray[6].value,
    //       boxArray[7].value,
    //        boxArray[8].value]
       
       
    React.useEffect(() => {
      checkDraw()
      },[whoTurn])
      
    function renderBox(id){
       setBoxArray(prevArray => {
            return prevArray.map((square) => {
                return square.id === id ? {...square, value: whoTurn} : square
            })
        })
    }
    
     function nextPlayer(){
         setWhoTurn(prevTurn => {
             return whoTurn === "X" ? "O" : "X"
         })
     }
    
    function handleClick(id){
        if (!boxArray[id].value && !winner){
        renderBox(id)
        nextPlayer()
        }
    }
    
    function restart(){
        setBoxArray(Boxes)
        setWhoTurn("X")
        setWinner(null)
        setDraw(false)
        }
        function endGame (){
            setDraw(true)
        }
    
    
    const boxElements = boxArray.map(square => {
        return(
            <Box 
            key={square.id} 
            id={square.id} 
            value={square.value} 
            handleClick={handleClick}
            winner={winner}
            draw={draw}/>
        )
    })

    return (
        <div>
        <div className="container-title-tic">{!winner && !draw? <h1 className="text-title-tic">It is {whoTurn}'s turn</h1>: ""}</div>
        <div className={winner? "game-area-disabled-tic" 
        : draw? "game-area-disabled-tic" 
        : "game-area-tic"}>
            
            {draw && !winner? <div className="tie-game-tic"><h1>Tie game!</h1></div> : ""}
            
            {winner? <h1 className="winner-tic">{`player ${winner} wins!!!`}</h1> : ""}
            <div className="BoxGrid-tic">
                {boxElements}
            </div>
            <Restart handelClick={restart}/>
            
            </div>
    

        </div>
    )
}
