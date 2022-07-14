import { Component } from 'react';
import styled from 'styled-components';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import { fetching } from 'components/services/api';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

class App extends Component {
  state = {
    inputValue: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: null,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const prevSearch = prevState.inputValue;
    const currentSearch = this.state.inputValue;
    const prevGalleryPage = prevState.page;
    const currentGalleryPage = this.state.page;

    if (
      prevSearch !== currentSearch ||
      prevGalleryPage !== currentGalleryPage
    ) {
      this.updateImages();
    }
  }

  updateImages() {
    const { inputValue, page } = this.state;
    this.setState({ isLoading: true });
    setTimeout(() => {
      try {
        fetching(inputValue, page).then(data => {
          if (!data.data.hits.length) {
            return alert('There is no images found with that search request');
          }
          const mappedImages = data.data.hits.map(
            ({ id, webformatURL, tags, largeImageURL }) => ({
              id,
              webformatURL,
              tags,
              largeImageURL,
            })
          );
          this.setState({
            images: [...this.state.images, ...mappedImages],
          });
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }, 1000);
  }

  handleSearchSubmit = inputValue => {
    this.setState({
      inputValue,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    console.log('loooooad');
    this.setState({ isLoading: true });
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    // this.setState({ isLoading: false });
  };

  showModalImage = id => {
    const image = this.state.images.find(image => image.id === id);
    this.setState({
      showModal: {
        largeImageURL: image.largeImageURL,
        tags: image.tags,
      },
    });
  };

  closeModalImage = () => {
    this.setState({ showModal: null });
  };

  render() {
    const { images, isLoading, error, showModal } = this.state;
    const { handleSearchSubmit, showModalImage, loadMore, closeModalImage } =
      this;
    return (
      <Container>
        <Searchbar onSearch={handleSearchSubmit} />
        {error && alert(`Whoops, something went wrong: ${error.message}`)}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} handlePreview={showModalImage} />
            <Button loadMore={loadMore} />
          </>
        )}
        {showModal && (
          <Modal
            lgImage={showModal.largeImageURL}
            tags={showModal.tags}
            closeModal={closeModalImage}
          />
        )}
      </Container>
    );
  }
}

export default App;
