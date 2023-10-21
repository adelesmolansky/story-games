/**
 * Visuals type can appear as the main game visuals or within answer choices
 */
export enum VisualsType {
  // objects can be shapes or images, can be arranged in various ways, and can
  // have varying colors or attributed
  OBJECTS = 'OBJECTS',
  // text can be of varying size and purpose (e.g., digit, single-word, paragraph)
  TEXT = 'TEXT',
  // shapes can be defined in various ways, have varying colors and sizes
  SHAPE = 'SHAPE',
  // e.g., addition, subtraction, box, comparison sign,
  MATH_SIGN = 'MATH_SIGN',
}

export type ObjectVisualsType = {
  num: number; // the number of items to display (=|imgs|)
  // if there is only one image, it will be repeated [num] times
  imgs: string | string[];
  // the name of the object(s) for audio and accessibility purposes
  names: string | string[];
  // how the objects are arranged in their container; default is [linear_wrap]
  arrangement?: 'abstract' | 'linear' | 'linear_wrap';
  // how the objects are aligned in their container; default is center
  alignment?: 'left' | 'center' | 'right';
  // sometimes images are scaled for the game (e.g., which apple is bigger?)
  scale?: 'small' | 'medium' | 'large';
};

export type TextVisualsType = {
  text: string | number;
  alignment?: 'left' | 'center' | 'right';
  // sometimes text is scaled for the game (e.g., which letter is bigger?)
  scale?: 'small' | 'medium' | 'large';
};

export type ShapeVisualsType = {
  // Shapes may be defined by the name, number of sides, or an image
  shapeName?: string; // TODO: add shape name enums
  numSides?: number;
  shapeImg?: string;
};

export type MathSignVisualsType = {
  name:
    | 'addition'
    | 'subtraction'
    | 'multiplication'
    | 'division'
    | 'equals'
    | 'greater_than'
    | 'less_than'
    | 'empty_box';
};

export type SingleVisualsDataType =
  | ObjectVisualsType
  | TextVisualsType
  | ShapeVisualsType
  | MathSignVisualsType;

/**
 * Students can submit answers in various ways. The answer type determines how
 * the game template is arranged and how the answer is checked for correctness.
 */
export enum AnswerType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  SELECT_MULTIPLE = 'SELECT_MULTIPLE',
  TEXT_INPUT = 'TEXT_INPUT',
  DRAG_AND_DROP = 'DRAG_AND_DROP',
}

export type MultipleChoiceAnswerType = {
  optionsType: VisualsType; // all answer choices must be of the same type
  optionsData: SingleVisualsDataType[];
  correctAnswerIdx: number;
  // default is row
  flexDirection?: 'row' | 'column';
  flexWrap?: 'wrap' | 'nowrap';
};

export type SelectMultipleAnswerType = {
  optionsType: VisualsType; // all answer choices must be of the same type
  optionsData: SingleVisualsDataType[];
  correctAnswerIdxs: number[];
  // default is row
  flexDirection?: 'row' | 'column';
};

export type TextInputAnswerType = {
  correctAnswer: string;
};

export type DragAndDropAnswerType = {}; // TODO: implement

/**
 * Frame types can be either a story frame or a question frame
 */
export enum FrameType {
  Story = 'story',
  Question = 'question',
}

export type StoryFrameData = {
  type?: 'TODO'; // We will want different types of story frames to add visual variety
  text: string;
};

export type AnswerChoiceData = {
  answerType: AnswerType;
  [AnswerType.MULTIPLE_CHOICE]?: MultipleChoiceAnswerType;
  [AnswerType.SELECT_MULTIPLE]?: SelectMultipleAnswerType;
  [AnswerType.TEXT_INPUT]?: TextInputAnswerType;
  [AnswerType.DRAG_AND_DROP]?: DragAndDropAnswerType;
};

export type QuestionFrameData = {
  instructions: string;
  visualsTypes: VisualsType[];
  // this data must match the visualsType
  visualsData: SingleVisualsDataType[];
  answerData: AnswerChoiceData;
};

// Type to organize the game data
export type GameDataType = {
  title: string;
  coverImage: string;
  description: string;
  frames: {
    type: FrameType;
    [FrameType.Story]?: StoryFrameData;
    [FrameType.Question]?: QuestionFrameData;
  }[];
};
