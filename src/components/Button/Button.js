import PropTypes from 'prop-types';

import styled from 'styled-components';

const LoadBtn = styled.button`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border: none;
  outline: none;
  padding: 8px 16px;
  border-radius: 2px;
  background-color: #004d7a;
  opacity: 0.6;

  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: #fff;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 180px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &:hover {
    opacity: 1;
  }
`;

const Button = ({ loadMore }) => {
  return (
    <LoadBtn type="button" onClick={loadMore}>
      Load more
    </LoadBtn>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
