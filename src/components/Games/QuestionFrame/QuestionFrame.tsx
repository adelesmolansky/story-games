import { useSettings } from '../../../contexts/SettingsContext';
import { ProceedFuncType } from '../Games';
import {
  AnswerType,
  MultipleChoiceAnswerType,
  QuestionFrameData,
} from '../util/types';
import MultipleChoiceAnswers, {
  ChoiceSize,
} from './Choices/MultipleChoiceAnswers';
import QuestionVisuals from './QuestionVisuals/QuestionVisuals';
import './QuestionFrame.css';
import { getFontSize, TextPurpose } from '../../../util/fontSize';

type QuestionFrameProps = {
  questionFrameData: QuestionFrameData;
  proceedToNextFrame: ProceedFuncType;
};

const QuestionFrame = ({
  questionFrameData,
  proceedToNextFrame,
}: QuestionFrameProps) => {
  const { settings } = useSettings();
  const { visualsTypes, visualsData } = questionFrameData;
  const { answerType } = questionFrameData.answerData;

  // Handle the instructions
  const instructionsPosition = questionFrameData.instructionsPosition || 'top';
  const instructionsContainer = (
    <div className="instructions-container">
      <h1
        className="instructions-text"
        style={{
          fontSize: getFontSize(
            settings.fontSize,
            TextPurpose.QUESTION_INSTRUCTIONS
          ),
        }}
      >
        {questionFrameData.instructions}
      </h1>
    </div>
  );

  // Handle the visuals
  const gameHasVisuals = visualsTypes && visualsData;

  return (
    <div
      className="question-frame-container"
      style={{
        justifyContent: gameHasVisuals ? 'space-between' : 'flex-start',
      }}
    >
      {instructionsPosition === 'top' && instructionsContainer}
      {gameHasVisuals && (
        <div className="visuals-container">
          {visualsTypes.map((type, idx) => (
            <QuestionVisuals
              visualsType={type}
              visualsData={visualsData![idx]}
              allVisualsData={visualsData!}
              visualsTypes={visualsTypes}
              key={idx}
            />
          ))}
        </div>
      )}
      {instructionsPosition === 'bottom' && instructionsContainer}

      <div
        className="choices-container"
        style={{ marginTop: gameHasVisuals ? 'auto' : '8%' }}
      >
        {answerType === AnswerType.MULTIPLE_CHOICE && (
          <MultipleChoiceAnswers
            handleAnswer={proceedToNextFrame}
            answerData={
              questionFrameData.answerData[
                AnswerType.MULTIPLE_CHOICE
              ] as MultipleChoiceAnswerType
            }
            choiceSize={gameHasVisuals ? ChoiceSize.SMALL : ChoiceSize.LARGE}
          />
        )}
        {/* TODO: Add the other answer type components */}
      </div>
    </div>
  );
};

export default QuestionFrame;
