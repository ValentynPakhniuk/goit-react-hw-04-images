import { useEffect } from 'react';
import { ModalCard, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown, false);
    return () => document.removeEventListener('keydown', handleKeyDown, false);
  }, [onClose]);

  return (
    <Overlay onClick={() => onClose}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <img src={image.largeImageURL} alt={image.tags} />
      </ModalCard>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
