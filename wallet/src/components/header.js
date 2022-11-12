import * as React from 'react';
import {
  goBack
} from "react-chrome-extension-router";
import {Box, IconButton} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {NetworkChangeSelector} from "./networkChangeSelector";

export const Header = (props) => {
  const {showBackBtn} = props

  return (
    <Box sx={{ padding: '10px', position:'relative' }}>
      {
        showBackBtn &&
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
      }
      <Box sx={{width : '100px', position:'absolute', right: '10px', top: '13px'}}>
        <NetworkChangeSelector/>
      </Box>
    </Box>
  );
}
