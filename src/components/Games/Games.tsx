import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import Feedback from './Feedback/Feedback';
import QuestionFrame from './QuestionFrame/QuestionFrame';
import StoryFrame from './StoryFrame/StoryFrame';
import { FrameType, GameDataType } from './util/types';

enum GameState {
  FRAME,
  FEEDBACK,
  END,
}

export type ProceedFuncType = (
  frameType: FrameType,
  isCorrect?: boolean
) => void;

type StoryGameProps = {
  gameData: GameDataType;
};

const StoryGame: React.FC<StoryGameProps> = ({ gameData }) => {
  const [gameState, setGameState] = useState(GameState.FRAME);

  // Initiate the frame logic
  const [currentFrame, setCurrentFrame] = useState(0);
  const { frames } = gameData;
  const frame = frames[currentFrame];
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  /**
   * Handle logic for proceeding to the next frame.
   * - If the current frame is a question frame, show feedback
   * - If current frame is a story frame, just proceed to the next frame
   * - If there are no more frames, the game is over so show end game screen
   */
  const proceedToNextFrame = (frameType: FrameType, isCorrect?: boolean) => {
    const goToNextFrame = () => setCurrentFrame((prev) => prev + 1);
    if (currentFrame < frames.length - 1) {
      if (frameType === FrameType.Story) goToNextFrame();
      else {
        // Show feedback based on whether the answer was correct or not
        setGameState(GameState.FEEDBACK);
        if (isCorrect) setAnsweredCorrectly(true);
        else setAnsweredCorrectly(false);

        // Wait 2 seconds before proceeding to the next frame
        setTimeout(() => {
          setGameState(GameState.FRAME);
          goToNextFrame();
        }, 2000);
      }
    } else {
      // Game ended
      // TODO:  redirect to a game-over screen or back to the main menu.
    }
  };

  return (
    <Layout>
      {gameState === GameState.FRAME &&
        (frame.type === FrameType.Story ? (
          <StoryFrame
            storyFrameData={frame[FrameType.Story]!}
            proceedToNextFrame={proceedToNextFrame}
          />
        ) : (
          <QuestionFrame
            questionFrameData={frame[FrameType.Question]!}
            proceedToNextFrame={proceedToNextFrame}
          />
        ))}

      {gameState === GameState.FEEDBACK && (
        <Feedback correct={answeredCorrectly} />
      )}
    </Layout>
  );
};

export default StoryGame;
