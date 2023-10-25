// Define base font sizes in rem based on what text is used for

import { TextVisualsType } from '../components/Games/util/types';
import { Scale } from '../contexts/SettingsContext';

export enum TextPurpose {
  STORY_MAIN,
  STORY_SUBTEXT,
  QUESTION_INSTRUCTIONS,
  CONTINUE_BUTTON,
  ANSWER_CHOICES,
}
const BASE_FONT_SIZE: { [key in TextPurpose]: number } = {
  [TextPurpose.STORY_MAIN]: 5,
  [TextPurpose.STORY_SUBTEXT]: 3,
  [TextPurpose.QUESTION_INSTRUCTIONS]: 4,
  [TextPurpose.CONTINUE_BUTTON]: 2,
  [TextPurpose.ANSWER_CHOICES]: 3,
};

export const getFontSize = (scale: Scale, textPurpose: TextPurpose) => {
  const fontSizeBaseNumber = BASE_FONT_SIZE[textPurpose];
  return `${
    scale === Scale.SMALL
      ? fontSizeBaseNumber * 0.7
      : scale === Scale.MEDIUM
      ? fontSizeBaseNumber
      : fontSizeBaseNumber * 1.3
  }rem`;
};

/**
 * Calculates the maximum length of the text strings in the given array of
 * the visuals [TextVisualsType]
 */
export const getMaxTextVisualsLength = (textStrs: TextVisualsType[]) => {
  const maxTextLength = textStrs.reduce((acc, curr) => {
    const text: string = curr.text?.toString();
    return text.length > acc ? text.length : acc;
  }, 0);
  return maxTextLength;
};

export const getTextVisualsFontSize = (text: string, maxSize: number) => {};
