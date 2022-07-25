import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Message from './Message/Message';
import Button from './Button/Button';
import getImage from 'service/PixabayAPI';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const hitsPerPage = 20;

  useEffect(() => {
    if (query) {
      loadImages();
    }

    function loadImages() {
      setIsLoading(true);

      getImage(query, currentPage)
        .then(response => {
          setImages(images => [...images, ...response.data.hits]);
          setTotalHits(response.data.totalHits);
        })
        .catch(e => {
          console.log('error:', e.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [query, currentPage]);

  function getFormInputQuery(query) {
    setQuery(query);
    setCurrentPage(1);
    setTotalHits(null);
    setImages([]);
  }

  function getImagesInfo(totalHits) {
    setTotalHits(totalHits);
  }

  function getLargeImgUrl(url) {
    setLargeImageUrl(url);
    setIsLoading(true);
  }

  function handleLoadMore() {
    setCurrentPage(currentPage + 1);
  }

  function showLoadMoreButton() {
    return totalHits / hitsPerPage < currentPage ? false : true;
  }

  function closeModal() {
    setLargeImageUrl(null);
    setIsLoading(false);
  }

  function handleOnLoad() {
    setIsLoading(false);
  }

  function handleOnError() {
    setIsLoading(false);
    console.log('something went wrong, no image');
  }

  return (
    <div className={css.App}>
      <Searchbar onSubmit={getFormInputQuery} />
      {totalHits === 0 && <Message text={`Sorry, no picture of ${query}`} />}

      <ImageGallery
        getInfo={getImagesInfo}
        getImgUrl={getLargeImgUrl}
        images={images}
      />

      {isLoading && <Loader />}

      {showLoadMoreButton() && <Button onClick={handleLoadMore} />}
      {largeImageUrl && (
        <Modal closeModal={closeModal}>
          {isLoading && <Loader />}
          <img
            src={largeImageUrl}
            alt=""
            onLoad={handleOnLoad}
            onError={handleOnError}
          />
        </Modal>
      )}
    </div>
  );
};
