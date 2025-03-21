import '../styles/Cell.css';

const Cell = ({ value, onClick }) => {
  return (
    <button className="cell" onClick={onClick}>
      {value}
    </button>
  );
};

export default Cell;
