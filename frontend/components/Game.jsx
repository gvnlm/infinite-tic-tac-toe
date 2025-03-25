import Grid from './Grid';
import useGameLogic from '../hooks/useGameLogic';
import GameStatus from '../constants/gameStatus';

import '../styles/Game.css';

const Game = () => {
  const [gameStatus, round, cellValues, moveQueue, xIsNext, timeRemaining, handleCellClickAt] =
    useGameLogic();

  return (
    <div className="game">
      <div className="header">
        <p>Round {round}</p>
        {gameStatus === GameStatus.ONGOING && <p>{timeRemaining / 1000}</p>}
        {gameStatus === GameStatus.X_WON && <p>X has won!</p>}
        {gameStatus === GameStatus.O_WON && <p>O has won!</p>}
        {gameStatus === GameStatus.DRAW && <p>Draw!</p>}
      </div>

      <div className="body">
        <Grid
          cellValues={cellValues}
          moveQueue={moveQueue}
          onCellClickAt={handleCellClickAt}
          xIsNext={xIsNext}
        />
      </div>

      <div className="footer">Footer placeholder</div>
    </div>
  );
};

export default Game;
