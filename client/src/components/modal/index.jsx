// GenericModal.js
import React from 'react';
import { Modal as CustomModal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const Modal = ({ open, handleClose, onSave = null, children, title = "Modal Title", onEdit = null, isForm = false }) => {
  const handleChange = async () => {
    if (isForm) return;
    try {
      if (onSave) await onSave();
      if (onEdit) await onEdit();
      handleClose();
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box id="modal-description" mb={3}>
          {children}
        </Box>

        {!isForm && (
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              {onEdit ? 'Edit' : 'Save'}
            </Button>
          </Box>
        )}
      </Box>
    </CustomModal>
  );
};

export default Modal;
