import React, { createContext, useState, useContext } from 'react';
import { ColorStyles, DARK_MODE_CONTINUE_BUTTON } from '../util/colors';

export enum Scale {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

type Settings = {
  // Settings that are general to the entire app
  mode: 'light' | 'dark';
  fontSize: Scale;
  backgroundColor: ColorStyles;
  mainTextColor: ColorStyles;
  answerChoices: {
    backgroundColor: ColorStyles;
    textColor: ColorStyles;
    showOutline: boolean;
  };
  continueButton: {
    backgroundColor: ColorStyles;
    textColor: ColorStyles;
    hoverBackgroundColor: ColorStyles;
    hoverTextColor: ColorStyles;
  };
  // TODO: we can add MANY more settings ...
};

type SettingsContextType = {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

const defaultSettings: Settings = {
  mode: 'dark',
  fontSize: Scale.MEDIUM,
  backgroundColor: ColorStyles.BLACK,
  mainTextColor: ColorStyles.WHITE,
  continueButton: DARK_MODE_CONTINUE_BUTTON,
  answerChoices: {
    textColor: ColorStyles.WHITE,
    backgroundColor: ColorStyles.BLACK,
    showOutline: true,
  },
};

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

type ProviderProps = {
  children: React.ReactNode;
};

export const SettingsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error('useSettings must be used within a SettingsProvider');

  return context;
};
