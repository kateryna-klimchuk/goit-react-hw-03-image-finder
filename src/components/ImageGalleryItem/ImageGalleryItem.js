import styled from 'styled-components';

const ListItem = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;

const ImageGalleryItem = ({ large, small, alt, onClick }) => {
  return (
    <li onClick={() => onClick(large)}>
      <ListItem src={small} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;
