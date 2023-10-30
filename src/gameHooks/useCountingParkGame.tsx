import { useEffect, useState } from 'react';
import { COUNTING_SKILLS } from '../components/Games/util/skills';
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

export const COUNTING_PARK_DATA = {
  title: 'A Day at the Park',
  coverImage: '/imgs/coverImgs/park.png',
  description:
    'Supports skills in basic counting through a walk in the park story.',
  skills: [COUNTING_SKILLS.CARDINALITY],
  frames: [], // this gets filled in later
};

const NUM_QUESTIONS = 6;

type QuestionDataType = {
  visualsNum: number;
  answerChoices: {
    correctAnswerIdx: number;
    optionsType: VisualsType;
    optionsData: any[];
  };
};

/**
 * Hook for the "Counting Park Game"
 * The game has different numeric values every time it is played.
 * Every question is multiple choice and has text answer choices.
 */
export const useCountingParkGame = () => {
  const { maxNumber, numAnswerChoices } = useDifficulty();
  const [gameData, setGameData] = useState<GameDataType>(EMPTY_GAME_DATA);

  /**
   * Get the new question that that will be used for the game questions.
   * All questions are multiple choice and have text answer choices.
   */
  const getNewQuestionsData = () => {
    const newQuestionsData: QuestionDataType[] = [];
    for (let i = 0; i < NUM_QUESTIONS; i++) {
      const visualsNum = Math.floor(Math.random() * maxNumber) + 1;
      // generate [numAnswerChoices -1] unique random numbers between 1 and maxNumber
      let answerChoices: number[] = [];
      while (answerChoices.length < numAnswerChoices - 1) {
        const randomNum = Math.floor(Math.random() * maxNumber) + 1;
        if (!answerChoices.includes(randomNum) && visualsNum !== randomNum)
          answerChoices.push(randomNum);
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
    return newQuestionsData;
  };

  const getGameData = (): GameDataType => {
    const questionsData = getNewQuestionsData();
    return {
      title: COUNTING_PARK_DATA.title,
      coverImage: COUNTING_PARK_DATA.coverImage,
      description: COUNTING_PARK_DATA.description,
      skills: COUNTING_PARK_DATA.skills,
      frames: [
        // Intro frame
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Alex walks into a park.',
          },
        },
        // First math question
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Alex notices some birds on a tree.',
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'The birds chirp.',
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'How many birds are there?',
            skill: COUNTING_SKILLS.CARDINALITY,
            visualsTypes: [VisualsType.OBJECTS],
            visualsData: [
              {
                num: questionsData[0].visualsNum,
                imgs: '/bird.png',
                names: 'bird',
                arrangement: 'linear',
              },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: questionsData[0].answerChoices,
            },
          },
        },

        // Second math question
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Walking further, Alex finds a snack stand selling pretzels.',
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'The pretzels smell delicious.',
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Alex wants to count the number of pretzels at the stand.',
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'How many pretzels are there?',
            skill: COUNTING_SKILLS.ABSTRACTION,
            visualsTypes: [VisualsType.OBJECTS],
            visualsData: [
              {
                num: questionsData[1].visualsNum,
                imgs: '/pretzel.png',
                names: 'pretzel',
              },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: questionsData[1].answerChoices,
            },
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Alex notices another snack stand selling pretzels.',
          },
        },
        // Third math question
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'How many pretzels are there?',
            skill: COUNTING_SKILLS.ABSTRACTION,
            visualsTypes: [VisualsType.OBJECTS],
            visualsData: [
              {
                num: questionsData[2].visualsNum,
                imgs: '/pretzel.png',
                names: 'pretzel',
              },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: questionsData[2].answerChoices,
            },
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Alex gets a pretzel and is really happy!',
          },
        },

        // Forth math question
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Next, Alex sees other children flying kites.',
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Alex wants to count the number of kites he sees.',
          },
        },
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'How many kites are there?',
            skill: COUNTING_SKILLS.ABSTRACTION,
            visualsTypes: [VisualsType.OBJECTS],
            visualsData: [
              {
                num: questionsData[3].visualsNum,
                imgs: '/kite.png',
                names: 'kite',
              },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: questionsData[3].answerChoices,
            },
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Now Alex gets to fly his own kite.',
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Alex really enjoys flying kites.',
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'After flying his kite, Alex gets tired.',
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'Alex looks up at the sky and sees different kites.',
          },
        },
        // Fifth math question
        {
          type: FrameType.Question,
          [FrameType.Question]: {
            instructions: 'How many kites are there?',
            skill: COUNTING_SKILLS.ABSTRACTION,
            visualsTypes: [VisualsType.OBJECTS],
            visualsData: [
              {
                num: questionsData[4].visualsNum,
                imgs: '/kite.png',
                names: 'kite',
              },
            ],
            answerData: {
              answerType: AnswerType.MULTIPLE_CHOICE,
              [AnswerType.MULTIPLE_CHOICE]: questionsData[4].answerChoices,
            },
          },
        },
        {
          type: FrameType.Story,
          [FrameType.Story]: {
            text: 'THE END',
          },
        },
      ],
    };
  };

  // Update the game data when the component mounts
  useEffect(() => setGameData(getGameData()), []);

  return { gameData };
};
