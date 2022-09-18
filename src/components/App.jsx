import React, { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';
import axios from 'axios';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    imageTitle: '',
    image: null,
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
        return await axios
          .get(
            `https:pixabay.com/api/?q=${imageTitle}&page=${page}&key=29205442-de93c714ea8b3e401a30c89a2&image_type=photo&orientation=horizontal&per_page=${per_page}`
          )
          .then(res => res.data)
          .then(image => this.setState({ image }))
          .finally(() => this.setState({ loading: false }));
      } catch (error) {
        this.setState({ error });
      }
    }
  }

  handleSearchbarSubmit = imageTitle => {
    this.setState({ imageTitle });
    this.setState({
      page: 1,
      per_page: 12,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      per_page: prevState.per_page + 12,
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
        {/* <ToastContainer autoClose={3000} /> */}
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          {error && <p>Whoops, something went wrong: {error.message}</p>}
          {loading && <Loader />}
          <ImageGallery image={image} toggleModal={this.toggleModal} />
          {image && <Button onSubmit={this.loadMore} />}
          {showModal && (
            <Modal dataModal={dataModal} toggleModal={this.toggleModal} />
          )}
        </div>
      </>
    );
  }
}

export default App;
