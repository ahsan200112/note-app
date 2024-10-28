import React from 'react';
import TextField from '@mui/material/TextField';

const TextAreaComponent = ({label="Comments", value, onChange,required }) => {
    return (
        <TextField
            label={label}
            multiline
            rows={4}
            maxRows={8}
            value={value}
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Add your comments here..."
            inputProps={{ maxLength: 200 }}
            onChange={onChange} 
            required={required}
        />
    );
};

export default TextAreaComponent;