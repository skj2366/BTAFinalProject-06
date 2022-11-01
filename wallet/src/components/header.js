import * as React from 'react';
import {
  goBack
} from "react-chrome-extension-router";
import {Box, IconButton} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';


export const Header = () => {
  return (
    <Box sx={{ paddingLeft: '10px' }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={goBack}
      >
        <ArrowBackIosNewOutlinedIcon />
      </IconButton>
    </Box>
  );
}
