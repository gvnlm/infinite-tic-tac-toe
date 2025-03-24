import Grid from './Grid';
import useGameLogic from '../hooks/useGameLogic';
import GameStatus from '../constants/gameStatus';

const Game = () => {
  const [
    gameStatus,
    round,
    cellValues,
    nextCellsToBeReset,
    handleCellClickAt,
    timeRemaining,
    xIsNext,
  ] = useGameLogic();

  return (
    <div>
      <p>Round {round}</p>
      {gameStatus === GameStatus.ONGOING && <p>{timeRemaining / 1000}</p>}
      {gameStatus === GameStatus.X_WON && <p>X has won!</p>}
      {gameStatus === GameStatus.O_WON && <p>O has won!</p>}
      {gameStatus === GameStatus.DRAW && <p>Draw!</p>}

      <Grid
        cellValues={cellValues}
        nextCellsToBeReset={nextCellsToBeReset}
        onCellClickAt={handleCellClickAt}
        xIsNext={xIsNext}
      />
    </div>
  );
};

export default Game;
