import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";

Modal.setAppElement("#root");
interface Image {
  id: number;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  description: string;
  user: {
    name: string;
  };
  likes: number;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;
    fetchImages();
  }, [query, page]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query,
            page,
            per_page: 12,
            client_id: "kbXKDWC8B_1vBBkzZpHJVewioizWLDDherfwRupebFQ",
          },
        }
      );
      setImages((prevImages) => [...prevImages, ...response.data.results]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError("Something went wrong");
        toast.error("");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div className="App">
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} handleImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {showModal && (
        <ImageModal
          image={selectedImage}
          isOpen={showModal}
          onRequestClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
