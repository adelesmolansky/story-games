import React, { useEffect, useState } from 'react';
import { gameHooksRegistry, GameKeys } from '../../gameHooks/util';
import Layout from '../Layout/Layout';
import Feedback from './Feedback/Feedback';
import QuestionFrame from './QuestionFrame/QuestionFrame';
import StoryFrame from './StoryFrame/StoryFrame';
import { FrameData, FrameType } from './util/types';

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
  gameKey: GameKeys;
};

const StoryGame: React.FC<StoryGameProps> = ({ gameKey }) => {
  // Initialize states
  const [gameState, setGameState] = useState(GameState.FRAME);
  const [currentFrameIdx, setCurrentFrameIdx] = useState(-1);
  const [currentFrameData, setCurrentFrameData] = useState({} as FrameData);
  const [allFramesData, setAllFramesData] = useState([] as FrameData[]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  // Get the game data
  const hookFunction = gameHooksRegistry[gameKey];
  if (!hookFunction)
    throw new Error(`No game hook associated with key: ${gameKey}`);
  const { gameData } = hookFunction(); // Invoke the hook

  useEffect(() => {
    if (gameData && gameData.frames.length > 0) setDataIsLoaded(true);
  }, [gameData]);

  // Initialize the game when the gameData is loaded
  useEffect(() => {
    if (dataIsLoaded) {
      const { frames } = gameData;
      const firstFrame = frames[0];
      setCurrentFrameIdx(0);
      setCurrentFrameData(firstFrame);
      setAllFramesData(frames);
    }
  }, [dataIsLoaded]);

  /**
   * Handle logic for proceeding to the next frame.
   * - If the current frame is a question frame, show feedback
   * - If current frame is a story frame, just proceed to the next frame
   * - If there are no more frames, the game is over so show end game screen
   */
  const proceedToNextFrame = (frameType: FrameType, isCorrect?: boolean) => {
    const goToNextFrame = () => {
      setCurrentFrameIdx((prev) => prev + 1);
      setCurrentFrameData(allFramesData[currentFrameIdx + 1]);
    };
    if (currentFrameIdx < allFramesData.length - 1) {
      if (frameType === FrameType.Story) goToNextFrame();
      else {
        // Show feedback based on whether the answer was correct or not
        setGameState(GameState.FEEDBACK);
        if (isCorrect) setAnsweredCorrectly(true);
        else setAnsweredCorrectly(false);

        // Wait 2 seconds before proceeding to the next frame
        setTimeout(() => {
          setGameState(GameState.FRAME);
          // User must answer the question correctly before proceeding to the next frame
          if (isCorrect) goToNextFrame();
        }, 2000);
      }
    } else {
      // Game ended
      // TODO:  redirect to a game-over screen or back to the main menu.
    }
  };

  return allFramesData.length > 0 ? (
    <Layout>
      {gameState === GameState.FRAME &&
        (currentFrameData.type === FrameType.Story ? (
          <StoryFrame
            storyFrameData={currentFrameData[FrameType.Story]!}
            proceedToNextFrame={proceedToNextFrame}
          />
        ) : (
          <QuestionFrame
            questionFrameData={currentFrameData[FrameType.Question]!}
            proceedToNextFrame={proceedToNextFrame}
          />
        ))}

      {gameState === GameState.FEEDBACK && (
        <Feedback correct={answeredCorrectly} />
      )}
    </Layout>
  ) : (
    <div>loading</div>
  );
};

export default StoryGame;
