import Cross from '../components/icons/Cross';
import Circle from '../components/icons/Circle';

import '../styles/GameModeButton.css';

const GameModeButton = ({ text, onClick }) => {
  return (
    <div className="game-mode-button">
      <Cross className="cross" />
      <button onClick={onClick}>{text}</button>
      <Circle className="circle" />
    </div>
  );
};

export default GameModeButton;
