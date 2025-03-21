import { useState } from 'react';

import Cell from './Cell';

import '../styles/Grid.css';

// Game statuses
const X_WON = 0;
const O_WON = 1;
const ONGOING = 2;
const DRAW = 3;

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

const Grid = () => {
  const [gameStatus, setGameStatus] = useState(ONGOING);
  const [cellValues, setCellValues] = useState(Array(9).fill(null));
  const [indexQueue, setIndexQueue] = useState([]);
  const [xIsNext, setIsXNext] = useState(true);
  const [shepardToneIndex, setShepardToneIndex] = useState(0);

  const handleClick = (index) => () => {
    if (gameStatus !== ONGOING) {
      return;
    }

    if (cellValues[index] !== null) {
      return;
    }

    shepardTone[shepardToneIndex].play();

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
    setShepardToneIndex((prev) => (prev === shepardTone.length - 1 ? 0 : prev + 1));
  };

  const renderCellRow = (row) => {
    return (
      <div key={row} className="row">
        {[0, 1, 2].map((col) => {
          const index = row * 3 + col;
          return (
            <Cell
              key={index}
              value={cellValues[index]}
              onClick={handleClick(index)}
              isNextToBeReset={
                gameStatus === ONGOING && indexQueue.length === 6 && indexQueue[0] === index
              }
            />
          );
        })}
      </div>
    );
  };

  const renderGrid = () => {
    return [0, 1, 2].map((row) => renderCellRow(row));
  };

  return (
    <div className="grid">
      {gameStatus === X_WON && <div className="status">X has won!</div>}
      {gameStatus === O_WON && <div className="status">O has won!</div>}
      {gameStatus === DRAW && <div className="status">Draw!</div>}

      {renderGrid()}
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
