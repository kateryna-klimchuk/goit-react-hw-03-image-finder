import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';

const LoadSpinner = styled.div`
  display: flex;
  padding-top: 300px;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1200;
`;

const Loader = () => {
  return (
    <LoadSpinner>
      <TailSpin height="100" width="100" color="#a2c893" ariaLabel="loading" />
    </LoadSpinner>
  );
};

export default Loader;
