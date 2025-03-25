import Cell from './Cell';

import '../styles/Grid.css';

const VALUE_SHRINK_PERCENTAGE = 12.5;

const Grid = ({ cellValues, moveQueue, onCellClickAt, xIsNext }) => {
  const getValueSizeAt = (index, moveQueue) => {
    const valueAge = [...moveQueue].reverse().indexOf(index);

    // If value is null (i.e., neither 'X' nor 'O')
    if (valueAge === -1) {
      return 'unset';
    }

    return `${100 - valueAge * VALUE_SHRINK_PERCENTAGE}%`;
  };

  const renderRow = (row) => (
    <div key={row} className="row">
      {[0, 1, 2].map((col) => {
        const index = row * 3 + col;
        return (
          <Cell
            key={index}
            value={cellValues[index]}
            valueSize={getValueSizeAt(index, moveQueue)}
            isNextToReset={moveQueue.length === 6 && moveQueue[0] === index}
            onCellClick={onCellClickAt(index)}
            xIsNext={xIsNext}
          />
        );
      })}
    </div>
  );

  const renderGrid = () => [0, 1, 2].map((row) => renderRow(row));

  return <div className="grid">{renderGrid()}</div>;
};

export default Grid;
