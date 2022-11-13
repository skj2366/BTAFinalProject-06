import * as React from 'react';
import {Box, IconButton} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {NetworkChangeSelector} from "./networkChangeSelector";
import {useRouter} from "next/router";

export const Header = (props) => {
  const {showBackBtn} = props
  const router = useRouter()

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
          onClick={() => router.back()}
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
