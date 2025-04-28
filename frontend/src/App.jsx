import { useState } from 'react';

import Game from '../components/Game';
import Home from '../components/Home';

import '../styles/App.css';

const App = () => {
  const [isInGame, setIsInGame] = useState(false);

  const handlePlayGame = () => {
    setIsInGame(true);
  };

  const handleGoHome = () => {
    setIsInGame(false);
  };

  return (
    <div className="app">
      {isInGame ? <Game onClickHome={handleGoHome} /> : <Home onClickPlay={handlePlayGame} />}
    </div>
  );
};

export default App;
