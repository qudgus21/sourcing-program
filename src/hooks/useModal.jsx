import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Box } from '@mui/material';

const modalRoot = document.getElementById('modal-root');

const useModal = () => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [closeCallback, setCloseCallback] = useState(null);

  const handleModalOpen = (content, callback) => {
    setModalContent(content);
    setOpen(true);
    setCloseCallback(() => callback);
  };

  const handleModalClose = () => {
    setOpen(false);
    setModalContent(null);
  };

  const ModalComponent = () => {
    if (!modalRoot || !modalContent) return null;

    return createPortal(
      <Modal open={open} onClose={()=>{handleModalClose(); closeCallback && closeCallback(); }}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          {modalContent}
        </Box>
      </Modal>,
      modalRoot
    );
  };

  return {
    handleModalOpen,
    handleModalClose,
    ModalComponent,
  };
};

export default useModal;
