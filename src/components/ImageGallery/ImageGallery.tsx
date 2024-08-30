import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

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
  images: ImageData[];
  handleImageClick: (image: ImageData) => void;
};

const ImageGallery: React.FC<Props> = ({ images, handleImageClick }) => {
  return (
    <ul className={s.imagesContainer}>
      {images.map((image) => (
        <li key={image.id} className={s.imagesItem}>
          <ImageCard
            image={image}
            handleOpenModal={() => handleImageClick(image)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
