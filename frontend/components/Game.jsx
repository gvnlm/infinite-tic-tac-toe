import Grid from './Grid';
import useGameLogic from '../hooks/useGameLogic';
import GameStatus from '../constants/gameStatus';

const Game = () => {
  const [gameStatus, round, cellValues, nextCellToBeReset, handleCellClickAt, timeRemaining] =
    useGameLogic();

  return (
    <div>
      <p>Round {round}</p>
      {gameStatus === GameStatus.ONGOING && <div className="status">{timeRemaining / 1000}</div>}
      {gameStatus === GameStatus.X_WON && <div className="status">X has won!</div>}
      {gameStatus === GameStatus.O_WON && <div className="status">O has won!</div>}
      {gameStatus === GameStatus.DRAW && <div className="status">Draw!</div>}

      <Grid
        cellValues={cellValues}
        nextCellToBeReset={nextCellToBeReset}
        onCellClickAt={handleCellClickAt}
      />
    </div>
  );
};

export default Game;
