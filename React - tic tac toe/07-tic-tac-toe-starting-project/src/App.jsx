import { useState } from 'react';

import Player from './components/Player.jsx';
import Gameboard from './components/Gameboard.jsx';
import Log from './components/Log.jsx'


function App() {
const [gameTurns, setGameTurns] = useState([]);
const [ activePlayer, setActivePlayer ] = useState('X');

function handleSelectSquare(){
  setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
  setGameTurns();
}

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName="Player 1" 
            symbol= "X" 
            isActive={activePlayer === 'X'}
          /> 
          <Player 
            initialName="Player 2" 
            symbol= "O" 
            isActive={activePlayer === 'O'}/>
        </ol>
        <Gameboard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      </div>
    </main>
  )
}

export default App
