import css from './Searchbar.module.css';
import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../icons/search-icon.svg';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (query.trim() === '') {
      alert('empty field, enter the query');
      return;
    }

    onSubmit(query);
  }

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <input
          onChange={handleChange}
          value={query}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.button}>
          <SearchIcon width="18" height="18" />
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
