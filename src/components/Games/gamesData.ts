import { GameDataType, FrameType, VisualsType, AnswerType } from './util/types';

const COUNTING_PARK_STORY: GameDataType = {
  title: 'A Day at the Park',
  coverImage: '/imgs/coverImgs/park.png',
  description:
    'Supports skills in basic counting through a walk in the park story.',
  frames: [
    // Intro frame
    {
      type: FrameType.Story,
      [FrameType.Story]: {
        text: 'Alex walks into a park.',
      },
    },
    // Set up the first math question
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
        visualsTypes: [VisualsType.OBJECTS],
        visualsData: [{ num: 5, imgs: '/bird.png', names: 'bird' }],
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

    // Set up the second math question
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
        visualsTypes: [VisualsType.OBJECTS],
        visualsData: [{ num: 3, imgs: '/pretzel.png', names: 'pretzel' }],
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

const ADDITION_SHOPPING_STORY: GameDataType = {
  title: 'Shopping Adventure',
  coverImage: '/imgs/coverImgs/groceryStore.png',
  description: 'Supports skills in basic addition through a shopping story.',
  frames: [
    {
      type: FrameType.Story,
      [FrameType.Story]: {
        text: 'TODO',
      },
    },
    // ... more frames ...
  ],
};

export const GAMES_DATA: { [key: string]: GameDataType } = {
  countingPark: COUNTING_PARK_STORY,
  additionShopping: ADDITION_SHOPPING_STORY,
};
