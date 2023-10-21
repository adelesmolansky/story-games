import { useSettings } from '../../../../contexts/SettingsContext';
import { ProceedFuncType } from '../../Games';
import {
  FrameType,
  MultipleChoiceAnswerType,
  ObjectVisualsType,
  SingleVisualsDataType,
  TextVisualsType,
  VisualsType,
} from '../../util/types';
import { IMG_FOLDER } from '../QuestionVisuals/QuestionVisuals';
import './Choices.css';

export enum ChoiceSize {
  SMALL = 'small', // ex: when choices are on the bottom
  MEDIUM = 'medium',
  LARGE = 'large', // ex: when 2 choices are in the middle
}

export const CHOICE_WIDTH = {
  [ChoiceSize.SMALL]: 10,
  [ChoiceSize.MEDIUM]: 20,
  [ChoiceSize.LARGE]: 30,
};

type Props = {
  choiceSize: ChoiceSize;
  answerData: MultipleChoiceAnswerType;
  handleAnswer: ProceedFuncType;
};

/**
 * Component for rendering the answer choices for a game question frame that has
 * multiple choices.
 */
const MultipleChoiceAnswers = ({
  choiceSize,
  answerData,
  handleAnswer,
}: Props) => {
  const { settings } = useSettings();
  // const { getFontSize } = useFontSize();
  const {
    optionsType,
    optionsData,
    correctAnswerIdx,
    flexDirection,
    flexWrap,
  } = answerData;

  const choiceWidth = CHOICE_WIDTH[choiceSize];

  /**
   * Function to handle the font size for the answer choices.
   * Font size gets recalculated when the optionsData changes which occurs at every question.
   * Font size is calculated based on the length of the longest answer choice
   * and the size of the answer choice container.
   */
  const getFontSize = (textVisualsData: TextVisualsType[]) => {
    // get the length of the longest answer choice
    const maxTextLength = textVisualsData.reduce((acc, curr) => {
      const text: string = curr.text.toString();
      return text.length > acc ? text.length : acc;
    }, 0);

    // Calculate font size based on text length and container width
    const newFontSizeRem = (choiceWidth / maxTextLength) * 0.7;
    // TODO: maybe set a max font size
    return `${newFontSizeRem}rem`;
  };

  /**
   * @param choice data for the answer choice
   * @param index index of the answer choice in the array of answer choices
   * @returns the JSX element for a single answer choice
   */
  const getChoice = (
    choice: SingleVisualsDataType,
    index: number,
    size: ChoiceSize
  ) => {
    let choiceData;
    let choiceValue;
    switch (optionsType) {
      case VisualsType.TEXT:
        choiceData = choice as TextVisualsType;
        choiceValue = choiceData.text;
        break;

      case VisualsType.OBJECTS:
        choiceData = choice as ObjectVisualsType;
        // TODO: Refactor this to not copy and paste code from QuestionVisuals.tsx
        const images = Array.isArray(choiceData.imgs)
          ? choiceData.imgs
          : new Array(choiceData.num).fill(choiceData.imgs);
        const names = Array.isArray(choiceData.names)
          ? choiceData.names
          : new Array(choiceData.num).fill(choiceData.names);

        choiceValue = images.map((img, index) => (
          <img
            key={index}
            src={`${IMG_FOLDER}${img}`}
            alt={names[index]}
            className="object-img"
          />
        ));
        break;

      default:
      //  todo: add more visuals types
    }

    return (
      <button
        key={index}
        className={`choice-button-${size} choice-button`}
        style={{
          width: `${choiceWidth}rem`, // TODO: how do we handle non-square choices?
          height: `${choiceWidth}rem`,
          backgroundColor: settings.answerChoices.backgroundColor,
          color: settings.answerChoices.textColor,
          borderColor: settings.answerChoices.textColor,
          fontSize:
            optionsType === VisualsType.TEXT
              ? getFontSize(optionsData as TextVisualsType[])
              : '',
          // todo: add more styling based on other data
        }}
        onClick={() =>
          handleAnswer(FrameType.Question, correctAnswerIdx === index)
        }
      >
        {choiceValue}
      </button>
    );
  };

  return (
    <div
      className="choice-container"
      style={{
        flexDirection: flexDirection || 'row',
        flexWrap: flexWrap || 'wrap',
      }}
    >
      {optionsData.map((choice, index) => getChoice(choice, index, choiceSize))}
    </div>
  );
};

export default MultipleChoiceAnswers;
