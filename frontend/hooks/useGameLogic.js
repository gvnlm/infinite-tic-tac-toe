import { useState, useEffect } from 'react';

import useShepardTones from './useShepardTones';
import GameStatus from '../constants/gameStatus';
import getWinner from '../utils/getWinner';
import getBestMove from '../utils/getBestMove';
import applyMoveAt from '../utils/applyMoveAt';

const TIME_LIMIT = 30_000;
const MIN_TIME_REMAINING = 2_500;
const COUNTDOWN_INTERVAL = 100;

const useGameLogic = () => {
  const [gameStatus, setGameStatus] = useState(GameStatus.ONGOING);
  const [round, setRound] = useState(1);
  const [cellValues, setCellValues] = useState(Array(9).fill(null));
  const [moveQueue, setMoveQueue] = useState([]);
  const [xIsNext, setIsXNext] = useState(true);
  const [xTimeRemaining, setXTimeRemaining] = useState(TIME_LIMIT);
  const [oTimeRemaining, setOTimeRemaining] = useState(TIME_LIMIT);
  const [timeRemaining, setTimeRemaining] = useState(xTimeRemaining);

  const [playNextShepardTone] = useShepardTones();

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
  // useEffect(() => {
  //   if (!xIsNext) {
  //     handleCellClickAt(getBestMove(cellValues, moveQueue, xIsNext))();
  //   }
  // }, [xIsNext]);

  const handleCellClickAt = (index) => () => {
    // If game over
    if (gameStatus !== GameStatus.ONGOING) {
      return;
    }

    // If cell already occupied
    if (cellValues[index] !== null) {
      return;
    }

    playNextShepardTone();

    const newCellValues = [...cellValues];
    const newMoveQueue = [...moveQueue];

    applyMoveAt(index, newCellValues, newMoveQueue, xIsNext);

    if (xIsNext) {
      setXTimeRemaining(Math.max(timeRemaining, MIN_TIME_REMAINING));
      setTimeRemaining(oTimeRemaining);
    } else {
      setOTimeRemaining(Math.max(timeRemaining, MIN_TIME_REMAINING));
      setTimeRemaining(xTimeRemaining);
    }

    setGameStatus(getGameStatus(newCellValues));
    setRound((prev) => prev + !xIsNext);
    setCellValues(newCellValues);
    setMoveQueue(newMoveQueue);
    setIsXNext((prev) => !prev);
  };

  return [gameStatus, round, cellValues, moveQueue, xIsNext, timeRemaining, handleCellClickAt];
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

export default useGameLogic;
