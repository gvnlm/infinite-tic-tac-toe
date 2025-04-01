import Circle from './Circle';
import Cross from './Cross';

import '../styles/Cell.css';

const Cell = ({ value, valueSize, isNextToReset, onCellClick, xIsNext }) => {
  return (
    <button
      className={`cell ${value !== null ? 'occupied' : 'unoccupied'} ${
        xIsNext ? 'x-is-next' : 'o-is-next'
      }`}
      onClick={onCellClick}
    >
      {value === 'X' && (
        <Cross
          className={`value ${isNextToReset ? 'is-next-to-reset' : ''}`}
          style={{ width: valueSize, height: valueSize }}
        />
      )}

      {value === 'O' && (
        <Circle
          className={`value ${isNextToReset ? 'is-next-to-reset' : ''}`}
          style={{ width: valueSize, height: valueSize }}
        />
      )}

      {value === null &&
        (xIsNext ? <Cross className={`placeholder`} /> : <Circle className={`placeholder`} />)}
    </button>
  );
};

export default Cell;
