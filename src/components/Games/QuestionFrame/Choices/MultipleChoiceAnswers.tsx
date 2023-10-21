import { useSettings } from '../../../../contexts/SettingsContext';
import { getFontSize, TextPurpose } from '../../../../util/fontSize';
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

type Props = {
  answerData: MultipleChoiceAnswerType;
  handleAnswer: ProceedFuncType;
};

/**
 * Component for rendering the answer choices for a game question frame that has
 * multiple choices.
 */
const MultipleChoiceAnswers = ({ answerData, handleAnswer }: Props) => {
  const { settings } = useSettings();
  const {
    optionsType,
    optionsData,
    correctAnswerIdx,
    flexDirection,
    flexWrap,
  } = answerData;

  /**
   * @param choice data for the answer choice
   * @param index index of the answer choice in the array of answer choices
   * @returns the JSX element for a single answer choice
   */
  const getChoice = (choice: SingleVisualsDataType, index: number) => {
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
        className="choice-button"
        style={{
          // todo: clean this up to not hard code here
          backgroundColor: settings.answerChoices.backgroundColor,
          color: settings.answerChoices.textColor,
          borderColor: settings.answerChoices.textColor,
          // TODO: revise this function to handle longer/shorter text
          fontSize: getFontSize(settings.fontSize, TextPurpose.ANSWER_CHOICES),
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
    // TODO:
    <div
      className="choice-container"
      style={{
        flexDirection: flexDirection || 'row',
        flexWrap: flexWrap || 'wrap',
      }}
    >
      {optionsData.map((choice, index) => getChoice(choice, index))}
    </div>
  );
};
export default MultipleChoiceAnswers;
