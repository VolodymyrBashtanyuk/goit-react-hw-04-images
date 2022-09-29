import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalOverlay, Img } from './ModalStyle';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ idImage, data, onClose }) => {
  const [modalImage, setModalImage] = useState({});
  const { largeImageURL, tags } = modalImage;

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    serchImage();
  });

  const serchImage = () => {
    const search = data.find(({ id }) => {
      return id === Number(idImage);
    });
    setModalImage(search);
  };

  const closeModal = ({ currentTarget, target, code }) => {
    if (currentTarget === target || code === 'Escape') {
      onClose();
      document.removeEventListener('keydown', closeModal);
    }
  };

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalOverlay>
        <Img src={largeImageURL} alt={tags} />
      </ModalOverlay>
    </Overlay>,
    modalRoot
  );
};
