import { useEffect, useState } from 'react';
import {
  ADDITION_SKILLS,
  COMPARISON_SKILLS,
  SUBTRACTION_SKILLS,
} from '../components/Games/util/skills';
import {
  AnswerType,
  FrameType,
  GameDataType,
  VisualsType,
} from '../components/Games/util/types';
import { EMPTY_GAME_DATA } from './util';

export const TESTING_VISUALS_DATA = {
  title: 'Testing visuals game',
  coverImage: '/imgs/coverImgs/testing.png',
  description: 'Testing visuals.',
  skills: [],
  frames: [], // this gets filled in later
};

/**
 * Hook for the "Testing Visuals Game"
 * This game is used to test all the different question visuals.
 */
export const useTestingVisualsGame = () => {
  // Define states with the default values for the game

  const [gameData, setGameData] = useState<GameDataType>(EMPTY_GAME_DATA);

  const getGameData = (): GameDataType => {
    return {
      title: TESTING_VISUALS_DATA.title,
      coverImage: TESTING_VISUALS_DATA.coverImage,
      description: TESTING_VISUALS_DATA.description,
      skills: TESTING_VISUALS_DATA.skills,
      frames: [
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Here is a story frame.',
          },
        },
        // ADDITION / SUBTRACTION (the designs are pretty much the same)
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'What is the sum?',
            skill: ADDITION_SKILLS.ADD_OBJECTS,
            visualsTypes: [
              VisualsType.OBJECTS,
              VisualsType.MATH_SIGN,
              VisualsType.OBJECTS,
            ],
            visualsData: [
              {
                num: 4,
                imgs: '/apple.png',
                names: 'apple',
                arrangement: 'linear',
              },
              { name: 'addition' },
              {
                num: 3,
                imgs: '/apple.png',
                names: 'apple',
                arrangement: 'linear',
              },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 2,
                optionsType: VisualsType.TEXT,
                optionsData: [{ text: 5 }, { text: 8 }, { text: 7 }],
              },
            },
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'What is the sum?',
            skill: ADDITION_SKILLS.ADD_OBJECTS,
            visualsTypes: [
              VisualsType.OBJECTS,
              VisualsType.MATH_SIGN,
              VisualsType.OBJECTS,
            ],
            visualsData: [
              {
                num: 8,
                imgs: '/apple.png',
                names: 'apple',
                arrangement: 'linear',
              },
              { name: 'addition' },
              {
                num: 3,
                imgs: '/apple.png',
                names: 'apple',
                arrangement: 'linear',
              },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 2,
                optionsType: VisualsType.TEXT,
                optionsData: [{ text: 5 }, { text: 11 }, { text: 7 }],
              },
            },
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'What is the sum?',
            skill: ADDITION_SKILLS.ADD_OBJECTS,
            visualsTypes: [
              VisualsType.OBJECTS,
              VisualsType.MATH_SIGN,
              VisualsType.OBJECTS,
            ],
            visualsData: [
              {
                num: 14,
                imgs: '/apple.png',
                names: 'apple',
                arrangement: 'linear',
              },
              { name: 'addition' },
              {
                num: 18,
                imgs: '/apple.png',
                names: 'apple',
                arrangement: 'linear',
              },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 2,
                optionsType: VisualsType.TEXT,
                optionsData: [{ text: 5 }, { text: 32 }, { text: 7 }],
              },
            },
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'What is the sum?',
            skill: ADDITION_SKILLS.ADD_NUMBERS,
            visualsTypes: [
              VisualsType.TEXT,
              VisualsType.MATH_SIGN,
              VisualsType.TEXT,
            ],
            visualsData: [{ text: 7 }, { name: 'addition' }, { text: 4 }],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 1,
                optionsType: VisualsType.TEXT,
                optionsData: [{ text: 5 }, { text: 11 }, { text: 10 }],
              },
            },
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'What is the sum?',
            skill: ADDITION_SKILLS.ADD_NUMBERS,
            visualsTypes: [
              VisualsType.TEXT,
              VisualsType.MATH_SIGN,
              VisualsType.TEXT,
            ],
            visualsData: [{ text: 77 }, { name: 'addition' }, { text: 46 }],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 1,
                optionsType: VisualsType.TEXT,
                optionsData: [{ text: 500 }, { text: 140 }, { text: 10 }],
              },
            },
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'What is the sum?',
            skill: ADDITION_SKILLS.ADD_NUMBERS,
            visualsTypes: [
              VisualsType.TEXT,
              VisualsType.MATH_SIGN,
              VisualsType.TEXT,
            ],
            visualsData: [{ text: 777 }, { name: 'addition' }, { text: 467 }],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 1,
                optionsType: VisualsType.TEXT,
                optionsData: [{ text: 52 }, { text: 1111 }, { text: 10 }],
              },
            },
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'What is the sum?',
            skill: ADDITION_SKILLS.ADD_NUMBERS,
            visualsTypes: [
              VisualsType.TEXT,
              VisualsType.MATH_SIGN,
              VisualsType.TEXT,
            ],
            visualsData: [{ text: 737 }, { name: 'addition' }, { text: 4367 }],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 1,
                optionsType: VisualsType.TEXT,
                optionsData: [{ text: 4323 }, { text: 184291 }, { text: 10 }],
              },
            },
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'What is the difference?',
            skill: SUBTRACTION_SKILLS.SUBTRACT_NUMBERS,
            visualsTypes: [
              VisualsType.TEXT,
              VisualsType.MATH_SIGN,
              VisualsType.TEXT,
            ],
            visualsData: [
              { text: 76477 },
              { name: 'subtraction' },
              { text: 467 },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 1,
                optionsType: VisualsType.TEXT,
                optionsData: [{ text: 76010 }, { text: 760 }, { text: 10 }],
              },
            },
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'What is the difference?',
            skill: SUBTRACTION_SKILLS.SUBTRACT_NUMBERS,
            visualsTypes: [
              VisualsType.TEXT,
              VisualsType.MATH_SIGN,
              VisualsType.TEXT,
            ],
            visualsData: [
              { text: 'five' },
              { name: 'subtraction' },
              { text: 'three' },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 1,
                optionsType: VisualsType.TEXT,
                optionsData: [
                  { text: 'two' },
                  { text: 'one' },
                  { text: 'three' },
                ],
              },
            },
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'What is the difference?',
            skill: SUBTRACTION_SKILLS.SUBTRACT_NUMBERS,
            visualsTypes: [
              VisualsType.TEXT,
              VisualsType.MATH_SIGN,
              VisualsType.TEXT,
            ],
            visualsData: [
              { text: 'fifty five' },
              { name: 'subtraction' },
              { text: 'three' },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 1,
                optionsType: VisualsType.TEXT,
                optionsData: [
                  { text: 'fifty two' },
                  { text: 'one hundred' },
                  { text: 'three' },
                ],
              },
            },
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'What is the difference?',
            skill: SUBTRACTION_SKILLS.SUBTRACT_NUMBERS,
            visualsTypes: [
              VisualsType.TEXT,
              VisualsType.MATH_SIGN,
              VisualsType.TEXT,
            ],
            visualsData: [
              { text: 'five hundred fifty five' },
              { name: 'subtraction' },
              { text: 'two hundred one' },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 1,
                optionsType: VisualsType.TEXT,
                optionsData: [
                  { text: 'fifty two' },
                  { text: 'one hundred ninety nine' },
                  { text: 'three' },
                ],
              },
            },
          },
        },

        // COMPARISON
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'Which group has more apples?',
            skill: COMPARISON_SKILLS.COMPARE_OBJECTS,
            visualsTypes: null,
            visualsData: null,
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 0,
                optionsType: VisualsType.OBJECTS,
                optionsData: [
                  { num: 4, imgs: '/apple.png', names: 'apple' },
                  { num: 3, imgs: '/apple.png', names: 'apple' },
                ],
              },
            },
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'Which group has more apples?',
            skill: COMPARISON_SKILLS.COMPARE_OBJECTS,
            visualsTypes: null,
            visualsData: null,
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 0,
                optionsType: VisualsType.OBJECTS,
                optionsData: [
                  { num: 4, imgs: '/apple.png', names: 'apple' },
                  { num: 3, imgs: '/apple.png', names: 'apple' },
                ],
              },
            },
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'Which number is larger?',
            skill: COMPARISON_SKILLS.COMPARE_NUMBERS,
            visualsTypes: null,
            visualsData: null,
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 0,
                optionsType: VisualsType.TEXT,
                optionsData: [{ text: 7 }, { text: 4 }],
              },
            },
          },
        },
      ],
    };
  };

  // Set the game data when the component mounts. In the future, we will change
  // the game data based on users preferences.
  useEffect(() => setGameData(getGameData()), []);

  return { gameData };
};
