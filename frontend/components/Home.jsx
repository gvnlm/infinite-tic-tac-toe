import BackgroundGame from '../components/BackgroundGame';

import '../styles/Home.css';

const Home = ({ onClickPlay }) => {
  return (
    <div className="home">
      <BackgroundGame />
      <button onClick={onClickPlay}>Play</button>
    </div>
  );
};

export default Home;
