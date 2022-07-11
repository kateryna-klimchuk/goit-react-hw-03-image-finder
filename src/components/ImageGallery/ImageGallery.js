import ImageGalleryItem from '../ImageGalleryItem/index';
import { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const API_KEY = '27448491-3edcbaaac83ebd1071ff4125b';
const BASE_URL = `https://pixabay.com/api/`;

const Gallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
class ImageGallery extends Component {
  state = {
    page: '1',
    searchValue: this.props.value,
    loading: false,
    picture: [],
    // webformatURL: '',
    // largeImageURL: '',
    // id: '',
  };

  async fetch() {
    const response = await axios.get(
      `${BASE_URL}?q=${this.state.searchValue}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    this.setState({ picture: response.data.hits });
    // return;
  }

  componentDidMount() {
    this.fetch();
  }
  render() {
    console.log(this.state.picture);
    return (
      <div>
        {this.state.loading && <div>...Loading</div>}
        <h2>Hey, here your pics {this.props.value}</h2>
        <Gallery>
          {this.state.picture.map(({ webformatURL, id, largeImageURL }) => (
            <ImageGalleryItem key={id} item={webformatURL} id={id} />
          ))}
        </Gallery>
      </div>
    );
  }
}

export default ImageGallery;
