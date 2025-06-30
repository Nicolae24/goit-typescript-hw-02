import ImageCard from "./ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
import { ImageItem, ModalImage } from "../../types";

interface ImageGalleryProps {
  photos: ImageItem[];
  openModal: (data: ModalImage) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ photos, openModal }) => {
  return (
    <ul className={s.gallery}>
      {photos.map(({ id, alt_description, urls: { small, regular } }) => (
        <li key={id} className={s.galleryItem}>
          <ImageCard
            src={small}
            alt={alt_description}
            srcLarge={regular}
            // color={color}
            openModal={openModal}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
