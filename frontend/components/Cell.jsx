import '../styles/Cell.css';

const Cell = ({ value, valueSize, isNextToReset, onCellClick, xIsNext }) => {
  return (
    <button
      className={`cell ${value !== null ? 'occupied' : 'unoccupied'} ${
        xIsNext ? 'x-is-next' : 'o-is-next'
      }`}
      onClick={onCellClick}
    >
      <span
        className={`value ${isNextToReset ? 'is-next-to-reset' : ''}`}
        style={{ fontSize: valueSize }}
      >
        {value}
      </span>
    </button>
  );
};

export default Cell;
