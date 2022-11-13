import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import {BottomNavigation, BottomNavigationAction, Box} from "@mui/material";
import {Page} from "../utill/enum";
import {useRouter} from "next/router";

export const Navigation = (props) => {
  const {page} = props
  const router = useRouter()

  const goToPage = (page) => {
    console.log(page)
    switch (page) {
      case Page.SETTING:
        router.push('/setting')
        break
      case Page.TRANSFER:
        router.push('/transfer')
        break
      default :
        router.push('/home')
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
