import React from "react"
import Games from "./games"
import NavBar from "./navbar"
import HomeIcon from "./icons/Home-icon.png"

export default function App() {
  const [whatGame, setWhatGame] = React.useState("home")

  function chooseGame (picked){
    setWhatGame(picked)
  }
  return (
    <div className="App">
        <div className="choose-game">
            { whatGame === "home" ? 
            <NavBar handelClick = {chooseGame}/> 
            : <img src={HomeIcon} className="home-icon" onClick={() => chooseGame("home")} />}
        </div>

        <Games gameShow={whatGame}/>
    </div>
  );
}

