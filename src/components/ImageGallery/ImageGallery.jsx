import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, getImgUrl }) => {
  return (
    <div>
      <ul className={css.gallery}>
        {images &&
          images.map(image => (
            <ImageGalleryItem
              getImgUrl={getImgUrl}
              key={image.id}
              previewUrl={image.webformatURL}
              largeUrl={image.largeImageURL}
            />
          ))}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  getImgUrl: PropTypes.func.isRequired,
};

export default ImageGallery;
