import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

function ImageGallery({ image, toggleModal }) {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem image={image} toggleModal={toggleModal} />
    </ul>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  image: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
