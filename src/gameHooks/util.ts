import { GameDataType } from '../components/Games/util/types';
import { useCountingParkGame, COUNTING_PARK_DATA } from './useCountingParkGame';
import {
  useMixedOperationsShoppingGame,
  MIXED_OPERATION_SHOPPING,
} from './useMixedOperationsShoppingGame';
import {
  useTestingVisualsGame,
  TESTING_VISUALS_DATA,
} from './useTestingVisualsGame';

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
  mixedOperationsShopping = 'mixedOperationsShopping',
  testingGame = 'testingGame',
}

export const GAME_COVERS: { [key: string]: GameDataType } = {
  [GameKeys.countingPark]: COUNTING_PARK_DATA,
  [GameKeys.mixedOperationsShopping]: MIXED_OPERATION_SHOPPING,
  [GameKeys.testingGame]: TESTING_VISUALS_DATA,
};

export const gameHooksRegistry: {
  [key in GameKeys]: () => { gameData: GameDataType };
} = {
  [GameKeys.countingPark]: useCountingParkGame,
  [GameKeys.mixedOperationsShopping]: useMixedOperationsShoppingGame,
  [GameKeys.testingGame]: useTestingVisualsGame,
};
