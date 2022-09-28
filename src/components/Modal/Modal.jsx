import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalOverlay, Img } from './ModalStyle';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  state = {
    modalImage: {},
  };

  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
    this.serchImage();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  componentDidUpdate(_, prevProps) {
    const { idImage } = this.props;
    if (prevProps.idImage !== idImage) {
    }
  }

  serchImage = () => {
    const { data, idImage } = this.props;

    const search = data.find(({ id }) => {
      return id === Number(idImage);
    });
    return this.setState({
      modalImage: search,
    });
  };

  closeModal = ({ currentTarget, target, code }) => {
    if (currentTarget === target || code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.state.modalImage;

    return createPortal(
      <Overlay onClick={this.closeModal}>
        <ModalOverlay>
          <Img src={largeImageURL} alt={tags} />
        </ModalOverlay>
      </Overlay>,
      modalRoot
    );
  }
}
