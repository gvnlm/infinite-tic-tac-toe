import BackgroundGame from '../components/BackgroundGame';
import GameModeButton from '../components/GameModeButton';
import '../styles/Home.css';

const Home = ({ onClickPlay }) => {
  return (
    <div className="home">
      <BackgroundGame />
      <div className="game-mode-buttons">
        <GameModeButton text="AI (coming soon)" />
        <GameModeButton text="Local Multiplayer" onClick={onClickPlay} />
        <GameModeButton text="Online Multiplayer (coming soon)" />
      </div>
    </div>
  );
};

export default Home;
