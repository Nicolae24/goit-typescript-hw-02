export interface ImageItem {
  id: string;
  color: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

export interface ModalImage {
  src: string;
  alt: string;
}
