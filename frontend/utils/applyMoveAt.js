const applyMoveAt = (index, cellValues, indexQueue, xIsNext) => {
  indexQueue.push(index);
  cellValues[index] = xIsNext ? 'X' : 'O';

  if (indexQueue.length > 6) {
    cellValues[indexQueue.shift()] = null;
  }
};

export default applyMoveAt;
