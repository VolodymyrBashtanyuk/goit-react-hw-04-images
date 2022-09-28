import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { NoteTitle, Container } from 'components/AppStyled';

import { ImagesApi } from 'services/ImagesApi';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader, LoaderMoreButton } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    imageName: '',
    imageData: [],
    load: false,
    loadButton: false,
    page: 1,
    notification: false,
    modalOpen: false,
    id: 0,
  };

  componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;
    const { fetchApi } = this;

    if (page !== prevState.page) {
      this.setState({
        loadButton: true,
        notification: false,
      });
      fetchApi(imageName, page);
    }
  }

  imageFormSubmit = imageSearchName => {
    const { page } = this.state;
    const { fetchApi } = this;
    const { resetSearch } = this;

    this.setState({
      imageName: imageSearchName,
    });
    resetSearch();
    fetchApi(imageSearchName, page);
  };

  fetchApi = async (name, page) => {
    this.setState({
      load: true,
    });
    try {
      const api = await ImagesApi(name, page);
      this.notification(api);

      this.setState(prevState => {
        return {
          imageData: [...prevState.imageData, ...api.hits],
        };
      });
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({
        load: false,
        loadButton: false,
      });
    }
  };

  loadMoreButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  resetSearch = () => {
    this.setState({
      imageData: [],
      page: 1,
      notification: false,
    });
  };

  notification = data => {
    console.log(data.totalHits);
    // const { imageData } = this.state;
    if (data.totalHits === 0) {
      this.setState({
        notification: true,
      });
      return;
    }
  };

  openModal = ({ currentTarget, target }) => {
    if (currentTarget === target) {
      this.setState({ modalOpen: true, id: currentTarget.id });
    }
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const {
      imageName,
      modalOpen,
      imageData,
      id,
      loadButton,
      load,
      notification,
    } = this.state;

    const { imageFormSubmit, closeModal, openModal, loadMoreButton } = this;

    return (
      <>
        <Searchbar onSubmit={imageFormSubmit} />
        {modalOpen && (
          <Modal data={imageData} onClose={closeModal} idImage={id} />
        )}
        {load && <Loader onLoad={load} />}

        {imageData.length !== 0 && (
          <>
            <ImageGallery items={imageData} onOpen={openModal} />
            {loadButton ? (
              <LoaderMoreButton load={loadButton} />
            ) : (
              <Button onClick={loadMoreButton} />
            )}
          </>
        )}
        {notification && (
          <NoteTitle>
            Sorry :( no image with name <Container>{imageName}</Container>
          </NoteTitle>
        )}
      </>
    );
  }
}

// import { ImagesApi } from 'services/ImagesApi';
// import { ImageGallery } from 'components/ImageGallery/ImageGallery';
// import { Button } from 'components/Button/Button';
// import { Loader, LoaderMoreButton } from 'components/Loader/Loader';
// import { Modal } from 'components/Modal/Modal';
// import { NoteTitle, Container } from './FetchImageStyle';

// export class FetchImage extends Component {
//   state = {

//   componentDidMount() {
//     const { page } = this.state;
//     const { name } = this.props;
//     const { fetchApi } = this;

//     this.setState({
//       load: true,
//     });

//     fetchApi(name, page);
//   }

//   render() {
//
//     const { name } = this.props;

//     return (
//       <>
//         {modalOpen && (
//           <Modal data={imageData} onClose={closeModal} idImage={id} />
//         )}

//         {imageData.length !== 0 ? (
//           <>
//             <ImageGallery items={imageData} onOpen={openModal} />
//             {loadButton ? (
//               <LoaderMoreButton load={loadButton} />
//             ) : (
//               <Button onClick={loadMoreButton} />
//             )}
//           </>
//         ) : (
//           <Loader onLoad={load} />
//         )}

//         {notification && (
//           <NoteTitle>
//             Sorry :( no image with name <Container>{name}</Container>
//           </NoteTitle>
//         )}
//       </>
//     );
//   }
// }
