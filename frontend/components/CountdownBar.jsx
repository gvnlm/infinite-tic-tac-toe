import '../styles/CountdownBar.css';

const CountdownBar = ({ remainingPercent }) => {
  const getColour = () => {
    let r = 200;
    let g = 200;

    if (remainingPercent > 50) {
      r *= 2 * (1 - remainingPercent / 100);
    } else {
      g *= 2 * (remainingPercent / 100);
    }

    return `rgb(${r}, ${g}, 0)`;
  };

  return (
    <div className="countdown-bar">
      <div
        className="remaining"
        style={{ height: `${remainingPercent}%`, backgroundColor: getColour() }}
      ></div>
    </div>
  );
};

export default CountdownBar;
