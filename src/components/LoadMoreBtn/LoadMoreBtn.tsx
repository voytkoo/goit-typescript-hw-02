import React from "react";
import s from "./LoadMore.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button type="button" className={s.button} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
