import { Circles, ThreeDots } from 'react-loader-spinner';

export const Loader = ({ onLoad }) => {
  return (
    <Circles
      height="50vh"
      width="50vw"
      color="#3f51b5"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass="loader"
      visible={onLoad}
    />
  );
};

export const LoaderMoreButton = ({ load }) => {
  return (
    <ThreeDots
      height="60"
      width="60"
      radius="9"
      color="#3f51b5"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass="loaderButton"
      visible={load}
    />
  );
};
