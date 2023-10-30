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
import { useDifficulty } from '../contexts/DifficultyContext';
import { EMPTY_GAME_DATA } from './util';

// This shows how different games can have different numbers used the game.
// Everything else remains the same from game to game.

export const MIXED_OPERATION_SHOPPING = {
  title: 'Shopping Adventure',
  coverImage: '/imgs/coverImgs/groceryStore.png',
  description: 'Supports skills in addition, subtraction, and comparison.',
  skills: [
    ADDITION_SKILLS.ADD_OBJECTS,
    ADDITION_SKILLS.ADD_NUMBERS,
    SUBTRACTION_SKILLS.SUBTRACT_OBJECTS,
    SUBTRACTION_SKILLS.SUBTRACT_NUMBERS,
    COMPARISON_SKILLS.COMPARE_OBJECTS,
    COMPARISON_SKILLS.COMPARE_NUMBERS,
  ],
  frames: [], // this gets filled in later
};

const DEFAULT_QUESTIONS_DATA = [{}];

/**
 * Hook for the "Operations Shopping Game"
 * The game has different numeric values every time it is played.
 */
export const useMixedOperationsShoppingGame = () => {
  const { maxNumber, numAnswerChoices } = useDifficulty();

  const [gameData, setGameData] = useState<GameDataType>(EMPTY_GAME_DATA);
  const [questionsData, setQuestionsData] = useState(DEFAULT_QUESTIONS_DATA);

  const setNewQuestionsData = () => {
    const numQuestions = questionsData.length;
    const newQuestionsData = [];
    for (let i = 0; i < numQuestions; i++) {
      const visualsNum = Math.floor(Math.random() * maxNumber) + 1;
      // generate [numAnswerChoices -1] unique random numbers between 1 and maxNumber
      let answerChoices: number[] = [];
      while (answerChoices.length < numAnswerChoices - 1) {
        const randomNum = Math.floor(Math.random() * maxNumber) + 1;
        if (!answerChoices.includes(randomNum)) answerChoices.push(randomNum);
      }
      // choose a random position for the correct answer
      const correctAnswerIdx = Math.floor(Math.random() * numAnswerChoices);
      answerChoices.splice(correctAnswerIdx, 0, visualsNum);

      newQuestionsData.push({
        visualsNum,
        answerChoices: {
          correctAnswerIdx,
          optionsType: VisualsType.TEXT,
          optionsData: answerChoices.map((num) => ({ text: num })),
        },
      });
    }
    setQuestionsData(newQuestionsData);
  };

  const getGameData = (): GameDataType => {
    return {
      title: MIXED_OPERATION_SHOPPING.title,
      coverImage: MIXED_OPERATION_SHOPPING.coverImage,
      description: MIXED_OPERATION_SHOPPING.description,
      skills: MIXED_OPERATION_SHOPPING.skills,
      frames: [
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Lucy and her mom are planning to cook dinner.',
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'They go grocery shopping to prepare for dinner.',
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: "First Lucy's mom gets apples.",
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'She puts 4 apples in one bag.',
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'And 3 apples in another bag.',
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Lucy wants to know the total number of apples.',
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
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Lucy wants to know which bag has more apples.',
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
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Lucy wants to know the difference in the number of apples.',
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'What is the difference?',
            skill: SUBTRACTION_SKILLS.SUBTRACT_OBJECTS,
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
              { name: 'subtraction' },
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
                optionsData: [{ text: 2 }, { text: 4 }, { text: 1 }],
              },
            },
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Now Lucy goes to get oranges.',
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Lucy puts 7 oranges in one bag.',
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'And 4 oranges in another bag.',
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
            instructions: 'What is the difference?',
            skill: SUBTRACTION_SKILLS.SUBTRACT_NUMBERS,
            visualsTypes: [
              VisualsType.TEXT,
              VisualsType.MATH_SIGN,
              VisualsType.TEXT,
            ],
            visualsData: [{ text: 7 }, { name: 'subtraction' }, { text: 4 }],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 1,
                optionsType: VisualsType.TEXT,
                optionsData: [{ text: 5 }, { text: 3 }, { text: 9 }],
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
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'Which number is smaller?',
            skill: COMPARISON_SKILLS.COMPARE_NUMBERS,
            visualsTypes: null,
            visualsData: null,
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 1,
                optionsType: VisualsType.TEXT,
                optionsData: [{ text: 7 }, { text: 4 }],
              },
            },
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Now they have apples and oranges in their shopping cart.',
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'How many items are there in total?',
            instructionsPosition: 'bottom',
            skill: ADDITION_SKILLS.NUMERIC_WORD_PROBLEMS,
            visualsTypes: [VisualsType.TEXT, VisualsType.TEXT],
            visualsData: [
              { text: 'They have 7 apples.' },
              { text: 'And 11 oranges' },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 0,
                optionsType: VisualsType.TEXT,
                optionsData: [{ text: 18 }, { text: 11 }, { text: 15 }],
              },
            },
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'Do they have more apples or oranges?',
            instructionsPosition: 'bottom',
            skill: COMPARISON_SKILLS.COMPARE_NUMBERS,
            visualsTypes: [VisualsType.TEXT, VisualsType.TEXT],
            visualsData: [
              { text: 'They have 7 apples.' },
              { text: 'And 11 oranges' },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: {
                correctAnswerIdx: 1,
                optionsType: VisualsType.TEXT,
                optionsData: [{ text: 'apples' }, { text: 'oranges' }],
              },
            },
          },
        },
      ],
    };
  };

  // Change the question data every time the compontent mounts so we have a
  // new game each time.
  useEffect(() => setNewQuestionsData(), []);

  // Update the game data when the question data changes.
  useEffect(() => setGameData(getGameData()), [questionsData]);

  return { gameData };
};
