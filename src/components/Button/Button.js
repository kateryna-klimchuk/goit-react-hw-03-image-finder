import styled from 'styled-components';

const LoadBtn = styled.button`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

const Button = () => {
  return <LoadBtn type="button">Load more</LoadBtn>;
};

export default Button;
