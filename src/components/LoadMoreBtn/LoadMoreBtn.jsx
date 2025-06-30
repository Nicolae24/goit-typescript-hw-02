import s from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ onClick }) => {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
