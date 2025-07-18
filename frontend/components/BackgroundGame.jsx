import Grid from './Grid';
import useGameLogic from '../hooks/useGameLogic';
import GameStatus from '../constants/gameStatus';

import '../styles/Game.css';
import '../styles/BackgroundGame.css';

// Infinite game played by AI, used as background of home screen
const BackgroundGame = () => {
  const { status, winningLine, cellValues, moveQueue, xIsNext, resettingCellIndex, reset } =
    useGameLogic({ timeLimit: Infinity, xIsAI: true, oIsAI: true, soundIsOn: false });

  const handleReset = () => {
    if (status != GameStatus.ONGOING) {
      reset();
    }
  };

  return (
    <div className="background-game" onClick={handleReset}>
      <Grid
        cellValues={cellValues}
        moveQueue={moveQueue}
        onCellClickAt={() => {}}
        xIsNext={xIsNext}
        resettingCellIndex={resettingCellIndex}
        winningLine={winningLine}
      />
    </div>
  );
};

export default BackgroundGame;
