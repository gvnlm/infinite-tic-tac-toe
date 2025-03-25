import '../styles/CountdownBar.css';

const CountdownBar = ({ remainingPercent }) => {
  return (
    <div className="countdown-bar">
      <div className="remaining" style={{ height: `${remainingPercent}%` }}></div>
    </div>
  );
};

export default CountdownBar;
