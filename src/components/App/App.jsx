import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import { fetching } from 'components/services/api';
import { mapPictures } from 'components/services/mapPictures';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader';

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
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (prevSearch !== currentSearch || prevPage !== currentPage) {
      this.updateImages();
    }
  }

  updateImages() {
    const { inputValue, page } = this.state;
    this.setState({ isLoading: true });
    setTimeout(() => {
      try {
        fetching(inputValue, page).then(res => {
          if (!res.data.hits.length) {
            return toast.error(
              'There is no images with this request, please, try again'
            );
          }
          const pictures = mapPictures(res.data.hits);
          this.setState({
            images: [...this.state.images, ...pictures],
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
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
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
        {error &&
          toast.warning(`Ooops, something went wrong: ${error.message}`)}
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

        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    );
  }
}

export default App;
