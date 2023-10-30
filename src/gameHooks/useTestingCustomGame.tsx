import { useEffect, useState } from 'react';
import { ALL_SKILLS } from '../components/Games/util/skills';
import { GameDataType } from '../components/Games/util/types';
import { COVER_IMG_FOLDER, EMPTY_GAME_DATA } from './util';

// NOTE: some states should be global variables that can be changed by the user
// in a textbox or dropdown menu (based on how we implement the customization)

export const TESTING_CUSTOM_GAME_KEY = 'testingCustomGame';

/**
 * Hook for the "Testing Custom Game"
 * This hook is used to test how teachers can customize a game.
 */
export const useTestingCustomGame = () => {
  // Define states with the default values for the game
  const [title, setTitle] = useState('Testing Game');
  const [coverImage, setCoverImage] = useState(
    `${COVER_IMG_FOLDER}/testing.png`
  );
  const [description, setDescription] = useState(
    'This game is used to test all the different question visuals'
  );
  const [skills, setSkills] = useState<ALL_SKILLS[]>([]);
  const [gameData, setGameData] = useState<GameDataType>(EMPTY_GAME_DATA);

  const getGameData = (): GameDataType => {
    return {
      title,
      coverImage,
      description,
      skills,
      frames: [],
    };
  };

  // Set the game data when the component mounts. In the future, we will change
  // the game data based on users preferences.
  useEffect(() => setGameData(getGameData()), []);

  return { testingGameData: gameData };
};
