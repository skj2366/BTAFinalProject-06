import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {WalletButton} from "./walletButton";
import {decryptByEncryptPassword, storage} from "../utill/common";
import {StoredKey} from "../utill/enum";
import {Api} from "../api/api";
import {
  Card,
  CardContent,
  List, ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon, ListItemText,
  ListSubheader,
  Typography
} from "@mui/material";
import {useDispatch} from "react-redux";
import {changeAccount} from "../redux/accountInfo";
import {openSnackBar} from "../redux/snackBar";

const drawerBleeding = 56;

export const ChangeAccountDrawer = (props) => {
  const dispatch = useDispatch();
  const [accounts, setAccounts] = useState([])
  const { open, setOpen, client } = props;

  useEffect(() => {
    getAccounts().catch(e => console.log(e))
  }, [])

  const getAccounts = async () => {
    await storage.get([StoredKey.PUBLIC_KEY], async (result) => {
      if (result.publicKey) {
        const api = new Api(client)
        const axiosData = await api.getAccount(result.publicKey)
        console.log(axiosData)
        setAccounts(axiosData.data.accounts)
      }
    })
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  }

  const addAccount = async () => {
    await storage.get([StoredKey.MNEMONIC, StoredKey.PASSWORD],  async (result) => {
      if (result.mnemonic && result.password) {
        let mnemonic = decryptByEncryptPassword(result.mnemonic, result.password)
        const api = new Api(client)
        await api.addAccount(mnemonic)
        getAccounts().catch(e => console.log(e))
        dispatch(openSnackBar('success', 'account가 생성되었습니다.'));
      }
    })
  }

  const handelClickChangeAccountId = async (accountId) => {
    await storage.set(StoredKey.ACCOUNT_ID, accountId)
    dispatch(changeAccount(accountId))
    toggleDrawer(false)
    dispatch(openSnackBar('success', 'account가 변경되었습니다.'));
  }

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box sx={{height: '450px', padding: '30px'}}>
          <WalletButton
            fullWidth
            onClick={addAccount}>
            계정 추가하기
          </WalletButton>
          <List
            sx={{ width: '100%', maxWidth: 360, backgroundColor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {
              accounts.map((account, index) => (
                <ListItem
                  key={index}
                  sx={{border: '1px solid #000', marginTop: '10px', cursor: 'pointer'}}
                  onClick = {() => handelClickChangeAccountId(account.account)}
                >
                  <ListItemAvatar sx={{marginRight: '10px'}}>
                    Account Id
                  </ListItemAvatar>
                  <ListItemText primary={account.account}/>
                </ListItem>
              ))
            }
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
