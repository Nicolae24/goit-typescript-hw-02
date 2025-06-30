import s from "./ImageCard.module.css";
const ImageCard = ({ src, srcLarge, alt, openModal }) => {
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
