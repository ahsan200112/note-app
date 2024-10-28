// PaginatedTable.js
import React, { useState, useEffect } from 'react';
import { Table as CustomTable, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Table = ({ columns, fetchData, onEdit, onDelete, rowsPerPageOptions = [5, 10, 15] }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Fetch data whenever page or rowsPerPage changes
  useEffect(() => {    
    fetchDataAsync();
  }, [page, rowsPerPage, fetchData]);

  const fetchDataAsync = async () => {
    const { data, total } = await fetchData(page - 1, rowsPerPage);
    setRows(data);
    setTotalRows(total);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  // Handle delete button click
  const handleDeleteClick = (row) => {
    setSelectedRow(row); // Store row to be deleted
    setOpenDeleteDialog(true); // Open delete confirmation dialog
  };

  // Confirm delete action
  const confirmDelete = () => {
    if (selectedRow) {
      onDelete(selectedRow); // Call the onDelete function with selected row
      fetchDataAsync();
    }
    handleCloseDeleteDialog(); // Close dialog after delete action
  };

  // Close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedRow(null); // Clear selected row
  };

  // Show "No Data Found" message if rows are empty
  if (rows.length === 0) {
    return (
      <Paper>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={5}>
          <InfoIcon color="action" fontSize="large" />
          <Typography variant="h6" color="textSecondary" mt={2}>
            No Data Found
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper>
      <div className="card">
        <div className="card-body">
          <TableContainer>
            <CustomTable>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.field}>{column.headerName}</TableCell>
                  ))}
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column) => (
                      <TableCell key={column.field}>{row[column.field]}</TableCell>
                    ))}
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => onEdit(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDeleteClick(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </CustomTable>
          </TableContainer>
        </div>
        <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
            {rowsPerPageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option} rows per page
              </MenuItem>
            ))}
          </Select>
          <Pagination
            variant="outlined"
            color="primary"
            count={Math.ceil(totalRows / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Table;
