import { ALL_SKILLS, COUNTING_SKILLS } from '../components/Games/util/skills';
import {
  AnswerType,
  GameDataType,
  ObjectVisualsType,
  VisualsType,
} from '../components/Games/util/types';
import { useCountingParkGame, COUNTING_PARK_DATA } from './useCountingParkGame';
import {
  useTestingVisualsGame,
  TESTING_VISUALS_DATA,
} from './useTestingVisualsGame';
import {
  ADDITION_SHOPPING_GAME,
  NumberGenerationRules,
  useAdditionShoppingGame,
} from './useAdditionShoppingGame';

export const EMPTY_GAME_DATA: GameDataType = {
  title: '',
  coverImage: '',
  description: '',
  skills: [],
  frames: [],
};

export const COVER_IMG_FOLDER = '/imgs/coverImgs';

export enum GameKeys {
  countingPark = 'countingPark',
  additionShopping = 'additionShopping',
  testingGame = 'testingGame',
}

export const GAME_COVERS: { [key: string]: GameDataType } = {
  [GameKeys.countingPark]: COUNTING_PARK_DATA,
  [GameKeys.additionShopping]: ADDITION_SHOPPING_GAME,
  [GameKeys.testingGame]: TESTING_VISUALS_DATA,
};

export const gameHooksRegistry: {
  [key in GameKeys]: () => { gameData: GameDataType };
} = {
  [GameKeys.countingPark]: useCountingParkGame,
  [GameKeys.additionShopping]: useAdditionShoppingGame,
  [GameKeys.testingGame]: useTestingVisualsGame,
};

export type InputStoryDataQuestion = {
  question: string;
  img?: string;
  text?: string[];
  skill: ALL_SKILLS | ALL_SKILLS[];
  visuals: VisualsType[] | null;
  answerType: AnswerType;
  answerChoiceType: VisualsType;
  nums?: number[][];
};
export type InputStoryFrameData = {
  story: string;
  numRules?: NumberGenerationRules[];
};

/**
 * Function to get data for question frames that have objects as one of the visuals
 */
export const getObjectQuestionData = (
  inputData: InputStoryDataQuestion,
  maxNumber: number | undefined = 10,
  numObjects?: number
) => {
  // If numObjects is not provided, generate a random number between 1 and maxNumber
  if (!numObjects) numObjects = Math.floor(Math.random() * maxNumber) + 1;
  const objectData: ObjectVisualsType = {
    num: numObjects,
    imgs: `\\${inputData.img}.png`,
    names: inputData.img!,
    arrangement:
      inputData.skill === COUNTING_SKILLS.ABSTRACTION ? 'abstract' : 'linear',
  };
  return { numObjects, objectData };
};

/**
 * Get the number from the code where the code is in the format of '...#NUM1#...'
 */
export const getNumFromCode = (code: string) => {
  const textIdx = code.indexOf('#NUM'); // Find the position of '#NUM' in the string
  // Get the position after '#NUM' which is numIndex + 4 (#NUM is 4 characters long)
  const startPos = textIdx + 4;
  return parseInt(code.substring(startPos, startPos + 1));
};
