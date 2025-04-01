import '../styles/CountdownBar.css';

const CountdownBar = ({ remainingPercent }) => {
  const getBoxShadow = () => {
    return `
      0 0 0.1vw ${getColour()},
      0 0 0.2vw ${getColour()},
      0 0 0.4vw ${getColour()},
      0 0 0.8vw ${getColour()},
      0 0 1.6vw ${getColour()},
      0 0 3.2vw ${getColour()},
      0 0 6.4vw ${getColour()},
      0 0 12.8vw ${getColour()},
      0 0 25.6vw ${getColour()},
      0 0 51.2vw ${getColour()}`;
  };

  const getColour = () => {
    const hue = 120 * (remainingPercent / 100);
    return `hsl(${hue}, 80%, 50%)`;
  };

  return (
    <div className="countdown-bar">
      <div
        className="remaining"
        style={{
          height: `${remainingPercent}%`,
          backgroundColor: 'rgb(205, 205, 205)',
          boxShadow: getBoxShadow(),
        }}
      ></div>
    </div>
  );
};

export default CountdownBar;
