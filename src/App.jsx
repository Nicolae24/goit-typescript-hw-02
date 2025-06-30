import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

import { getPhotos } from "./service/photosApi";
import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader";

import CosmicBack from "./components/CosmicBack/CosmicBack";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Heading from "./components/Heading/Heading";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPhoto, setModalPhoto] = useState({});

  useEffect(() => {
    if (!query) return;
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages } = await getPhotos(query, page);
        if (total_pages === 0) {
          setIsEmpty(true);
          return;
        } else {
          setPhotos((prev) => [...prev, ...results]);
        }
        setHasMore(page < total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [query, page]);

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setError("");
    setPhotos([]);
    setIsEmpty(false);
    setHasMore(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (photo) => {
    setModalPhoto(photo);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <CosmicBack />
      <SearchBar onSubmit={handleSearchSubmit} />
      {photos.length > 0 && (
        <ImageGallery photos={photos} openModal={handleOpenModal} />
      )}
      {hasMore && <LoadMoreBtn onClick={handleLoadMore} />}
      {error && <ErrorMessage error={error} />}
      {isEmpty && <Heading />}
      {isLoading && <Loader />}

      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={handleCloseModal}
        src={modalPhoto.src}
        alt={modalPhoto.alt}
      />
    </>
  );
}

export default App;
