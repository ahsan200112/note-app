// App.js
import React, { useState } from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { List, Modal, InputBox, TextArea, Button } from '../../components';
import { get, post, put, deleted } from '../../services/axios';

const Note = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const columns = [
    { field: 'title', headerName: 'Name' },
    { field: 'content', headerName: 'Content' },
  ];

  const showNotification = (message, severity = 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const fetchData = async (page, rowsPerPage) => {
    try {
      const response = await get(`notes?offset=${page * rowsPerPage}&limit=${rowsPerPage}`);
      if (!response.status) throw new Error(`An error has occurred: ${response.status}`);
      console.log(response);
      return { data: response.data.data, total: response.data.total };
    } catch (error) {
      console.error("Error fetching data:", error);
      showNotification('Error fetching data: ' + error.response.data.message);
      return { data: [], total: 0 };
    }
  };

  const handleAddNote = async (e) => {
    try {
      e.preventDefault();
      const response = await post('notes', { title, content });
      if (response.status === 201) {
        handleCloseModal();
        setTitle('');
        setContent('');
        showNotification('Note added successfully!', 'success');
      }
    } catch (error) {
      console.error('Error adding note:', error.response.data.message);
      showNotification(error.response.data.message);
    }
  };

  const handleUpdateNote = async (e) => {
    try {
      e.preventDefault();
      const response = await put(`notes/${selectedRow._id}`, { title, content });
      if (response.status === 200) {
        handleCloseModal();
        showNotification('Note updated successfully!', 'success');
      }
    } catch (error) {
      console.error('Error updating note:', error);
      showNotification(error.response.data.message);
    }
  };

  const handleDelete = async (row) => {
    try {
      const response = await deleted(`notes/${row._id}`);
      if (response.status === 200) {
        showNotification('Note deleted successfully!', 'success');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      showNotification(error.response.data.message);
    }
  };

  const onHandleEdit = (row) => {
    setIsEditModalOpen(true);
    setSelectedRow(row);
    setTitle(row.title);
    setContent(row.content);
  };

  const onHandleAdd = () => {
    setIsModalOpen(true);
    setTitle('');
    setContent('');
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className='card' style={{ margin: "10%" }}>
      <div className="card-header">
        <div className="row">
          <div className="col">
            <h1>Notes list</h1>
          </div>
          <div className="col-auto align-items-center mt-2">
            <Tooltip title='Add Note'>
              <IconButton color="primary" onClick={onHandleAdd}>
                <PlaylistAddIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="card-body">
        <List columns={columns} fetchData={fetchData} onEdit={onHandleEdit} onDelete={handleDelete} />
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {(selectedRow && isEditModalOpen) && (
        <Modal
          open={isEditModalOpen}
          handleClose={handleCloseModal}
          title="Edit Note"
          isForm={true}
        >
          <form onSubmit={handleUpdateNote}>
            <InputBox required label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextArea required label="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <Button type="submit">
              Edit
            </Button>
          </form>

        </Modal>
      )}

      {isModalOpen && (
        <Modal
          open={isModalOpen}
          handleClose={handleCloseModal}          
          title="Add Note"
          isForm={true}
        >
          <form onSubmit={handleAddNote}>
            <InputBox required label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextArea required label="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <Button type="submit">
              Save
            </Button>
          </form>
        </Modal>

      )}
    </div>
  );
};

export default Note;
