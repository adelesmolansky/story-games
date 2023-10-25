import { getMaxTextVisualsLength } from '../../../../util/fontSize';
import {
  MathSignVisualsType,
  ObjectVisualsType,
  SingleVisualsDataType,
  TextVisualsType,
  VisualsType,
} from '../../util/types';
import Objects from '../Visuals/Objects';
import './QuestionVisuals.css';

type props = {
  visualsType: VisualsType;
  visualsData: SingleVisualsDataType;
  allVisualsData: SingleVisualsDataType[];
  visualsTypes: VisualsType[];
};

/**
 * Component for one of the visuals for a game question frame.
 */
const QuestionVisuals = ({
  visualsType,
  visualsData,
  allVisualsData,
  visualsTypes,
}: props) => {
  const isCompound = allVisualsData.length > 1;
  switch (visualsType) {
    case VisualsType.OBJECTS:
      return (
        <Objects
          objectVisualsData={visualsData as ObjectVisualsType}
          isCompound={isCompound}
        />
      );

    case VisualsType.TEXT:
      let allTextData: TextVisualsType[] = [];
      visualsTypes.map((type: VisualsType, idx: number) => {
        if (type === VisualsType.TEXT)
          allTextData.push(allVisualsData[idx] as TextVisualsType);
      });
      const textVisualsData = visualsData as TextVisualsType;
      const maxTextLength = getMaxTextVisualsLength(allTextData);
      console.log('maxTextLength', maxTextLength);

      // Calculate font size based on text length and container width
      let fontSizeNum = 12; // this is the max font size
      if (maxTextLength < 4) fontSizeNum = fontSizeNum;
      else if (maxTextLength < 8) fontSizeNum = fontSizeNum * 0.75;
      else if (maxTextLength < 12) fontSizeNum = fontSizeNum * 0.5;
      else fontSizeNum = fontSizeNum * 0.25;

      const fontSize = `${fontSizeNum}rem`;

      return <p style={{ fontSize }}>{textVisualsData.text}</p>;

    case VisualsType.MATH_SIGN:
      const mathSignVisualsData = visualsData as MathSignVisualsType;
      switch (mathSignVisualsData.name) {
        case 'addition':
          return <p className="math-sign">+</p>;
        case 'subtraction':
          return <p className="math-sign">-</p>;
        default:
          return <p>NOT IMPLMENTED</p>;
      }

    default:
      return <div>NOT IMPLMENTED</div>;
  }
};

export default QuestionVisuals;
