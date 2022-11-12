import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import {BottomNavigation, BottomNavigationAction, Box} from "@mui/material";
import {Page} from "../utill/enum";
import {
  goTo
} from "react-chrome-extension-router";
import {Setting} from "../pages/Setting";
import {Transfer} from "../pages/Transfer";
import {Home} from "../pages/Home";

export const Navigation = (props) => {
  const {page} = props

  const goToPage = (page) => {
    console.log(page)
    switch (page) {
      case Page.SETTING:
        goTo(Setting)
        break
      case Page.TRANSFER:
        goTo(Transfer)
        break
      default :
        goTo(Home)
    }
  }

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: '0'}}>
      <BottomNavigation
        value={page}
        onChange={(event, newValue) => {
          console.log(newValue)
          goToPage(newValue)
        }}
      >
        <BottomNavigationAction value={Page.HOME} icon={<HomeIcon />} />
        <BottomNavigationAction value={Page.TRANSFER} icon={<SendIcon />} />
        <BottomNavigationAction value={Page.SETTING} icon={<SettingsIcon />} />
      </BottomNavigation>
    </Box>
  );
}
