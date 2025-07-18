import { useState, useEffect } from 'react';

import useShepardTones from './useShepardTones';
import GameStatus from '../constants/gameStatus';
import getWinner from '../utils/getWinner';
import getBestMove from '../utils/getBestMove';

const COUNTDOWN_INTERVAL = 20;
// Slightly shorter than despawn animation duration (Cell.css) to ensure animation does not complete before timeout
const RESETTING_CELL_DURATION = 180;
// Minimum time AI takes per move
const AI_THINK_TIME = 1000;

const useGameLogic = ({ timeLimit, xIsAI = false, oIsAI = false, soundIsOn = true }) => {
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [status, setStatus] = useState(GameStatus.ONGOING);
  const [winningLine, setWinningLine] = useState(null);
  const [cellValues, setCellValues] = useState(Array(9).fill(null));
  const [moveQueue, setMoveQueue] = useState([]);
  const [xIsNext, setIsXNext] = useState(true);
  const [xTimeRemaining, setXTimeRemaining] = useState(timeLimit);
  const [oTimeRemaining, setOTimeRemaining] = useState(timeLimit);
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
      if (xIsNext) {
        setStatus(GameStatus.O_WON);
        setOWins((prev) => prev + 1);
      } else {
        setStatus(GameStatus.X_WON);
        setXWins((prev) => prev + 1);
      }

      return;
    }

    const timeoutId = setTimeout(() => {
      setTimeRemaining((prev) => prev - COUNTDOWN_INTERVAL);
    }, COUNTDOWN_INTERVAL);

    // On effect re-runs, clear previous timeout
    return () => clearTimeout(timeoutId);
  }, [xTimeRemaining, oTimeRemaining, xIsNext]);

  // Let AI pick move
  useEffect(() => {
    if (status !== GameStatus.ONGOING) {
      return;
    }

    // If it's AI's turn
    if ((xIsAI && xIsNext) || (oIsAI && !xIsNext)) {
      const timeoutId = setTimeout(() => {
        const timeRemaining = xIsNext ? xTimeRemaining : oTimeRemaining;

        // If AI has time
        if (timeRemaining > 0) {
          applyMoveAt(getBestMove(cellValues, moveQueue, xIsNext));
        }
      }, AI_THINK_TIME);

      return () => clearTimeout(timeoutId);
    }
  }, [xIsNext, status]);

  const handleCellClickAt = (index) => () => {
    // If game over
    if (status !== GameStatus.ONGOING) {
      return;
    }

    // If moving player is AI
    if ((xIsNext && xIsAI) || (!xIsNext && oIsAI)) {
      return;
    }

    // If cell already occupied
    if (cellValues[index] !== null) {
      return;
    }

    applyMoveAt(index);
  };

  const applyMoveAt = (index) => {
    if (soundIsOn) {
      playNextShepardTone();
    }

    // If there are 6 moves on the board, the oldest move will be removed by this new move, so mark it for a despawn animation
    if (moveQueue.length >= 6) {
      setResettingCellIndex(moveQueue[0]);

      // Timeout for reset animation
      setTimeout(() => {
        setResettingCellIndex(null);
      }, RESETTING_CELL_DURATION);
    }

    const newCellValues = [...cellValues];
    const newMoveQueue = [...moveQueue];

    // Place move
    newMoveQueue.push(index);
    newCellValues[index] = xIsNext ? 'X' : 'O';

    // Remove oldest move if more than 6 moves on board
    if (newMoveQueue.length > 6) {
      newCellValues[newMoveQueue.shift()] = null;
    }

    const newStatus = getStatus(newCellValues);

    // Update wins if necessary
    if (newStatus === GameStatus.X_WON) {
      setXWins((prev) => prev + 1);
    }
    if (newStatus === GameStatus.O_WON) {
      setOWins((prev) => prev + 1);
    }

    setStatus(newStatus);
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
    setXTimeRemaining(timeLimit);
    setOTimeRemaining(timeLimit);
    setResettingCellIndex(null);
  };

  return {
    xWins,
    oWins,
    status,
    winningLine,
    cellValues,
    moveQueue,
    xIsNext,
    xTimeRemaining,
    oTimeRemaining,
    xTimeRemainingPercent: (100 * xTimeRemaining) / timeLimit,
    oTimeRemainingPercent: (100 * oTimeRemaining) / timeLimit,
    resettingCellIndex,
    handleCellClickAt,
    reset,
  };
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
