import Grid from './Grid';
import CountdownBar from './CountdownBar';
import useGameLogic from '../hooks/useGameLogic';
import GameStatus from '../constants/gameStatus';

import '../styles/Game.css';

const Game = () => {
  const [
    status,
    winningLine,
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
        {status === GameStatus.X_WON && <p>X has won!</p>}
        {status === GameStatus.O_WON && <p>O has won!</p>}
        {status === GameStatus.DRAW && <p>Draw!</p>}
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
          winningLine={winningLine}
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
