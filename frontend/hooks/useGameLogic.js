import { useState, useEffect } from 'react';

import useShepardTones from './useShepardTones';
import GameStatus from '../constants/gameStatus';
import getWinner from '../utils/getWinner';
import getBestMove from '../utils/getBestMove';
import applyMoveAt from '../utils/applyMoveAt';

const TIME_LIMIT = 10_000;
const COUNTDOWN_INTERVAL = 20;
// Slightly shorter than despawn animation duration (Cell.css) to ensure animation does not complete before timeout
const RESETTING_CELL_DURATION = 180;

const useGameLogic = () => {
  const [status, setStatus] = useState(GameStatus.ONGOING);
  const [winningLine, setWinningLine] = useState(null);
  const [cellValues, setCellValues] = useState(Array(9).fill(null));
  const [moveQueue, setMoveQueue] = useState([]);
  const [xIsNext, setIsXNext] = useState(true);
  const [xTimeRemaining, setXTimeRemaining] = useState(TIME_LIMIT);
  const [oTimeRemaining, setOTimeRemaining] = useState(TIME_LIMIT);
  // Index of cell whose value is current despawning
  const [resettingCellIndex, setResettingCellIndex] = useState(null);

  const [playNextShepardTone] = useShepardTones();

  // Handle countdown
  useEffect(() => {
    // Stop countdown when game over
    if (status !== GameStatus.ONGOING) {
      return;
    }

    const timeRemaining = xIsNext ? xTimeRemaining : oTimeRemaining;
    const setTimeRemaining = xIsNext ? setXTimeRemaining : setOTimeRemaining;

    if (timeRemaining <= 0) {
      setStatus(xIsNext ? GameStatus.O_WON : GameStatus.X_WON);
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimeRemaining((prev) => prev - COUNTDOWN_INTERVAL);
    }, COUNTDOWN_INTERVAL);

    // On effect re-runs, clear previous timeout
    return () => clearTimeout(timeoutId);
  }, [xTimeRemaining, oTimeRemaining, xIsNext]);

  // Let AI pick O's move
  // useEffect(() => {
  //   if (!xIsNext) {
  //     handleCellClickAt(getBestMove(cellValues, moveQueue, xIsNext))();
  //   }
  // }, [xIsNext]);

  const handleCellClickAt = (index) => () => {
    // If game over
    if (status !== GameStatus.ONGOING) {
      return;
    }

    // If cell already occupied
    if (cellValues[index] !== null) {
      return;
    }

    playNextShepardTone();

    const newCellValues = [...cellValues];
    const newMoveQueue = [...moveQueue];

    if (moveQueue.length >= 6) {
      setResettingCellIndex(moveQueue[0]);

      setTimeout(() => {
        setResettingCellIndex(null);
      }, RESETTING_CELL_DURATION);
    }

    applyMoveAt(index, newCellValues, newMoveQueue, xIsNext);

    setStatus(getStatus(newCellValues));
    setWinningLine(getWinningLine(newCellValues));
    setCellValues(newCellValues);
    setMoveQueue(newMoveQueue);
    setIsXNext((prev) => !prev);
  };

  const reset = () => {
    setStatus(GameStatus.ONGOING);
    setWinningLine(null);
    setCellValues(Array(9).fill(null));
    setMoveQueue([]);
    setIsXNext(true);
    setXTimeRemaining(TIME_LIMIT);
    setOTimeRemaining(TIME_LIMIT);
    setResettingCellIndex(null);
  };

  return [
    status,
    winningLine,
    cellValues,
    moveQueue,
    xIsNext,
    xTimeRemaining,
    oTimeRemaining,
    (100 * xTimeRemaining) / TIME_LIMIT, // xTimeRemainingPercent
    (100 * oTimeRemaining) / TIME_LIMIT, // oTimeRemainingPercent
    resettingCellIndex,
    handleCellClickAt,
    reset,
  ];
};

const getStatus = (cellValues) => {
  const { winner } = getWinner(cellValues);

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

const getWinningLine = (cellValues) => {
  return getWinner(cellValues).line;
};

export default useGameLogic;
