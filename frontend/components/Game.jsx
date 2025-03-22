import Grid from './Grid';
import useGameLogic from '../hooks/useGameLogic';
import GameStatus from '../constants/gameStatus';

const Game = () => {
  const [cellValues, gameStatus, nextCellToBeReset, handleCellClickAt] = useGameLogic();

  return (
    <div>
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
