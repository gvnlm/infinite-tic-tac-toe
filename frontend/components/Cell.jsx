import Circle from './icons/Circle';
import Cross from './icons/Cross';

import '../styles/Cell.css';

const Cell = ({
  value,
  valueSize,
  onCellClick,
  xIsNext,
  isNextToReset,
  isResetting,
  isNonWinning,
  xIsAI,
  oIsAI,
}) => {
  const renderPlaceholderMove = () => {
    if (value !== null || isResetting) {
      return;
    }

    if ((xIsNext && xIsAI) || (!xIsNext && oIsAI)) {
      return;
    }

    return xIsNext ? <Cross className="placeholder" /> : <Circle className="placeholder" />;
  };

  const renderDespawningMove = () => {
    if (value !== null || !isResetting) {
      return;
    }

    return xIsNext ? <Circle className="is-despawning" /> : <Cross className="is-despawning" />;
  };

  return (
    <button className="cell" onClick={onCellClick}>
      {value === 'X' && (
        <Cross
          className={`value ${isNextToReset ? 'is-next-to-reset' : ''} ${
            isNonWinning ? 'is-non-winning' : ''
          }`}
          style={{ width: valueSize, height: valueSize }}
        />
      )}

      {value === 'O' && (
        <Circle
          className={`value ${isNextToReset ? 'is-next-to-reset' : ''} ${
            isNonWinning ? 'is-non-winning' : ''
          }`}
          style={{ width: valueSize, height: valueSize }}
        />
      )}

      {renderPlaceholderMove()}
      {renderDespawningMove()}
    </button>
  );
};

export default Cell;
