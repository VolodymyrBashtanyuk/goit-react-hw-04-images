import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { NoteTitle, Container } from 'components/AppStyled';

import { ImagesApi } from 'services/ImagesApi';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader, LoaderMoreButton } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [imageData, setImageData] = useState([]);
  const [page, setPage] = useState('1');
  const [id, setId] = useState('0');
  const [load, setLoad] = useState(false);
  const [loadButton, setLoadButton] = useState(false);
  const [notification, setNotification] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (imageName === '') {
      return;
    }
    fetchApi();
  }, [imageName, page]);

  const fetchApi = async () => {
    setLoad(true);
    setLoadButton(true);
    setNotification(false);
    try {
      const api = await ImagesApi(imageName, page);
      notifications(api);
      setImageData([...imageData, ...api.hits]);
    } catch (errors) {
      setError(errors);
      console.log(error);
    } finally {
      setLoad(false);
      setLoadButton(false);
    }
  };

  const imageFormSubmit = imageSearchName => {
    setImageName(imageSearchName);
    setImageData([]);
    setPage(1);
    setNotification(false);
  };

  const loadMoreButton = () => {
    setPage(prev => prev + 1);
  };

  const notifications = data => {
    if (data.totalHits === 0) {
      setNotification(true);
      return;
    }
  };

  const openModal = ({ currentTarget, target }) => {
    if (currentTarget === target) {
      setModalOpen(true);
      setId(currentTarget.id);
    }
  };

  return (
    <>
      <Searchbar onSubmit={imageFormSubmit} />
      {modalOpen && (
        <Modal
          data={imageData}
          onClose={() => setModalOpen(false)}
          idImage={id}
        />
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
};

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
