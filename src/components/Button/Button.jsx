import { FiMoreHorizontal } from 'react-icons/fi';
import { ButtonMore } from './ButtonStyled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <ButtonMore type="button" onClick={onClick}>
      Load more
      <FiMoreHorizontal className="dots" />
    </ButtonMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
