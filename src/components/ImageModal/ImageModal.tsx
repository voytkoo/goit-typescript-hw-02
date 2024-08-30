import React from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";

interface Image {
  urls: {
    regular: string;
  };
  alt_description: string;
  description?: string;
  user: {
    name: string;
  };
  likes: number;
}

interface ImageModalProps {
  image: Image | null;
  isOpen: boolean;
  onRequestClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  image,
  isOpen,
  onRequestClose,
}) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={s.modal}
      overlayClassName={s.overlay}
      contentLabel="Image Modal"
    >
      <button className={s.closeButton} onClick={onRequestClose}>
        ×
      </button>
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className={s.image}
      />
      <div className={s.info}>
        <h2>{image.description || image.alt_description}</h2>
        <p>Author: {image.user.name}</p>
        <p>Likes: {image.likes}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;
