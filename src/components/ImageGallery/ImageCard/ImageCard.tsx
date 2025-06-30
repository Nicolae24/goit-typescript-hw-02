import s from "./ImageCard.module.css";
import { ModalImage } from "../../../types";

interface ImageCardProps {
  src: string;
  srcLarge: string;
  alt: string;
  openModal: (data: ModalImage) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  srcLarge,
  alt,
  openModal,
}) => {
  return (
    <div className={s.ImageCard}>
      <img
        src={src}
        alt={alt || "Image"}
        onClick={() => openModal({ src: srcLarge, alt })}
      />
    </div>
  );
};

export default ImageCard;
