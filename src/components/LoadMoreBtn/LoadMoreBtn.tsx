import s from "./LoadMoreBtn.module.css";
import { JSX } from "react";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps): JSX.Element => {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
