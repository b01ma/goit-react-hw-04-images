import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { Component } from 'react/cjs/react.production.min';
import getImage from 'service/PixabayAPI';
import Loader from 'components/Loader/Loader';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  state = {
    images: [],
    loader: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({ loader: true });

      getImage(this.props.query, this.props.currentPage, this.props.hitsPerPage)
        .then(r => r.json())
        .then(r => {
          this.setState({ images: r.hits });
          this.props.getInfo(r.totalHits);
        })
        .catch(e => {
          console.log('error:', e.message);
        })
        .finally(() => {
          this.setState({ loader: false });
        });
    } else if (prevProps.currentPage !== this.props.currentPage) {
      this.setState({ loader: true });

      getImage(this.props.query, this.props.currentPage, this.props.hitsPerPage)
        .then(r => r.json())
        .then(r => {
          this.setState({ images: [...this.state.images, ...r.hits] });
          this.props.getInfo(r.totalHits);
        })
        .catch(e => {
          console.log('error:', e.message);
        })
        .finally(() => {
          this.setState({ loader: false });
        });
    }
  }

  render() {
    const { images } = this.state;

    ImageGallery.propTypes = {
      currentPage: PropTypes.number.isRequired,
      getImgUrl: PropTypes.func.isRequired,
      getInfo: PropTypes.func.isRequired,
      hitsPerPage: PropTypes.number.isRequired,
      query: PropTypes.string,
    };
    return (
      <div>
        <ul className={css.gallery}>
          {images &&
            images.map(image => (
              <ImageGalleryItem
                getImgUrl={this.props.getImgUrl}
                key={image.id}
                previewUrl={image.webformatURL}
                largeUrl={image.largeImageURL}
              />
            ))}
        </ul>

        {this.state.loader && <Loader />}
      </div>
    );
  }
}

export default ImageGallery;
