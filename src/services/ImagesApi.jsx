import PropTypes from 'prop-types';

const URL = 'https://pixabay.com/api/';
const KEY = '29112900-b21ef4ae161236dc81924b64f';
const PER_PAGE = 12;

export const ImagesApi = async (name, page) => {
  const response = await fetch(
    `${URL}?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
  const data = await response.json();
  return data;
};

ImagesApi.propTypes = {
  name: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
