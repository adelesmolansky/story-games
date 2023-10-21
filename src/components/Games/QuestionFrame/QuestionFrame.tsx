import { useSettings } from '../../../contexts/SettingsContext';
import { ProceedFuncType } from '../Games';
import {
  AnswerType,
  MultipleChoiceAnswerType,
  QuestionFrameData,
} from '../util/types';
import MultipleChoiceAnswers from './Choices/MultipleChoiceAnswers';
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

  return (
    <div className="question-frame-container">
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
      {visualsTypes && (
        <div className="visuals-container">
          {visualsTypes.map((type, idx) => (
            <QuestionVisuals
              visualsType={type}
              visualsData={visualsData![idx]}
              key={idx}
            />
          ))}
        </div>
      )}

      <div className="choices-container">
        {answerType === AnswerType.MULTIPLE_CHOICE && (
          <MultipleChoiceAnswers
            handleAnswer={proceedToNextFrame}
            answerData={
              questionFrameData.answerData[
                AnswerType.MULTIPLE_CHOICE
              ] as MultipleChoiceAnswerType
            }
          />
        )}
        {/* TODO: Add the other answer type components */}
      </div>
    </div>
  );
};

export default QuestionFrame;
