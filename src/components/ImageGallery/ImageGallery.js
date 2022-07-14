import ImageGalleryItem from '../ImageGalleryItem/index';
import PropTypes from 'prop-types';

import styled from 'styled-components';

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

const ImageGallery = ({ images, handlePreview }) => {
  const renderGallery = () =>
    images.map(({ id, webformatURL, tags }) => (
      <ImageGalleryItem
        key={id}
        tags={tags}
        smImage={webformatURL}
        onClick={() => handlePreview(id)}
      />
    ));

  return (
    <div>
      <Gallery>{images ? renderGallery() : null}</Gallery>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  handlePreview: PropTypes.func.isRequired,
};

export default ImageGallery;
