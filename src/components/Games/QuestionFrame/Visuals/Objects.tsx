import { ObjectVisualsType } from '../../util/types';
import './Objects.css';

export const IMG_FOLDER = '/imgs/questionImgs';

type ObjectsProps = {
  objectVisualsData: ObjectVisualsType;
  forAnswerChoices?: boolean;
  isCompound?: boolean;
};

/**
 * Component for the objects visuals for a game question frame.
 * Objects can be used for the question visuals or the answer choices.
 */
const Objects = ({
  objectVisualsData,
  forAnswerChoices = false,
  isCompound = false,
}: ObjectsProps) => {
  const images = Array.isArray(objectVisualsData.imgs)
    ? objectVisualsData.imgs
    : new Array(objectVisualsData.num).fill(objectVisualsData.imgs);
  const names = Array.isArray(objectVisualsData.names)
    ? objectVisualsData.names
    : new Array(objectVisualsData.num).fill(objectVisualsData.names);

  return (
    <div
      className="objects-container"
      style={{ width: isCompound ? '37%' : 'auto' }}
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={`${IMG_FOLDER}${img}`}
          alt={names[index]}
          className={`object-img ${forAnswerChoices ? '' : 'object-hover'}`}
        />
      ))}
    </div>
  );
};

export default Objects;
