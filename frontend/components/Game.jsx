import Grid from './Grid';
import CountdownBar from './CountdownBar';
import useGameLogic from '../hooks/useGameLogic';
import GameStatus from '../constants/gameStatus';

import '../styles/Game.css';

const Game = () => {
  const [
    xWins,
    oWins,
    status,
    winningLine,
    cellValues,
    moveQueue,
    xIsNext,
    xTimeRemaining,
    oTimeRemaining,
    xTimeRemainingPercent,
    oTimeRemainingPercent,
    resettingCellIndex,
    handleCellClickAt,
    reset,
  ] = useGameLogic();

  const handleReset = () => {
    if (status != GameStatus.ONGOING) {
      reset();
    }
  };

  return (
    <div className="game" onClick={handleReset}>
      <div className="header">
        <p>
          {xWins} - {oWins}
        </p>
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

      <div className="footer">
        {status === GameStatus.X_WON && <p>X has won!</p>}
        {status === GameStatus.O_WON && <p>O has won!</p>}
        {status === GameStatus.DRAW && <p>Draw!</p>}

        {status !== GameStatus.ONGOING && <p>Click anywhere to play again.</p>}
      </div>
    </div>
  );
};

export default Game;
