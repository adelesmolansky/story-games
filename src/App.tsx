import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import StoryGame from './components/Games/Games';
import { GAMES_DATA } from './components/Games/gamesData';
import SelectGame from './components/SelectGame/SelectGame';
import { SettingsProvider } from './contexts/SettingsContext';

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SelectGame />} />
          {Object.keys(GAMES_DATA).map((gameKey) => (
            <Route
              key={gameKey}
              path={`/${gameKey}`}
              element={<StoryGame gameData={GAMES_DATA[gameKey]} />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );
};

export default App;
