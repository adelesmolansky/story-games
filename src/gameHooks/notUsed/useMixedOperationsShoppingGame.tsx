import { useEffect, useState } from 'react';
import {
  ADDITION_SKILLS,
  COMPARISON_SKILLS,
  COUNTING_SKILLS,
  SUBTRACTION_SKILLS,
} from '../../components/Games/util/skills';
import {
  AnswerType,
  FrameData,
  FrameType,
  GameDataType,
  QuestionFrameData,
  SingleVisualsDataType,
  VisualsType,
} from '../../components/Games/util/types';
import { useDifficulty } from '../../contexts/DifficultyContext';

import {
  EMPTY_GAME_DATA,
  getObjectQuestionData,
  InputStoryDataQuestion,
  InputStoryFrameData,
} from '../util';

// This shows how different games can have different numbers used the game.
// Everything else remains the same from game to game.

export const MIXED_OPERATION_SHOPPING = {
  title: 'Shopping Adventure',
  coverImage: '/imgs/coverImgs/groceryStore.png',
  description: 'Supports skills in addition, subtraction, and comparison.',
  skills: [
    COUNTING_SKILLS.CARDINALITY,
    ADDITION_SKILLS.ADD_OBJECTS,
    ADDITION_SKILLS.ADD_NUMBERS,
    SUBTRACTION_SKILLS.SUBTRACT_OBJECTS,
    SUBTRACTION_SKILLS.SUBTRACT_NUMBERS,
    COMPARISON_SKILLS.COMPARE_OBJECTS,
    COMPARISON_SKILLS.COMPARE_NUMBERS,
  ],
  frames: [], // this gets filled in later
};

const INPUT_STORY_DATA: (InputStoryDataQuestion | InputStoryFrameData)[] = [
  { story: '#NAME# and her mom are planning to cook dinner.' },
  { story: 'They go grocery shopping to prepare for dinner.' },
  { story: "First #NAME#'s mom gets apples." },
  {
    question: 'How many apples are on the self?',
    img: 'apple',
    skill: COUNTING_SKILLS.CARDINALITY,
    visuals: [VisualsType.OBJECTS],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  { story: 'She puts #NUM1# apples in one bag.' },
  { story: 'And #NUM2# apples in another bag.' },
  { story: '#NAME# wants to know the total number of apples.' },
  {
    question: 'What is the sum?',
    skill: ADDITION_SKILLS.ADD_OBJECTS,
    visuals: [VisualsType.OBJECTS, VisualsType.MATH_SIGN, VisualsType.OBJECTS],
    img: 'apple',
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  { story: '#NAME# wants to know which bag has more apples.' },
  {
    question: 'Which group has more apples?',
    skill: COMPARISON_SKILLS.COMPARE_OBJECTS,
    visuals: null,
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.OBJECTS,
  },
  { story: '#NAME# wants to know the difference in the number of apples.' },
  {
    question: 'What is the difference?',
    skill: SUBTRACTION_SKILLS.SUBTRACT_OBJECTS,
    img: 'apple',
    visuals: [VisualsType.OBJECTS, VisualsType.MATH_SIGN, VisualsType.OBJECTS],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  { story: 'Now #NAME# goes to get oranges.' },
  { story: '#NAME# puts #NUM1# oranges in one bag.' },
  { story: 'And #NUM1# oranges in another bag.' },
  {
    question: 'What is the sum?',
    skill: ADDITION_SKILLS.ADD_NUMBERS,
    visuals: [VisualsType.TEXT, VisualsType.MATH_SIGN, VisualsType.TEXT],
    text: ['#NUM1#', '#NUM2#'],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  {
    question: 'What is the difference?',
    skill: SUBTRACTION_SKILLS.SUBTRACT_NUMBERS,
    text: ['#NUM1#', '#NUM2#'],
    visuals: [VisualsType.TEXT, VisualsType.MATH_SIGN, VisualsType.TEXT],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  {
    question: 'Which number is larger?',
    skill: COMPARISON_SKILLS.COMPARE_NUMBERS,
    visuals: null,
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
    text: ['#NUM1#', '#NUM2#'],
  },
  {
    question: 'Which number is smaller?',
    skill: COMPARISON_SKILLS.COMPARE_NUMBERS,
    visuals: null,
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  { story: 'Now they have apples and oranges in their shopping cart.' },
  {
    question: 'How many items are there in total?',
    // instructionsPosition: 'bottom',
    skill: ADDITION_SKILLS.NUMERIC_WORD_PROBLEMS,
    visuals: [VisualsType.TEXT, VisualsType.TEXT],
    text: ['They have #NUM1# apples', 'And #NUM2# oranges'],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  {
    question: 'Do they have more apples or oranges?',
    skill: COMPARISON_SKILLS.VISUAL_WORD_PROBLEMS,
    visuals: [VisualsType.TEXT, VisualsType.TEXT],
    text: ['They have #NUM1# apples', 'And #NUM2# oranges'],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
];

/**
 * Hook for the "Operations Shopping Game"
 * The game has different numeric values every time it is played.
 */
export const useMixedOperationsShoppingGame = () => {
  const { maxNumber } = useDifficulty();
  const [gameData, setGameData] = useState<GameDataType>(EMPTY_GAME_DATA);
  const [characterName, setCharacterName] = useState<string>('Lucy'); // default name

  const getQuestionData = (
    inputData: InputStoryDataQuestion
  ): QuestionFrameData => {
    let correctAnswer: number = 0; // initialize to 0
    let answerChoices: number[] = []; // this wont work
    let correctAnswerIdx: number = 0;

    // handle the visuals data if they exist
    let visualsData: SingleVisualsDataType[] = [];
    if (inputData.visuals) {
      inputData.visuals.forEach((visualType, idx) => {
        switch (visualType) {
          case VisualsType.OBJECTS:
            const { numObjects, objectData } = getObjectQuestionData(
              inputData,
              maxNumber
            );
            const isAddition = Object.values(ADDITION_SKILLS).includes(
              inputData.skill as ADDITION_SKILLS
            );
            const isSubtraction = Object.values(SUBTRACTION_SKILLS).includes(
              inputData.skill as SUBTRACTION_SKILLS
            );

            if (isAddition || (isSubtraction && idx === 0))
              correctAnswer += numObjects;
            else if (isSubtraction) correctAnswer -= numObjects;
            else correctAnswer = numObjects;

            visualsData.push(objectData);
            break;

          case VisualsType.TEXT:
          case VisualsType.MATH_SIGN:
          default:
          // do nothing (note: we still need to handle shapes)
        }
      });
    }

    // TODO: THIS IS NOT WORKING FOR ALL QUESTIONS! (revisit later)
    return {
      instructions: inputData.question,
      skill: inputData.skill,
      visualsTypes: inputData.visuals,
      visualsData,
      answerData: {
        answerType: inputData.answerType,
        [inputData.answerType]: {
          optionsType: inputData.answerChoiceType,
          optionsData: answerChoices.map((num) => ({ text: num })),
          correctAnswerIdx,
        },
      },
    };
  };

  const getGameData = (): GameDataType => {
    let frames: FrameData[] = [];
    INPUT_STORY_DATA.forEach((frameData) => {
      if (Object.values(frameData).includes('story')) {
        let text = (frameData as InputStoryFrameData).story;
        text = text.replace('#NAME#', characterName);
        frames.push({ type: FrameType.Story, [FrameType.Story]: { text } });
      } else {
        // we have a question
        const frameStoryData = frameData as InputStoryDataQuestion;
        const questionData = getQuestionData(frameStoryData);
        frames.push({
          type: FrameType.Question,
          [FrameType.Question]: questionData,
        });
      }
    });
    return {
      title: MIXED_OPERATION_SHOPPING.title,
      coverImage: MIXED_OPERATION_SHOPPING.coverImage,
      description: MIXED_OPERATION_SHOPPING.description,
      skills: MIXED_OPERATION_SHOPPING.skills,
      frames: [],
    };
  };

  // Update the game data when the component mounts
  useEffect(() => setGameData(getGameData()), []);

  return { gameData };
};
