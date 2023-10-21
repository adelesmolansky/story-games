import {
  ObjectVisualsType,
  SingleVisualsDataType,
  VisualsType,
} from '../../util/types';
import './QuestionVisuals.css';

const IMG_FOLDER = '/imgs/questionImgs';

type props = { visualsType: VisualsType; visualsData: SingleVisualsDataType };

const QuestionVisuals = ({ visualsType, visualsData }: props) => {
  let visuals;
  switch (visualsType) {
    case VisualsType.OBJECTS:
      const objectVisualsData = visualsData as ObjectVisualsType;
      const images = Array.isArray(objectVisualsData.imgs)
        ? objectVisualsData.imgs
        : new Array(objectVisualsData.num).fill(objectVisualsData.imgs);

      visuals = images.map((img, index) => (
        <img
          key={index}
          src={`${IMG_FOLDER}${img}`}
          alt={objectVisualsData.names[index] || ''}
          className={`visual ${objectVisualsData.arrangement || 'linear'} ${
            objectVisualsData.alignment || 'center'
          }`}
        />
      ));
      break;
    default:
      visuals = <div>visuals</div>;
  }

  return <div className="question-visuals">{visuals}</div>;
};

export default QuestionVisuals;
