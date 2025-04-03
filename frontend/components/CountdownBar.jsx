import '../styles/CountdownBar.css';

const CountdownBar = ({ timeRemaining, percentRemaining, side }) => {
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
    const hue = 120 * (percentRemaining / 100);
    return `hsl(${hue}, 80%, 50%)`;
  };

  const secondsRemaining = (timeRemaining / 1000).toFixed(2);

  return (
    <div className="countdown-bar">
      {side === 'right' && <div className="right timer">{secondsRemaining}</div>}

      <div
        className="percent-remaining"
        style={{
          height: `${percentRemaining}%`,
          backgroundColor: 'rgb(205, 205, 205)',
          boxShadow: getBoxShadow(),
        }}
      ></div>

      {side === 'left' && <div className="left timer">{secondsRemaining}</div>}
    </div>
  );
};

export default CountdownBar;
