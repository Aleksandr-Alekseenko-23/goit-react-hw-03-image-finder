import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';

import Modal from './Modal/Modal';
import { API } from '../API/API.js';

export class App extends Component {
  state = {
    imageTitle: '',
    image: [],
    loading: false,
    page: 1,
    per_page: 12,
    showModal: false,
    dataModal: null,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { page, imageTitle, per_page } = this.state;
    if (prevState.page !== page || prevState.imageTitle !== imageTitle) {
      try {
        this.setState({ loading: true });
        const response = await API(imageTitle, page, per_page);
        this.setState(prevState => ({
          image: [...prevState.image, ...response.hits],
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSearchbarSubmit = imageTitle => {
    this.setState({
      page: 1,
      per_page: 12,
      imageTitle,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = data => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      dataModal: data,
    }));
  };

  render() {
    const { loading, image, showModal, dataModal, error } = this.state;
    return (
      <>
        <ToastContainer autoClose={3000} />
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          {error && <p>Whoops, something went wrong: {error.message}</p>}
          <ImageGallery image={image} toggleModal={this.toggleModal} />
          {loading && <Loader />}
          {image.length ? <Button onSubmit={this.loadMore} /> : ''}
          {showModal && (
            <Modal dataModal={dataModal} toggleModal={this.toggleModal} />
          )}
        </div>
      </>
    );
  }
}

export default App;
