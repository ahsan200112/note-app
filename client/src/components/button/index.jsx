import React from 'react';
import { Button as CustomButton } from '@mui/material';

const Button = ({ children, type, variant = "contained" ,color = "primary" }) => (
  <CustomButton type={type} variant={variant} color={color} fullWidth>
    {children}
  </CustomButton>
);

export default Button;
