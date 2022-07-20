import { Component } from 'react/cjs/react.production.min';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Message from './Message/Message';
import Button from './Button/Button';

import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    totalHits: null,
    hitsPerPage: 10,
    largeImageUrl: null,
    loader: true,
  };

  getFormInputQuery = query => {
    this.setState({ query, page: 1 });
  };

  getImagesInfo = totalHits => {
    this.setState({
      totalHits,
    });
  };

  getLargeImgUrl = url => {
    this.setState({ largeImageUrl: url });
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  showLoadMoreButton = () => {
    const { totalHits, hitsPerPage, page } = this.state;
    if (totalHits / hitsPerPage <= page) {
      return false;
    } else {
      return true;
    }
  };

  closeModal = () => {
    this.setState({ largeImageUrl: null, loader: true });
  };

  handleOnLoad = () => {
    this.setState({ loader: false });
  };

  handleOnError = () => {
    this.setState({ loader: false });
    console.log('something went wrong, no image');
  };

  render() {
    const { query, largeImageUrl, page, hitsPerPage } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.getFormInputQuery} />

        {this.state.totalHits === 0 && (
          <Message text={`Sorry, no picture of ${this.state.query}`} />
        )}

        <ImageGallery
          query={query}
          currentPage={page}
          getInfo={this.getImagesInfo}
          hitsPerPage={hitsPerPage}
          getImgUrl={this.getLargeImgUrl}
        />
        {this.showLoadMoreButton() && <Button onClick={this.handleClick} />}
        {largeImageUrl && (
          <Modal closeModal={this.closeModal}>
            {this.state.loader && <Loader />}
            <img
              src={this.state.largeImageUrl}
              alt=""
              onLoad={this.handleOnLoad}
              onError={this.handleOnError}
            />
          </Modal>
        )}
      </div>
    );
  }
}
