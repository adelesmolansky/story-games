import {
  MathSignVisualsType,
  ObjectVisualsType,
  SingleVisualsDataType,
  TextVisualsType,
  VisualsType,
} from '../../util/types';
import './QuestionVisuals.css';

export const IMG_FOLDER = '/imgs/questionImgs';

type props = { visualsType: VisualsType; visualsData: SingleVisualsDataType };

const QuestionVisuals = ({ visualsType, visualsData }: props) => {
  let visuals;
  switch (visualsType) {
    case VisualsType.OBJECTS:
      const objectVisualsData = visualsData as ObjectVisualsType;
      const images = Array.isArray(objectVisualsData.imgs)
        ? objectVisualsData.imgs
        : new Array(objectVisualsData.num).fill(objectVisualsData.imgs);
      const names = Array.isArray(objectVisualsData.names)
        ? objectVisualsData.names
        : new Array(objectVisualsData.num).fill(objectVisualsData.names);

      visuals = images.map((img, index) => (
        <img
          key={index}
          src={`${IMG_FOLDER}${img}`}
          alt={names[index]}
          className="object-img"
        />
      ));
      return <div className="objects">{visuals}</div>;

    case VisualsType.TEXT:
      const textVisualsData = visualsData as TextVisualsType;
      return <p>{textVisualsData.text}</p>;

    case VisualsType.MATH_SIGN:
      // TODO: Figure out the font size for the math signs
      const mathSignVisualsData = visualsData as MathSignVisualsType;
      switch (mathSignVisualsData.name) {
        case 'addition':
          return <p>+</p>;
        case 'subtraction':
          return <p>-</p>;
        default:
          return <p>SIGN</p>;
      }

    default:
      return <div>visuals</div>;
  }
};

export default QuestionVisuals;
