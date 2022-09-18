import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ image, toggleModal }) {
  if (image) {
    return image.hits.map(item => {
      return (
        <li
          key={item.id}
          className={css.ImageGalleryItem}
          onClick={() =>
            toggleModal({
              src: item.largeImageURL,
              title: item.tags,
            })
          }
        >
          <img src={item.webformatURL} alt={item.tags} />
        </li>
      );
    });
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  image: PropTypes.objectOf(
    PropTypes.shape({
      total: PropTypes.number,
      hits: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          tags: PropTypes.string.isRequired,
          webformatURL: PropTypes.string.isRequired,
          largeImageURL: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};
