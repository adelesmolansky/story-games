import { useEffect, useState } from 'react';
import { COUNTING_SKILLS } from '../components/Games/util/skills';
import {
  AnswerType,
  FrameData,
  FrameType,
  GameDataType,
  QuestionFrameData,
  SingleVisualsDataType,
  VisualsType,
} from '../components/Games/util/types';
import { useDifficulty } from '../contexts/DifficultyContext';
import {
  EMPTY_GAME_DATA,
  getObjectQuestionData,
  InputStoryDataQuestion,
  InputStoryFrameData,
} from './util';

// This shows how different games can have different numbers used the game.
// Everything else remains the same from game to game.

export const COUNTING_PARK_DATA = {
  title: 'A Day at the Park',
  coverImage: '/imgs/coverImgs/park.png',
  description:
    'Supports skills in basic counting through a walk in the park story.',
  skills: [COUNTING_SKILLS.CARDINALITY, COUNTING_SKILLS.ABSTRACTION],
  frames: [], // this gets filled in later
};

/**
 * The data for the "Counting Park Game".
 * We can abstract more elements of this in the future.
 * This is the format of data that we would need to create for each game.
 */
const INPUT_STORY_DATA: (InputStoryDataQuestion | InputStoryFrameData)[] = [
  { story: '$NAME$ walks into a park.' },
  { story: '$NAME$ notices some birds on a tree.' },
  { story: 'The birds chirp.' },
  {
    question: 'How many birds are there?',
    img: 'bird',
    skill: COUNTING_SKILLS.CARDINALITY,
    visuals: [VisualsType.OBJECTS],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  { story: 'Walking further, $NAME$ finds a snack stand selling pretzels.' },
  { story: 'The pretzels smell delicious.' },
  { story: '$NAME$ wants to count the number of pretzels at the stand.' },
  {
    question: 'How many pretzels are there?',
    img: 'pretzel',
    skill: COUNTING_SKILLS.CARDINALITY,
    visuals: [VisualsType.OBJECTS],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  { story: '$NAME$ notices another snack stand selling pretzels.' },
  {
    question: 'How many pretzels are there?',
    img: 'pretzel',
    skill: COUNTING_SKILLS.ABSTRACTION,
    visuals: [VisualsType.OBJECTS],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  { story: '$NAME$ gets a pretzel and is really happy!' },
  { story: 'Next, $NAME$ sees other children flying kites.' },
  { story: '$NAME$ wants to count the number of kites he sees.' },
  {
    question: 'How many kites are there?',
    img: 'kite',
    skill: COUNTING_SKILLS.ABSTRACTION,
    visuals: [VisualsType.OBJECTS],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  { story: 'Now $NAME$ gets to fly his own kite.' },
  { story: '$NAME$ is having a great time!' },
  { story: 'After flying his kite, $NAME$ gets tired.' },
  { story: '$NAME$ looks up and sees different kites.' },
  {
    question: 'How many kites are there?',
    img: 'kite',
    skill: COUNTING_SKILLS.ABSTRACTION,
    visuals: [VisualsType.OBJECTS],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  { story: '$NAME$ goes home.' },
  { story: '$NAME$ had a great day at the park!' },
  { story: 'THE END' },
];

/**
 * Hook for the "Counting Park Game"
 * The game has different numeric values every time it is played.
 * Every question is multiple choice and has text answer choices.
 */
export const useCountingParkGame = () => {
  const { maxNumber, numAnswerChoices } = useDifficulty();
  const [gameData, setGameData] = useState<GameDataType>(EMPTY_GAME_DATA);
  const [characterName, setCharacterName] = useState<string>('Alex'); // default name

  /**
   * Get the data for a single question where there is a MC question and the
   * visuals are objects.
   */
  const getQuestionData = (
    inputData: InputStoryDataQuestion
  ): QuestionFrameData => {
    let correctAnswer: number = 0; // temp value
    let answerChoices: number[] = [];
    let correctAnswerIdx: number;

    // Handle the question visuals
    let visualsData: SingleVisualsDataType[] = [];
    const { numObjects, objectData } = getObjectQuestionData(
      inputData,
      Math.max(maxNumber, 20) // we cannot have more than 20 objects
    );
    correctAnswer = numObjects;
    visualsData.push(objectData);

    // generate [numAnswerChoices -1] unique random numbers between 1 and maxNumber
    while (answerChoices.length < numAnswerChoices - 1) {
      const randomNum = Math.floor(Math.random() * maxNumber) + 1;
      if (!answerChoices.includes(randomNum) && correctAnswer !== randomNum)
        answerChoices.push(randomNum);
    }
    // choose a random position for the correct answer
    correctAnswerIdx = Math.floor(Math.random() * numAnswerChoices);
    answerChoices.splice(correctAnswerIdx, 0, correctAnswer);

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

  /**
   * Get the data for the entire game.
   */
  const getGameData = (): GameDataType => {
    let frames: FrameData[] = [];
    INPUT_STORY_DATA.forEach((frameData) => {
      if (Object.keys(frameData).includes('story')) {
        let text = (frameData as InputStoryFrameData).story;
        text = text.replace('$NAME$', characterName);
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
      title: COUNTING_PARK_DATA.title,
      coverImage: COUNTING_PARK_DATA.coverImage,
      description: COUNTING_PARK_DATA.description,
      skills: COUNTING_PARK_DATA.skills,
      frames,
    };
  };

  // Update the game data when the component mounts
  useEffect(() => setGameData(getGameData()), []);

  return { gameData };
};
