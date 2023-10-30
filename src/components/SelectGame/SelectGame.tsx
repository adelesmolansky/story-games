import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import './SelectGame.css';
import { useSettings } from '../../contexts/SettingsContext';
import { GAME_COVERS } from '../../gameHooks/util';

const SelectGame: React.FC = () => {
  const { settings } = useSettings();

  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-title">Choose a Game!</h1>
        <div className="games-grid">
          {Object.keys(GAME_COVERS).map((gameKey) => (
            <div key={gameKey} className="game-card">
              <Link to={`/${gameKey}`} className="game-link">
                <img
                  src={GAME_COVERS[gameKey].coverImage}
                  alt={GAME_COVERS[gameKey].title}
                  className="game-cover-image"
                />
                <div
                  className="game-description"
                  style={{ color: settings.mainTextColor }}
                >
                  <h2>{GAME_COVERS[gameKey].title}</h2>
                  <p>{GAME_COVERS[gameKey].description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SelectGame;
