import getWinner from './getWinner';
import applyMoveAt from './applyMoveAt';

const INITIAL_CUTOFF_DEPTH = 10; // Cutoff depth when the grid is empty
const X_WIN_UTILITY = -1;
const O_WIN_UTILITY = 1;
const CUTOFF_UTILITY = 0;

const getBestMove = (cellValues, moveQueue, xIsNext) => {
  if (xIsNext) {
    return min_value(cellValues, moveQueue, INITIAL_CUTOFF_DEPTH - moveQueue.length).move;
  } else {
    return max_value(cellValues, moveQueue, INITIAL_CUTOFF_DEPTH - moveQueue.length).move;
  }
};

const max_value = (cellValues, moveQueue, cutoffDepth) => {
  const { winner } = getWinner(cellValues);

  if (winner === 'O') {
    return { move: null, utility: O_WIN_UTILITY };
  }

  if (winner === 'X') {
    return { move: null, utility: X_WIN_UTILITY };
  }

  if (cutoffDepth <= 0) {
    return { move: null, utility: CUTOFF_UTILITY };
  }

  const moves = cellValues
    .map((cellValue, index) => (cellValue === null ? index : null))
    .filter((index) => index !== null);

  const moveUtilityPairs = moves.map((move) => {
    const newCellValues = [...cellValues];
    const newMoveQueue = [...moveQueue];

    applyMoveAt(move, newCellValues, newMoveQueue, false);

    return { move, utility: min_value(newCellValues, newMoveQueue, cutoffDepth - 1).utility };
  });

  return moveUtilityPairs.reduce((maxMoveUtilityPair, moveUtilityPair) =>
    moveUtilityPair.utility > maxMoveUtilityPair.utility ? moveUtilityPair : maxMoveUtilityPair
  );
};

const min_value = (cellValues, moveQueue, cutoffDepth) => {
  const { winner } = getWinner(cellValues);

  if (winner === 'O') {
    return { move: null, utility: O_WIN_UTILITY };
  }

  if (winner === 'X') {
    return { move: null, utility: X_WIN_UTILITY };
  }

  if (cutoffDepth <= 0) {
    return { move: null, utility: CUTOFF_UTILITY };
  }

  const moves = cellValues
    .map((cellValue, index) => (cellValue === null ? index : null))
    .filter((index) => index !== null);

  const moveUtilityPairs = moves.map((move) => {
    const newCellValues = [...cellValues];
    const newMoveQueue = [...moveQueue];

    applyMoveAt(move, newCellValues, newMoveQueue, true);

    return { move, utility: max_value(newCellValues, newMoveQueue, cutoffDepth - 1).utility };
  });

  return moveUtilityPairs.reduce((minMoveUtilityPair, moveUtilityPair) =>
    moveUtilityPair.utility < minMoveUtilityPair.utility ? moveUtilityPair : minMoveUtilityPair
  );
};

export default getBestMove;
