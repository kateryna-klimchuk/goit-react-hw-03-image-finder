import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const SearchbarHeader = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-image: linear-gradient(
    to right top,
    #051937,
    #004d7a,
    #008793,
    #00bf72,
    #a8eb12
  );
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

const SearchButton = styled.button`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  background-color: #004d7a;
  color: white;

  &:hover {
    opacity: 1;
  }
`;

const FormInput = styled.input`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 18px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;
  padding: 10px;
  &::placeholder {
    font: inherit;
    // font-size: 18px;
  }
`;

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    const { inputValue } = this.state;
    event.preventDefault();
    if (inputValue.trim() === '') {
      return toast.warning('Search field is empty!');
    }
    this.props.onSearch(inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    const { handleSubmit, handleInputChange } = this;
    const { inputValue } = this.state;

    return (
      <SearchbarHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchButton type="submit">
            <FaSearch size={16} />
          </SearchButton>

          <FormInput
            type="text"
            name="searchRequest"
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
