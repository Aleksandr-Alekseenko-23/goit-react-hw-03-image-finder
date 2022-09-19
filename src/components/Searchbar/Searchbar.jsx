import React, { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    imageTitle: '',
  };

  handleTitleChange = ({currentTarget:{value}}) => {
    this.setState({ imageTitle:value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.imageTitle.trim() === '') {
      toast.error('Введите название картинки!');
      return;
    }
    this.props.onSubmit(this.state.imageTitle);
    this.setState({ imageTitle: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            placeholder="Search images and photos"
            value={this.state.imageTitle}
            name="imageTitle"
            onChange={this.handleTitleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
