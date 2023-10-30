import { createContext, useState, useContext } from 'react';
import { ALL_SKILLS } from '../components/Games/util/skills';
import { GameDataType } from '../components/Games/util/types';
import { EMPTY_GAME_DATA } from '../gameHooks/util';

/**
 * THIS FILE IS NOT CURRENTLY USED. I MADE THAT AS AN EXAMPLE FOR @SUN
 */

type CustomGameContextType = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  coverImage: string;
  setCoverImage: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  skills: ALL_SKILLS[];
  setSkills: React.Dispatch<React.SetStateAction<ALL_SKILLS[]>>;
  gameData: GameDataType;
  setGameData: React.Dispatch<React.SetStateAction<GameDataType>>;
};

const INITIAL_CONTEXT: CustomGameContextType = {
  title: '',
  setTitle: () => {},
  description: '',
  setDescription: () => {},
  coverImage: '',
  setCoverImage: () => {},
  skills: [],
  setSkills: () => {},
  gameData: EMPTY_GAME_DATA,
  setGameData: () => {},
};

export const CustomGameContext =
  createContext<CustomGameContextType>(INITIAL_CONTEXT);

type ProviderProps = { children: React.ReactNode };

export const CustomGameProvider: React.FC<ProviderProps> = ({ children }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>('');
  const [skills, setSkills] = useState<ALL_SKILLS[]>([]);
  const [gameData, setGameData] = useState<GameDataType>(EMPTY_GAME_DATA);

  const values = {
    title,
    setTitle,
    description,
    setDescription,
    coverImage,
    setCoverImage,
    skills,
    setSkills,
    gameData,
    setGameData,
  };

  return (
    <CustomGameContext.Provider value={values}>
      {children}
    </CustomGameContext.Provider>
  );
};

export const useCustomGame = (): CustomGameContextType => {
  const context = useContext(CustomGameContext);
  if (!context)
    throw new Error('useCustomGame must be used within a CustomGameProvider');

  return context;
};
