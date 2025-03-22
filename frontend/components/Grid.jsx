import Cell from './Cell';

import '../styles/Grid.css';

const Grid = ({ cellValues, indexOfNextToBeReset, onCellClickAt }) => {
  const renderRow = (row) => (
    <div key={row} className="row">
      {[0, 1, 2].map((col) => {
        const index = row * 3 + col;
        return (
          <Cell
            key={index}
            value={cellValues[index]}
            onCellClick={onCellClickAt(index)}
            isNextToBeReset={index === indexOfNextToBeReset}
          />
        );
      })}
    </div>
  );

  const renderGrid = () => [0, 1, 2].map((row) => renderRow(row));

  return <div className="grid">{renderGrid()}</div>;
};

export default Grid;
