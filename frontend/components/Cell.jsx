import '../styles/Cell.css';

const Cell = ({ value, onClick, isNextToBeReset }) => {
  return (
    <button className="cell" onClick={onClick}>
      <span className={isNextToBeReset ? 'is-next-to-be-reset' : ''}>{value}</span>
    </button>
  );
};

export default Cell;
