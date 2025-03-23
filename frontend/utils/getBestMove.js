import getWinner from './getWinner';
import applyMoveAt from './applyMoveAt';

const CUTOFF_DEPTH = 3;
const X_WIN_UTILITY = -1;
const O_WIN_UTILITY = 1;
const CUTOFF_UTILITY = 0;

const getBestMove = (cellValues, indexQueue, xIsNext) => {
  if (xIsNext) {
    return min_value(cellValues, indexQueue, CUTOFF_DEPTH).move;
  } else {
    return max_value(cellValues, indexQueue, CUTOFF_DEPTH).move;
  }
};

const max_value = (cellValues, indexQueue, cutoffDepth) => {
  if (cutoffDepth <= 0) {
    return { move: null, utility: CUTOFF_UTILITY };
  }

  const winner = getWinner(cellValues);

  if (winner === 'O') {
    return { move: null, utility: O_WIN_UTILITY };
  }

  if (winner === 'X') {
    return { move: null, utility: X_WIN_UTILITY };
  }

  const moves = cellValues
    .map((cellValue, index) => (cellValue === null ? index : null))
    .filter((index) => index !== null);

  const moveUtilityPairs = moves.map((move) => {
    const newCellValues = [...cellValues];
    const newIndexQueue = [...indexQueue];

    applyMoveAt(move, newCellValues, newIndexQueue, false);

    return { move, utility: min_value(newCellValues, newIndexQueue, cutoffDepth - 1).utility };
  });

  return moveUtilityPairs.reduce((maxMoveUtilityPair, moveUtilityPair) =>
    moveUtilityPair.utility > maxMoveUtilityPair.utility ? moveUtilityPair : maxMoveUtilityPair
  );
};

const min_value = (cellValues, indexQueue, cutoffDepth) => {
  if (cutoffDepth <= 0) {
    return { move: null, utility: CUTOFF_UTILITY };
  }

  const winner = getWinner(cellValues);

  if (winner === 'O') {
    return { move: null, utility: O_WIN_UTILITY };
  }

  if (winner === 'X') {
    return { move: null, utility: X_WIN_UTILITY };
  }

  const moves = cellValues
    .map((cellValue, index) => (cellValue === null ? index : null))
    .filter((index) => index !== null);

  const moveUtilityPairs = moves.map((move) => {
    const newCellValues = [...cellValues];
    const newIndexQueue = [...indexQueue];

    applyMoveAt(move, newCellValues, newIndexQueue, true);

    return { move, utility: max_value(newCellValues, newIndexQueue, cutoffDepth - 1).utility };
  });

  return moveUtilityPairs.reduce((minMoveUtilityPair, moveUtilityPair) =>
    moveUtilityPair.utility < minMoveUtilityPair.utility ? moveUtilityPair : minMoveUtilityPair
  );
};

export default getBestMove;
