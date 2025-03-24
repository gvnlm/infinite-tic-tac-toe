import '../styles/Cell.css';

const Cell = ({ value, onCellClick, isNextToBeReset, xIsNext }) => {
  return (
    <button
      className={`cell ${value !== null ? 'occupied' : 'unoccupied'} ${
        xIsNext ? 'x-is-next' : 'o-is-next'
      }`}
      onClick={onCellClick}
    >
      <span className={isNextToBeReset ? 'is-next-to-be-reset ' : ''}>{value}</span>
    </button>
  );
};

export default Cell;
