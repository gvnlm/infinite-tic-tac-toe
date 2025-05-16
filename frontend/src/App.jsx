import { useState } from 'react';

import Game from '../components/Game';
import Home from '../components/Home';

import '../styles/App.css';

// Game modes
const NONE = 0;
const AI = 1;
const LOCAL_MULTIPLAYER = 2;

const App = () => {
  const [game, setGame] = useState(NONE);

  const handleGoHome = () => {
    setGame(NONE);
  };

  return (
    <div className="app">
      {game === NONE && (
        <Home
          onClickAI={() => setGame(AI)}
          onClickLocalMultiplayer={() => setGame(LOCAL_MULTIPLAYER)}
        />
      )}
      {game === AI && <Game onClickHome={handleGoHome} oIsAI={true} />}
      {game === LOCAL_MULTIPLAYER && <Game onClickHome={handleGoHome} />}
    </div>
  );
};

export default App;
