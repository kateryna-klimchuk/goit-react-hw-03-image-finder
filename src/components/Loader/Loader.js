import { Puff } from 'react-loader-spinner';
import styled from 'styled-components';

const LoadSpinner = styled.div`
  display: flex;
  padding-top: 100px;
  justify-content: center;
  align-item: center;
`;

const Loader = () => {
  return (
    <LoadSpinner>
      <Puff height="100" width="100" color="#a2c893" ariaLabel="loading" />
    </LoadSpinner>
  );
};

export default Loader;
