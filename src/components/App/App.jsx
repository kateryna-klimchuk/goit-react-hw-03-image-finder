import Searchbar from 'components/Searchbar';
import { Component } from 'react';
// import axios from 'axios';

import styled from 'styled-components';
import ImageGallery from 'components/ImageGallery';
// const API_KEY = '27448491-3edcbaaac83ebd1071ff4125b';
// const BASE_URL = `https://pixabay.com/api/`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

class App extends Component {
  state = {
    inputValue: '',
    articles: [],
  };
  // handleFetch = () => {
  //   return fetch(
  //     `${BASE_URL}?q=${this.state.searchValue}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  //   )
  //     .then(res => res.json)
  //     .then(data => console.log(data));
  // };

  handleSetInputValue = value => {
    this.setState({ inputValue: value });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleSetInputValue} />
        {this.state.inputValue && (
          <ImageGallery value={this.state.inputValue} />
        )}
      </Container>
    );
  }
}

export default App;
