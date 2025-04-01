import Circle from './Circle';
import Cross from './Cross';

import '../styles/Cell.css';

const Cell = ({ value, valueSize, onCellClick, xIsNext, isNextToReset, isResetting }) => {
  return (
    <button className="cell" onClick={onCellClick}>
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
        (!isResetting ? (
          xIsNext ? (
            <Cross className="placeholder" />
          ) : (
            <Circle className="placeholder" />
          )
        ) : xIsNext ? (
          <Circle className="is-despawning" />
        ) : (
          <Cross className="is-despawning" />
        ))}
    </button>
  );
};

export default Cell;
