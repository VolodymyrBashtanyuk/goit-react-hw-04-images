import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGalleryStyle';

export const ImageGallery = ({ items, onOpen }) => {
  const imageList = items.map(({ tags, id, webformatURL }) => {
    return (
      <ImageGalleryItem
        key={id}
        tags={tags}
        id={id}
        webformatURL={webformatURL}
        onOpen={onOpen}
      />
    );
  });
  return <List>{imageList}</List>;
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
