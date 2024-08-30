import React from "react";
import s from "./ImageCard.module.css";

type ImageData = {
  id: number;
  urls: {
    small: string;
    regular: string;
  };
  description: string;
  alt_description: string;
  user: {
    name: string;
  };
  likes: number;
};

type Props = {
  image: ImageData;
  handleOpenModal: () => void;
};

const ImageCard: React.FC<Props> = ({ image, handleOpenModal }) => {
  return (
    <div className={s.imageCard} onClick={handleOpenModal}>
      <img
        src={image.urls.small}
        alt={image.alt_description || image.description}
        className={s.image}
      />
    </div>
  );
};

export default ImageCard;
