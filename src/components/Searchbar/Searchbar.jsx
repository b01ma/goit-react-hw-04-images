import css from './Searchbar.module.css';
import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../icons/search-icon.svg';
import PropTypes from 'prop-types';
// const { Component } = require('react/cjs/react.production.min');

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
          <SearchIcon width="18" hieght="18" />
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// class Searchbar extends Component {
//   state = {
//     query: '',
//   };

//   handleChange = e => {
//     this.setState({ query: e.target.value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     if (this.state.query.trim() === '') {
//       alert('empty field, enter the query');
//       return;
//     }

//     this.props.onSubmit(this.state.query);
//   };

//   render() {
//     Searchbar.propTypes = {
//       onSubmit: PropTypes.func.isRequired,
//     };

//     return (
//       <header className={css.searchbar}>
//         <form onSubmit={this.handleSubmit} className={css.SearchForm}>
//           <input
//             onChange={this.handleChange}
//             value={this.state.query}
//             className={css.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             placeholder="Search images and photos"
//           />
//           <button type="submit" className={css.button}>
//             <SearchIcon width="18" hieght="18" />
//           </button>
//         </form>
//       </header>
//     );
//   }
// }

export default Searchbar;
