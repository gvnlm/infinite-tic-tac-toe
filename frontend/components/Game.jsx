import Grid from './Grid';
import CountdownBar from './CountdownBar';
import useGameLogic from '../hooks/useGameLogic';
import GameStatus from '../constants/gameStatus';

import '../styles/Game.css';

const Game = () => {
  const [
    gameStatus,
    round,
    cellValues,
    moveQueue,
    xIsNext,
    xTimeRemaining,
    oTimeRemaining,
    xTimeRemainingPercent,
    oTimeRemainingPercent,
    resettingCellIndex,
    handleCellClickAt,
  ] = useGameLogic();

  return (
    <div className="game">
      <div className="header">
        <p>Round {round}</p>
        {gameStatus === GameStatus.X_WON && <p>X has won!</p>}
        {gameStatus === GameStatus.O_WON && <p>O has won!</p>}
        {gameStatus === GameStatus.DRAW && <p>Draw!</p>}
      </div>

      <div className="body">
        <CountdownBar
          timeRemaining={xTimeRemaining}
          percentRemaining={xTimeRemainingPercent}
          side="left"
        />

        <Grid
          cellValues={cellValues}
          moveQueue={moveQueue}
          onCellClickAt={handleCellClickAt}
          xIsNext={xIsNext}
          resettingCellIndex={resettingCellIndex}
        />

        <CountdownBar
          timeRemaining={oTimeRemaining}
          percentRemaining={oTimeRemainingPercent}
          side="right"
        />
      </div>

      <div className="footer">Footer placeholder</div>
    </div>
  );
};

export default Game;
