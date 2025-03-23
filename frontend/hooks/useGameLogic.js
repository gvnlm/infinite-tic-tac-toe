import { useState, useEffect } from 'react';
import GameStatus from '../constants/gameStatus';

const shepardTone = [
  new Audio('/shepard-tone/1.mp3'),
  new Audio('/shepard-tone/2.mp3'),
  new Audio('/shepard-tone/3.mp3'),
  new Audio('/shepard-tone/4.mp3'),
  new Audio('/shepard-tone/5.mp3'),
  new Audio('/shepard-tone/6.mp3'),
  new Audio('/shepard-tone/7.mp3'),
  new Audio('/shepard-tone/8.mp3'),
  new Audio('/shepard-tone/9.mp3'),
  new Audio('/shepard-tone/10.mp3'),
  new Audio('/shepard-tone/11.mp3'),
  new Audio('/shepard-tone/12.mp3'),
];

const INITIAL_TIME_LIMIT = 10_000;
const MIN_TIME_LIMIT = 3_000;
const TIME_LIMIT_DECREMENT = 500;
const COUNTDOWN_INTERVAL = 100;

// Minimax constants
const CUTOFF_DEPTH = 3;
const X_WIN_UTILITY = -1;
const O_WIN_UTILITY = 1;
const CUTOFF_UTILITY = 0;

const useGameLogic = () => {
  const [gameStatus, setGameStatus] = useState(GameStatus.ONGOING);
  const [round, setRound] = useState(1);
  const [cellValues, setCellValues] = useState(Array(9).fill(null));
  const [indexQueue, setIndexQueue] = useState([]);
  const [xIsNext, setIsXNext] = useState(true);
  const [shepardToneIndex, setShepardToneIndex] = useState(0);
  const [timeLimit, setTimeLimit] = useState(INITIAL_TIME_LIMIT);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);

  // Handle countdown
  useEffect(() => {
    if (timeRemaining <= 0) {
      setGameStatus(xIsNext ? GameStatus.O_WON : GameStatus.X_WON);
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimeRemaining((prev) => prev - COUNTDOWN_INTERVAL);
    }, COUNTDOWN_INTERVAL);

    // On effect re-runs, clear previous timeout
    return () => clearTimeout(timeoutId);
  }, [timeRemaining, xIsNext]);

  // Let AI pick O's move
  useEffect(() => {
    if (!xIsNext) {
      handleCellClickAt(getBestMove(cellValues, indexQueue, xIsNext))();
    }
  }, [xIsNext]);

  const handleCellClickAt = (index) => () => {
    // If game over
    if (gameStatus !== GameStatus.ONGOING) {
      return;
    }

    // If cell already occupied
    if (cellValues[index] !== null) {
      return;
    }

    shepardTone[shepardToneIndex].play();

    const newCellValues = [...cellValues];
    const newIndexQueue = [...indexQueue];
    const newTimeLimit = Math.max(MIN_TIME_LIMIT, timeLimit - TIME_LIMIT_DECREMENT * !xIsNext);

    newIndexQueue.push(index);

    if (newIndexQueue.length > 6) {
      newCellValues[newIndexQueue.shift()] = null;
    }

    newCellValues[index] = xIsNext ? 'X' : 'O';

    setGameStatus(getGameStatus(newCellValues));
    setRound((prev) => prev + !xIsNext);
    setCellValues(newCellValues);
    setIndexQueue(newIndexQueue);
    setIsXNext((prev) => !prev);
    setShepardToneIndex((prev) => (prev === shepardTone.length - 1 ? 0 : prev + 1));
    setTimeRemaining(newTimeLimit);
    setTimeLimit(newTimeLimit);
  };

  const nextCellToBeReset =
    gameStatus === GameStatus.ONGOING && indexQueue.length === 6 ? indexQueue[0] : null;

  return [gameStatus, round, cellValues, nextCellToBeReset, handleCellClickAt, timeRemaining];
};

const getGameStatus = (cellValues) => {
  const winner = getWinner(cellValues);

  if (winner === 'X') {
    return GameStatus.X_WON;
  } else if (winner === 'O') {
    return GameStatus.O_WON;
  } else if (cellValues.includes(null)) {
    return GameStatus.ONGOING;
  } else {
    return GameStatus.DRAW;
  }
};

const getWinner = (cellValues) => {
  const lines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (
      cellValues[a] !== null &&
      cellValues[a] === cellValues[b] &&
      cellValues[b] === cellValues[c]
    ) {
      return cellValues[a];
    }
  }

  return null;
};

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

    newCellValues[move] = 'O';
    newIndexQueue.push(move);

    if (newIndexQueue.length > 6) {
      newCellValues[newIndexQueue.shift()] = null;
    }

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

    newCellValues[move] = 'X';
    newIndexQueue.push(move);

    if (newIndexQueue.length > 6) {
      newCellValues[newIndexQueue.shift()] = null;
    }

    return { move, utility: max_value(newCellValues, newIndexQueue, cutoffDepth - 1).utility };
  });

  return moveUtilityPairs.reduce((minMoveUtilityPair, moveUtilityPair) =>
    moveUtilityPair.utility < minMoveUtilityPair.utility ? moveUtilityPair : minMoveUtilityPair
  );
};

export default useGameLogic;
