import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItemsStyle';

export const ImageGalleryItem = ({ id, webformatURL, tags, onOpen }) => {
  return (
    <>
      <Item>
        <Img onClick={onOpen} id={id} src={webformatURL} alt={tags} />
      </Item>
    </>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
};
