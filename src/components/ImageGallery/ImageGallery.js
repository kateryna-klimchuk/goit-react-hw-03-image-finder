import ImageGalleryItem from '../ImageGalleryItem/index';
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

// const ImageGallery = ({ pictures }) => {
//   return (
//     <Gallery>
//       {pictures.map(({ id, webformatURL, largeImageURL }) => (
//         <ImageGalleryItem
//           key={id}
//           smallImage={webformatURL}
//           largeImage={largeImageURL}
//         />
//       ))}
//     </Gallery>
//   );
// };

const ImageGallery = ({ images, onClick }) => {
  return (
    <>
      <Gallery>
        {images.map(({ id, webformatURL, largeImageURL, alt }) => (
          <ImageGalleryItem
            onClick={onClick}
            key={id}
            small={webformatURL}
            large={largeImageURL}
            alt={alt}
          />
        ))}
      </Gallery>
    </>
  );
};

export default ImageGallery;
