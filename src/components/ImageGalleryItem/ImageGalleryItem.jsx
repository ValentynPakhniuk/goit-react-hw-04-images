import { useState } from 'react';
import { Item } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const CardItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Item onClick={() => toggleModal()}>
      <img src={image.webformatURL} alt={image.tags} width="350" />
      {showModal && <Modal image={image} onClose={toggleModal} />}
    </Item>
  );
};

CardItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
