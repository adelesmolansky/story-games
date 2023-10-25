import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import StoryGame from './components/Games/Games';
import { GAMES_DATA } from './components/Games/gamesData';
import SelectGame from './components/SelectGame/SelectGame';
import { SettingsProvider } from './contexts/SettingsContext';
import { TESTING_GAME_KEY, useTestingGame } from './gameHooks/useTestingGame';

const App: React.FC = () => {
  const { testingGameData } = useTestingGame();
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SelectGame />} />
          {/* Pre-made games */}
          {Object.keys(GAMES_DATA).map((gameKey) => (
            <Route
              key={gameKey}
              path={`/${gameKey}`}
              element={<StoryGame gameData={GAMES_DATA[gameKey]} />}
            />
          ))}
          {/* Other ?? games */}
          <Route
            key={TESTING_GAME_KEY}
            path={`/${TESTING_GAME_KEY}`}
            element={<StoryGame gameData={testingGameData} />}
          />
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );
};

export default App;
