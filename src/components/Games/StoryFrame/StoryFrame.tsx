import { useSettings } from '../../../contexts/SettingsContext';
import { getFontSize, TextPurpose } from '../../../util/fontSize';
import { FrameType, StoryFrameData } from '../util/types';
import './StoryFrame.css';

type StoryFrameProps = {
  storyFrameData: StoryFrameData;
  proceedToNextFrame: (frameType: FrameType, isCorrect?: true) => void;
};

const StoryFrame = ({
  storyFrameData,
  proceedToNextFrame,
}: StoryFrameProps) => {
  const { settings } = useSettings();
  const { continueButton } = settings;

  return (
    <div className="story-frame-container">
      <div className="story-text">
        <p
          style={{
            fontSize: getFontSize(settings.fontSize, TextPurpose.STORY_MAIN),
          }}
        >
          {storyFrameData.text}
        </p>
      </div>
      <div className="button-container">
        <button
          className="continue-button"
          style={{
            backgroundColor: continueButton.backgroundColor,
            color: continueButton.textColor,
            fontSize: getFontSize(
              settings.fontSize,
              TextPurpose.CONTINUE_BUTTON
            ),
          }}
          onClick={() => proceedToNextFrame(FrameType.Story)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StoryFrame;
