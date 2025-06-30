import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

import { getPhotos } from "./service/photosApi";
import { useEffect, useState, JSX } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader";

import CosmicBack from "./components/CosmicBack/CosmicBack";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Heading from "./components/Heading/Heading";
import { ImageItem, ModalImage } from "./types";

const App = (): JSX.Element => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [photos, setPhotos] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalPhoto, setModalPhoto] = useState<ModalImage | null>(null);

  useEffect(() => {
    if (!query) return;
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages } = await getPhotos(query, page);
        if (total_pages === 0) {
          setIsEmpty(true);
          return;
        }
        setPhotos((prev) => [...prev, ...results]);
        setHasMore(page < total_pages);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [query, page]);

  const handleSearchSubmit = (searchQuery: string): void => {
    setQuery(searchQuery);
    setPage(1);
    setError("");
    setPhotos([]);
    setIsEmpty(false);
    setHasMore(false);
  };

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (photo: ModalImage) => {
    setModalPhoto(photo);
    setModalIsOpen(true);
  };

  const handleCloseModal = (): void => {
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
        src={modalPhoto?.src || ""}
        alt={modalPhoto?.alt || ""}
      />
    </>
  );
};

export default App;
