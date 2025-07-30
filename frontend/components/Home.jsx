import BackgroundGame from '../components/BackgroundGame';
import GameModeButton from '../components/GameModeButton';
import { FaGithub } from 'react-icons/fa';

import '../styles/Home.css';

const GITHUB_REPO_LINK = 'https://github.com/gvnlm/infinite-tic-tac-toe';
const GITHUB_USER = 'gvnlm';

const Home = ({ onClickAI, onClickLocalMultiplayer }) => {
  return (
    <div className="home">
      <BackgroundGame />

      <div className="game-mode-buttons">
        <GameModeButton text="AI" onClick={onClickAI} />
        <GameModeButton text="Local Multiplayer" onClick={onClickLocalMultiplayer} />
      </div>

      <a className="github-link" href={GITHUB_REPO_LINK}>
        <FaGithub />
        {GITHUB_USER}
      </a>
    </div>
  );
};

export default Home;
