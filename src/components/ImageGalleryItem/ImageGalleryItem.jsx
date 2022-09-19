import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ image, toggleModal }) {
    return image.map(({ id, largeImageURL, tags, webformatURL }) => {
      return (
        <li
          key={id}
          className={css.ImageGalleryItem}
          onClick={() =>
            toggleModal({
              src: largeImageURL,
              title: tags,
            })
          }
        >
          <img src={webformatURL} alt={tags} />
        </li>
      );
    });
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
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
