import { Children, Component } from 'react';

import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1200;
`;

const ModalDiv = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  // handleClickBackdrop = e => {
  //   if (e.target === e.currentTarget) {
  //       this.props.onClose();
  //   }
  // };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { modalImg, closeModal } = this.props;
    return (
      <Overlay onClick={closeModal}>
        <ModalDiv>
          <img src={modalImg} alt="largeImage" />

          {Children}
        </ModalDiv>
      </Overlay>
    );
  }
}

export default Modal;
