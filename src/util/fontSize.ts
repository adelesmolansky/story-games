// Define base font sizes in rem based on what text is used for

import { Scale } from '../contexts/SettingsContext';

export enum TextPurpose {
  STORY_MAIN = 'STORY_MAIN',
  STORY_SUBTEXT = 'STORY_SUBTEXT',
  QUESTION_INSTRUCTIONS = 'QUESTION_INSTRUCTIONS',
  CONTINUE_BUTTON = 'CONTINUE_BUTTON',
  ANSWER_CHOICES = 'ANSWER_CHOICES',
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
