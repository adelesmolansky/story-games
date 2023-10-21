import {
  ADDITION_SKILLS,
  COMPARISON_SKILLS,
  COUNTING_SKILLS,
  SUBTRACTION_SKILLS,
} from './util/skills';
import { GameDataType, FrameType, VisualsType, AnswerType } from './util/types';

const COUNTING_PARK_STORY: GameDataType = {
  title: 'A Day at the Park',
  coverImage: '/imgs/coverImgs/park.png',
  description:
    'Supports skills in basic counting through a walk in the park story.',
  skills: [COUNTING_SKILLS.CARDINALITY],
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
          { num: 5, imgs: '/bird.png', names: 'bird', arrangement: 'linear' },
        ],
        answerData: {
          answerType: AnswerType.MULTIPLE_CHOICE,
          [AnswerType.MULTIPLE_CHOICE]: {
            correctAnswerIdx: 1,
            optionsType: VisualsType.TEXT,
            optionsData: [{ text: 3 }, { text: 5 }, { text: 6 }],
          },
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
      type: FrameType.Question,
      [FrameType.Question]: {
        instructions: 'How many pretzels are there?',
        skill: COUNTING_SKILLS.ABSTRACTION,
        visualsTypes: [VisualsType.OBJECTS],
        visualsData: [
          {
            num: 3,
            imgs: '/pretzel.png',
            names: 'pretzel',
            arrangement: 'abstract',
          },
        ],
        answerData: {
          answerType: AnswerType.MULTIPLE_CHOICE,
          [AnswerType.MULTIPLE_CHOICE]: {
            correctAnswerIdx: 0,
            optionsType: VisualsType.TEXT,
            optionsData: [{ text: 3 }, { text: 5 }, { text: 6 }],
          },
        },
      },
    },
  ],
};

const MIXED_STORY: GameDataType = {
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
          { num: 4, imgs: '/apple.png', names: 'apple', arrangement: 'linear' },
          { name: 'addition' },
          { num: 3, imgs: '/apple.png', names: 'apple', arrangement: 'linear' },
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
          { num: 4, imgs: '/apple.png', names: 'apple', arrangement: 'linear' },
          { name: 'subtraction' },
          { num: 3, imgs: '/apple.png', names: 'apple', arrangement: 'linear' },
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

export const GAMES_DATA: { [key: string]: GameDataType } = {
  countingPark: COUNTING_PARK_STORY,
  additionShopping: MIXED_STORY,
};
