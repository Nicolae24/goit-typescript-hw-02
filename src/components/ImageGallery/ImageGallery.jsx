import ImageCard from "./ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({
  photos,

  openModal,
}) => {
  return (
    <ul className={s.gallery}>
      {photos.map(
        ({ photo, id, alt_description, urls: { small, regular } }) => (
          <li key={id} className={s.galleryItem}>
            <ImageCard
              // url={photo.urls.small}
              // alt={photo.alt_description}
              src={small}
              alt={alt_description}
              srcLarge={regular}
              photo={photo}
              openModal={openModal}
            />
          </li>
        )
      )}
    </ul>
  );
};

export default ImageGallery;
