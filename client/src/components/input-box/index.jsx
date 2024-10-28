import React from 'react';
import TextField from '@mui/material/TextField';

const InputBox = ({ label, value, onChange, required }) => (
  <TextField required={required} label={label} variant="outlined" fullWidth margin="normal" value={value} onChange={onChange} />
);

export default InputBox;
