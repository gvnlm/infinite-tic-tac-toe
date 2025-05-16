import BackgroundGame from '../components/BackgroundGame';
import GameModeButton from '../components/GameModeButton';
import '../styles/Home.css';

const Home = ({ onClickAI, onClickLocalMultiplayer }) => {
  return (
    <div className="home">
      <BackgroundGame />
      <div className="game-mode-buttons">
        <GameModeButton text="AI" onClick={onClickAI} />
        <GameModeButton text="Local Multiplayer" onClick={onClickLocalMultiplayer} />
        <GameModeButton text="Online Multiplayer (coming soon)" />
      </div>
    </div>
  );
};

export default Home;
