import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ previewUrl, largeUrl, getImgUrl }) => {
  const handleClick = () => {
    getImgUrl(largeUrl);
  };

  return (
    <li className={css.item}>
      <img
        onClick={handleClick}
        className={css.itemImage}
        src={previewUrl}
        alt=""
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
  getImgUrl: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
