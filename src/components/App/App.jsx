import Searchbar from 'components/Searchbar';
import { Component } from 'react';

import styled from 'styled-components';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { fetching } from 'components/services/api';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export class App extends Component {
  state = {
    page: 1,
    images: [],
    largeImg: null,
    isLoading: false,
    query: '',
  };

  imagesMapper = imageList => {
    return imageList.map(({ id, webformatURL, largeImageURL, tags }) => {
      return { id, webformatURL, largeImageURL, alt: tags };
    });
  };

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const { query, page } = this.state;

    if (prevQuery !== nextQuery) {
      try {
        this.setState({ isLoading: true, page: 1, images: [] });
        const images = await fetching(query);
        this.setState({
          images: this.imagesMapper(images.data.hits),
        });
      } catch {
        return alert("We're sorry, nothing is found");
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      try {
        this.setState({ isLoading: true });
        const newImages = await fetching(query, page);
        this.setState(prevState => ({
          images: [
            ...prevState.images,
            ...this.imagesMapper(newImages.data.hits),
          ],
        }));
      } catch {
        return alert("We're sorry, nothing is found");
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = query => {
    this.setState({ query });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handleModal = largeImg => {
    this.setState({ largeImg });
  };

  closeModal = () => {
    this.setState({ largeImg: null });
  };

  render() {
    const { images, isLoading, largeImg, query } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearch} />

        {/* {isLoading && <Loader />} */}
        {images.length > 0 && (
          <>
            <ImageGallery
              images={this.state.images}
              onClick={this.handleModal}
            />
            <Button onClick={this.handleLoadMore} />
          </>
        )}

        {largeImg && (
          <Modal largeImg={largeImg} alt={query} closeModal={this.closeModal} />
        )}
      </Container>
    );
  }
}

export default App;
