import PropTypes from 'prop-types';

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

const ImageGalleryItem = ({ smImage, tags, onClick }) => {
  return (
    <li>
      <ListItem src={smImage} alt={tags} onClick={onClick} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
