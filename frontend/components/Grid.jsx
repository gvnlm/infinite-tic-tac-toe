import Cell from './Cell';

import '../styles/Grid.css';

const VALUE_SHRINK_PERCENTAGE = 12.5;

const Grid = ({ cellValues, moveQueue, onCellClickAt, xIsNext, resettingCellIndex }) => {
  const getValueSizeAt = (index, moveQueue) => {
    const valueAge = [...moveQueue].reverse().indexOf(index);

    // If value is null (i.e., neither 'X' nor 'O')
    if (valueAge === -1) {
      return 'unset';
    }

    return `${100 - valueAge * VALUE_SHRINK_PERCENTAGE}%`;
  };

  return (
    <div className="grid">
      {cellValues.map((cellValue, index) => (
        <Cell
          key={index}
          value={cellValue}
          valueSize={getValueSizeAt(index, moveQueue)}
          onCellClick={onCellClickAt(index)}
          xIsNext={xIsNext}
          isNextToReset={moveQueue.length === 6 && moveQueue[0] === index}
          isResetting={index === resettingCellIndex}
        />
      ))}
    </div>
  );
};

export default Grid;
