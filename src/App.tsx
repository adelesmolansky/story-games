import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import StoryGame from './components/Games/Games';
import SelectGame from './components/SelectGame/SelectGame';
import { DifficultyProvider } from './contexts/DifficultyContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { GameKeys, GAME_COVERS } from './gameHooks/util';

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <DifficultyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SelectGame />} />
            {Object.keys(GAME_COVERS).map((gameKey) => (
              <Route
                key={gameKey}
                path={`/${gameKey}`}
                element={<StoryGame gameKey={gameKey as GameKeys} />}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </DifficultyProvider>
    </SettingsProvider>
  );
};

export default App;
