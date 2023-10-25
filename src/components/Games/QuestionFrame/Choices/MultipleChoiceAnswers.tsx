import { useSettings } from '../../../../contexts/SettingsContext';
import { getMaxTextVisualsLength } from '../../../../util/fontSize';
import { ProceedFuncType } from '../../Games';
import {
  FrameType,
  MultipleChoiceAnswerType,
  ObjectVisualsType,
  SingleVisualsDataType,
  TextVisualsType,
  VisualsType,
} from '../../util/types';
import Objects from '../Visuals/Objects';
import './Choices.css';

export enum ChoiceSize {
  SMALL = 'small', // ex: when choices are on the bottom
  MEDIUM = 'medium',
  LARGE = 'large', // ex: when 2 choices are in the middle
}

const CHOICE_HEIGHT = {
  [ChoiceSize.SMALL]: 13,
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

  // Define contants general to all answer choices
  const choiceHeight = CHOICE_HEIGHT[choiceSize];
  const buttonClassNames = `choice-button-${choiceSize} choice-button`;
  const generalButtonStyles = {
    height: `${choiceHeight}rem`,
    backgroundColor: settings.answerChoices.backgroundColor,
    color: settings.answerChoices.textColor,
    borderColor: settings.answerChoices.textColor,
    // todo: add more styling based on other data
  };
  const handleClick = (index: number) =>
    handleAnswer(FrameType.Question, correctAnswerIdx === index);

  /**
   * @param choice data for the answer choice
   * @param index index of the answer choice in the array of answer choices
   * @returns the JSX element for a single answer choice
   */
  const getOneAnswerChoice = (
    choice: SingleVisualsDataType,
    index: number,
    size: ChoiceSize
  ): JSX.Element => {
    switch (optionsType) {
      case VisualsType.TEXT:
        const allTextData = optionsData as TextVisualsType[];
        const textData = choice as TextVisualsType;
        const textValue = textData.text;

        // get the length of the longest answer choice
        const maxTextLength = getMaxTextVisualsLength(allTextData);

        // Calculate font size based on text length and container width
        let fontSizeNum = choiceHeight / 1.3; // this is the max font size
        if (maxTextLength === 1) fontSizeNum = fontSizeNum;
        else if (maxTextLength === 2) fontSizeNum = fontSizeNum * 0.8;
        else if (maxTextLength === 3) fontSizeNum = fontSizeNum * 0.6;
        else if (maxTextLength === 4) fontSizeNum = fontSizeNum * 0.4;
        else if (maxTextLength < 8) fontSizeNum = fontSizeNum * 0.4;
        else if (maxTextLength < 12) fontSizeNum = fontSizeNum * 0.4;
        else fontSizeNum = fontSizeNum * 0.3;

        const fontSize = `${fontSizeNum}rem`;
        // TODO: maybe set a max font size

        return (
          <button
            key={index}
            className={buttonClassNames}
            style={{
              ...generalButtonStyles,
              width: `${
                // TODO: figure out what values to use here
                maxTextLength > 5 ? choiceHeight * 1.5 : choiceHeight
              }rem`,
              fontSize,
            }}
            onClick={() => handleClick(index)}
          >
            {textValue}
          </button>
        );

      case VisualsType.OBJECTS:
        // TODO: make sure that the objects will always be the same size
        const allObjectData = optionsData as ObjectVisualsType[];
        const objectData = choice as ObjectVisualsType;

        return (
          <button
            key={index}
            className={buttonClassNames}
            style={{
              ...generalButtonStyles,
              width: `${choiceHeight}rem`,
            }}
            onClick={() => handleClick(index)}
          >
            <Objects objectVisualsData={objectData} forAnswerChoices />
          </button>
        );

      default:
        return <div>NOT IMPLEMENTED</div>;
    }
  };

  return (
    <div
      className="choice-container"
      style={{
        flexDirection: flexDirection || 'row',
        flexWrap: flexWrap || 'wrap',
      }}
    >
      {optionsData.map((choice, index) =>
        getOneAnswerChoice(choice, index, choiceSize)
      )}
    </div>
  );
};

export default MultipleChoiceAnswers;
