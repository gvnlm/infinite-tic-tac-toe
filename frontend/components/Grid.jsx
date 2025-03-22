import Cell from './Cell';

import '../styles/Grid.css';

const Grid = ({ cellValues, nextCellToBeReset, onCellClickAt }) => {
  const renderRow = (row) => (
    <div key={row} className="row">
      {[0, 1, 2].map((col) => {
        const index = row * 3 + col;
        return (
          <Cell
            key={index}
            value={cellValues[index]}
            onCellClick={onCellClickAt(index)}
            isNextToBeReset={index === nextCellToBeReset}
          />
        );
      })}
    </div>
  );

  const renderGrid = () => [0, 1, 2].map((row) => renderRow(row));

  return <div className="grid">{renderGrid()}</div>;
};

export default Grid;
