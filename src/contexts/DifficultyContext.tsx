import { createContext, useContext, useState } from 'react';

type DifficultyContextType = {
  maxNumber: number;
  setMaxNumber: React.Dispatch<React.SetStateAction<number>>;
  numAnswerChoices: number;
  setNumAnswerChoices: React.Dispatch<React.SetStateAction<number>>;
};

const INITIAL_CONTEXT: DifficultyContextType = {
  maxNumber: 5,
  setMaxNumber: () => {},
  numAnswerChoices: 3,
  setNumAnswerChoices: () => {},
};

export const DifficultyContext =
  createContext<DifficultyContextType>(INITIAL_CONTEXT);

type ProviderProps = { children: React.ReactNode };

export const DifficultyProvider: React.FC<ProviderProps> = ({ children }) => {
  const [maxNumber, setMaxNumber] = useState<number>(5);
  const [numAnswerChoices, setNumAnswerChoices] = useState<number>(3);

  const values = {
    maxNumber,
    setMaxNumber,
    numAnswerChoices,
    setNumAnswerChoices,
  };

  return (
    <DifficultyContext.Provider value={values}>
      {children}
    </DifficultyContext.Provider>
  );
};

export const useDifficulty = (): DifficultyContextType => {
  const context = useContext(DifficultyContext);
  if (!context)
    throw new Error('useDifficulty must be used within a DifficultyProvider');

  return context;
};
