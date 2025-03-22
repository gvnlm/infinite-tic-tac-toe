import '../styles/Cell.css';

const Cell = ({ value, onCellClick, isNextToBeReset }) => {
  return (
    <button className="cell" onClick={onCellClick}>
      <span className={isNextToBeReset ? 'is-next-to-be-reset' : ''}>{value}</span>
    </button>
  );
};

export default Cell;
