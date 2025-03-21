import { useState } from 'react';

import Cell from './Cell';

import '../styles/Grid.css';

// Game statuses
const X_WON = 0;
const O_WON = 1;
const ONGOING = 2;
const DRAW = 3;

const Grid = () => {
  const [gameStatus, setGameStatus] = useState(ONGOING);
  const [cellValues, setCellValues] = useState(Array(9).fill(null));
  const [indexQueue, setIndexQueue] = useState([]);
  const [xIsNext, setIsXNext] = useState(true);

  const handleClick = (index) => () => {
    if (gameStatus !== ONGOING) {
      return;
    }

    if (cellValues[index] !== null) {
      return;
    }

    const newCellValues = [...cellValues];
    const newIndexQueue = [...indexQueue];

    newIndexQueue.push(index);
    if (newIndexQueue.length > 6) {
      newCellValues[newIndexQueue.shift()] = null;
    }

    newCellValues[index] = xIsNext ? 'X' : 'O';

    setGameStatus(getGameStatus(newCellValues));
    setCellValues(newCellValues);
    setIndexQueue(newIndexQueue);
    setIsXNext((prev) => !prev);
  };

  return (
    <div className="grid">
      {gameStatus === X_WON && 'X has won!'}
      {gameStatus === O_WON && 'O has won!'}
      {gameStatus === DRAW && 'Draw!'}

      <div className="row">
        <Cell
          value={cellValues[0]}
          onClick={handleClick(0)}
          isNextToBeReset={gameStatus === ONGOING && indexQueue.length == 6 && indexQueue[0] === 0}
        />
        <Cell
          value={cellValues[1]}
          onClick={handleClick(1)}
          isNextToBeReset={gameStatus === ONGOING && indexQueue.length == 6 && indexQueue[0] === 1}
        />
        <Cell
          value={cellValues[2]}
          onClick={handleClick(2)}
          isNextToBeReset={gameStatus === ONGOING && indexQueue.length == 6 && indexQueue[0] === 2}
        />
      </div>
      <div className="row">
        <Cell
          value={cellValues[3]}
          onClick={handleClick(3)}
          isNextToBeReset={gameStatus === ONGOING && indexQueue.length == 6 && indexQueue[0] === 3}
        />
        <Cell
          value={cellValues[4]}
          onClick={handleClick(4)}
          isNextToBeReset={gameStatus === ONGOING && indexQueue.length == 6 && indexQueue[0] === 4}
        />
        <Cell
          value={cellValues[5]}
          onClick={handleClick(5)}
          isNextToBeReset={gameStatus === ONGOING && indexQueue.length == 6 && indexQueue[0] === 5}
        />
      </div>
      <div className="row">
        <Cell
          value={cellValues[6]}
          onClick={handleClick(6)}
          isNextToBeReset={gameStatus === ONGOING && indexQueue.length == 6 && indexQueue[0] === 6}
        />
        <Cell
          value={cellValues[7]}
          onClick={handleClick(7)}
          isNextToBeReset={gameStatus === ONGOING && indexQueue.length == 6 && indexQueue[0] === 7}
        />
        <Cell
          value={cellValues[8]}
          onClick={handleClick(8)}
          isNextToBeReset={gameStatus === ONGOING && indexQueue.length == 6 && indexQueue[0] === 8}
        />
      </div>
    </div>
  );
};

const getGameStatus = (cellValues) => {
  const winner = getWinner(cellValues);

  if (winner === 'X') {
    return X_WON;
  } else if (winner === 'O') {
    return O_WON;
  } else if (cellValues.includes(null)) {
    return ONGOING;
  } else {
    return DRAW;
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

export default Grid;
