import React from "react"

export default function Box (props){
    return (
        <div className={props.winner? "box-disabled-tic" 
        : props.draw? "box-disabled-tic" 
        :" Box-tic"} onClick={() => props.handleClick(props.id)}>{props.value}</div>
    )
}