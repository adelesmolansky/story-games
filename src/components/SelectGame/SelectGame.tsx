import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { GAMES_DATA } from '../Games/gamesData';
import './SelectGame.css';
import { useSettings } from '../../contexts/SettingsContext';
import {
  TESTING_GAME_KEY,
  useTestingGame,
} from '../../gameHooks/useTestingGame';

const SelectGame: React.FC = () => {
  const { settings } = useSettings();
  const { testingGameData } = useTestingGame();

  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-title">Choose a Game!</h1>
        {/* Pre-made games */}
        <div className="games-grid">
          {Object.keys(GAMES_DATA).map((gameKey) => (
            <div key={gameKey} className="game-card">
              <Link to={`/${gameKey}`} className="game-link">
                <img
                  src={GAMES_DATA[gameKey].coverImage}
                  alt={GAMES_DATA[gameKey].title}
                  className="game-cover-image"
                />
                <div
                  className="game-description"
                  style={{ color: settings.mainTextColor }}
                >
                  <h2>{GAMES_DATA[gameKey].title}</h2>
                  <p>{GAMES_DATA[gameKey].description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* Games through hooks */}
        <div className="game-card">
          <Link to={`/${TESTING_GAME_KEY}`} className="game-link">
            <img
              src={testingGameData.coverImage}
              alt={testingGameData.title}
              className="game-cover-image"
            />
            <div
              className="game-description"
              style={{ color: settings.mainTextColor }}
            >
              <h2>{testingGameData.title}</h2>
              <p>{testingGameData.description}</p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SelectGame;
