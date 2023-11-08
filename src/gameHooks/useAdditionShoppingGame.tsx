import { useEffect, useState } from 'react';
import { ADDITION_SKILLS } from '../components/Games/util/skills';
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
  getNumFromCode,
  getObjectQuestionData,
  InputStoryDataQuestion,
  InputStoryFrameData,
} from './util';

export enum NumberGenerationRules {
  MAX10 = 'Numbers up to 10',
  MAX20 = 'Numbers up to 20',
  // in the future we can add more rules
}

export const ADDITION_SHOPPING_GAME = {
  title: 'Shopping Adventure',
  coverImage: '/imgs/coverImgs/groceryStore.png',
  description:
    'Supports skills in basic addition through a journey to the grocery store.',
  skills: [ADDITION_SKILLS.ADD_OBJECTS, ADDITION_SKILLS.ADD_NUMBERS],
  frames: [], // this gets filled in later
};

/**
 * The data for the "Addition Shopping Game".
 * We can abstract more elements of this in the future.
 * This is the format of data that we would need to create for each game.
 */
const INPUT_STORY_DATA: (InputStoryDataQuestion | InputStoryFrameData)[] = [
  { story: "$NAME$ and $NAME$'s mom are planning to cook a fruit cake." },
  { story: 'They go grocery shopping to buy ingredients.' },
  { story: 'They need to buy fruits, sugar, flour, and nuts.' },
  { story: "First $NAME$'s mom gets apples." },
  {
    story: 'She puts #NUM0# apples in one bag.',
    numRules: [NumberGenerationRules.MAX10],
  },
  { story: 'And #NUM1# apples in another bag.' },
  {
    story: '$NAME$ wants to know the total number of apples.',
    numRules: [NumberGenerationRules.MAX10],
  },

  {
    question: 'What is the sum?',
    skill: ADDITION_SKILLS.ADD_OBJECTS,
    visuals: [VisualsType.OBJECTS, VisualsType.MATH_SIGN, VisualsType.OBJECTS],
    img: 'apple',
    nums: [[0], [1]],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  { story: "$NAME$ doesn't think they have enough apples." },
  {
    story: '$NAME$ gets #NUM2# more apples.',
    numRules: [NumberGenerationRules.MAX10],
  },
  {
    question: 'How many apples are there in total?',
    skill: [ADDITION_SKILLS.ADD_NUMBERS, ADDITION_SKILLS.ADD_OBJECTS],
    visuals: [VisualsType.TEXT, VisualsType.MATH_SIGN, VisualsType.OBJECTS],
    img: 'apple',
    nums: [[0, 1], [2]],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  { story: 'Next $NAME$ goes to get oranges.' },
  {
    story: '$NAME$ puts #NUM3# oranges in one bag.',
    numRules: [NumberGenerationRules.MAX20],
  },
  {
    story: 'And #NUM4# oranges in another bag.',
    numRules: [NumberGenerationRules.MAX20],
  },
  {
    question: 'What is the sum?',
    skill: ADDITION_SKILLS.ADD_OBJECTS,
    visuals: [VisualsType.OBJECTS, VisualsType.MATH_SIGN, VisualsType.OBJECTS],
    img: 'orange',
    nums: [[3], [4]],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },
  // TODO: Figure out how to do this for the story
  // { story: 'Now Lucy has #NUM0+NUM1+NUM2# apples and #NUM3+NUM4# oranges.' },
  { story: 'Now Lucy has apples and oranges.' },
  {
    question: 'How many fruits are there in total?',
    skill: ADDITION_SKILLS.ADD_NUMBERS,
    visuals: [VisualsType.TEXT, VisualsType.MATH_SIGN, VisualsType.TEXT],
    nums: [
      [0, 1, 2],
      [3, 4],
    ],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },

  { story: 'Next $NAME$ goes to find sugar.' },
  { story: 'They need #NUM5# cups of sugar for the base of the cake.' },
  { story: 'And #NUM6# cups of sugar for the frosting.' },
  {
    question: 'How many cups of sugar do they need in total?',
    skill: ADDITION_SKILLS.ADD_NUMBERS,
    visuals: [VisualsType.TEXT, VisualsType.MATH_SIGN, VisualsType.TEXT],
    nums: [[5], [6]],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },

  { story: "After the sugar, $NAME$ and $NAME$'s mom move on to the flour." },
  { story: 'They find two types of flour: all-purpose and whole wheat.' },
  { story: 'They put #NUM7# bags of all-purpose flour in the cart.' },
  { story: 'And they add #NUM8# bags of whole wheat flour.' },
  {
    question: 'How many bags of flour do they have altogether?',
    skill: ADDITION_SKILLS.ADD_NUMBERS,
    visuals: [VisualsType.TEXT, VisualsType.MATH_SIGN, VisualsType.TEXT],
    nums: [[7], [8]],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },

  { story: 'Then, $NAME$ suggests buying some nuts for the cake topping.' },
  { story: 'They grab a scoop and get #NUM9# walnuts.' },
  { story: 'They also get #NUM10# almonds.' },
  {
    question: 'What is the total count of nuts they selected?',
    skill: ADDITION_SKILLS.ADD_NUMBERS,
    visuals: [VisualsType.TEXT, VisualsType.MATH_SIGN, VisualsType.TEXT],
    nums: [[9], [10]],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },

  { story: 'Before they check out, $NAME$ remembers they need eggs.' },
  {
    story: 'They take #NUM11# eggs from the shelf.',
    numRules: [NumberGenerationRules.MAX20],
  },
  {
    story: "$NAME$'s mom says they need #NUM12# more eggs.",
    numRules: [NumberGenerationRules.MAX20],
  },
  {
    question: 'How many eggs do they have in total?',
    skill: ADDITION_SKILLS.ADD_OBJECTS,
    visuals: [VisualsType.OBJECTS, VisualsType.MATH_SIGN, VisualsType.OBJECTS],
    img: 'egg',
    nums: [[11], [12]],
    answerType: AnswerType.MULTIPLE_CHOICE,
    answerChoiceType: VisualsType.TEXT,
  },

  { story: 'Finally, they have all the ingredients.' },
  { story: 'They go to the cashier to pay for the groceries.' },
  { story: '$NAME$ helps put items on the counter.' },

  { story: "$NAME$'s mom pays for the groceries." },
  { story: 'And they leave the grocery story.' },
  { story: '$NAME$ is excited to cook dinner!' },
  { story: 'THE END' },
];

/**
 * Hook for the "Addition Shopping Game"
 * The game has different numeric values every time it is played.
 * Every question is multiple choice and has text answer choices.
 */
export const useAdditionShoppingGame = () => {
  const { maxNumber, numAnswerChoices } = useDifficulty();
  const [gameData, setGameData] = useState<GameDataType>(EMPTY_GAME_DATA);
  const [characterName, setCharacterName] = useState<string>('Lucy'); // default name

  /**
   * Get the data for a single question where there is a MC question and the
   * visuals are adding objects or number.
   */
  const getQuestionData = (
    inputData: InputStoryDataQuestion,
    variableNumData: number[]
  ): QuestionFrameData => {
    let correctAnswer: number = 0; // temp value
    let answerChoices: number[] = [];
    let correctAnswerIdx: number;

    // check if we need generate new numbers or we already have them already in the story
    const useGeneratedNums = Object.keys(inputData).includes('nums');

    // Handle the question visuals
    let visualsData: SingleVisualsDataType[] = [];
    inputData.visuals!.forEach((visualType, idx) => {
      // Add to the correct answer
      let numForThisVisual = 0;
      if (visualType !== VisualsType.MATH_SIGN && useGeneratedNums) {
        const numsLst: number[] = inputData.nums![idx === 0 ? 0 : 1];
        numsLst.forEach(
          (num: number) => (numForThisVisual += variableNumData[num])
        );
        correctAnswer += numForThisVisual;
      }

      switch (visualType) {
        case VisualsType.OBJECTS:
          if (useGeneratedNums) {
            const { objectData } = getObjectQuestionData(
              inputData,
              undefined,
              numForThisVisual
            );
            visualsData.push(objectData);
          } else {
            // we need to generate the numbers for this question
            const { numObjects, objectData } = getObjectQuestionData(
              inputData,
              maxNumber
            );
            correctAnswer += numObjects;
            visualsData.push(objectData);
          }
          break;

        case VisualsType.TEXT:
          if (useGeneratedNums) {
            visualsData.push({ text: numForThisVisual.toString() });
          } else {
            const num = Math.floor(Math.random() * maxNumber) + 1;
            correctAnswer += num;
            visualsData.push({ text: num.toString() });
          }
          break;

        case VisualsType.MATH_SIGN:
          visualsData.push({ name: 'addition' });
          break;
        default:
          break; // we will never get here in this game
      }
    });

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
    const variableNumData: number[] = [];
    let frames: FrameData[] = [];
    INPUT_STORY_DATA.forEach((frameData) => {
      if (Object.keys(frameData).includes('story')) {
        let text = (frameData as InputStoryFrameData).story;

        // Handle variables in the story
        text = text.replaceAll('$NAME$', characterName);

        // check if the text container #NUM_# and replace with a random number
        if (text.includes('#NUM')) {
          const num = getNumFromCode(text);

          // check if we have not already generated a data for this number in [variableNumData]
          if (variableNumData.length === num) {
            let generatedNum;
            if (Object.keys(frameData).includes('numRules')) {
              const rules = (frameData as InputStoryFrameData).numRules!;
              if (rules.includes(NumberGenerationRules.MAX10))
                generatedNum =
                  Math.floor(Math.random() * Math.max(10, maxNumber)) + 1;
              else if (rules.includes(NumberGenerationRules.MAX20))
                generatedNum =
                  Math.floor(Math.random() * Math.max(20, maxNumber)) + 1;
              // we do not have any other rules implemented yet
              else generatedNum = Math.floor(Math.random() * maxNumber) + 1;
            } else generatedNum = Math.floor(Math.random() * maxNumber) + 1;

            variableNumData.push(generatedNum);
            text = text.replace(`#NUM${num}#`, generatedNum.toString());
          } else {
            text = text.replace(`#NUM${num}#`, variableNumData[num].toString());
          }
        }

        frames.push({ type: FrameType.Story, [FrameType.Story]: { text } });
      } else {
        // we have a question
        const frameStoryData = frameData as InputStoryDataQuestion;
        const questionData = getQuestionData(frameStoryData, variableNumData);
        frames.push({
          type: FrameType.Question,
          [FrameType.Question]: questionData,
        });
      }
    });

    return {
      title: ADDITION_SHOPPING_GAME.title,
      coverImage: ADDITION_SHOPPING_GAME.coverImage,
      description: ADDITION_SHOPPING_GAME.description,
      skills: ADDITION_SHOPPING_GAME.skills,
      frames,
    };
  };

  // Update the game data when the component mounts
  useEffect(() => setGameData(getGameData()), []);

  return { gameData };
};
