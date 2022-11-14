import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {WalletButton} from "./walletButton";
import {decryptByEncryptPassword, storage} from "../utill/common";
import {StoredKey} from "../utill/enum";
import {Api} from "../api/api";
import {List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {useDispatch} from "react-redux";
import {openSnackBar} from "../redux/modules/snackBar";
import axios from "axios";
import {SimpleSnackBar} from "./simpleSnackBar";

const drawerBleeding = 56;

export const ChangeAccountDrawer = (props) => {
  const dispatch = useDispatch();
  const [accounts, setAccounts] = useState([])
  const { open, setOpen, client } = props;

  useEffect(() => {
    getAccounts().catch(e => console.log(e))
  }, [])

  const getAccounts = async () => {
    const publicKey = storage.get(StoredKey.PUBLIC_KEY)
    if (publicKey) {
      const api = new Api(client)
      const axiosData = await api.getAccount(publicKey)
      console.log(axiosData)
      setAccounts(axiosData.data.accounts)
    }
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  }

  const addAccount = async () => {
    const encMnemonic = storage.get(StoredKey.MNEMONIC)
    const password = storage.get(StoredKey.PASSWORD)
    if (encMnemonic && password) {
      let mnemonic = decryptByEncryptPassword(encMnemonic, password)
      await axios.post('/api/accounts', {
        mnemonic: mnemonic,
        client: client
      }).then(response => {
        console.log(response)
        dispatch(openSnackBar('success', 'account가 생성되었습니다.'))
        getAccounts().catch(e => console.log(e))
      }).catch(e => console.log(e))
    }
  }

  const handelClickChangeAccountId = async (accountId) => {
    storage.set(StoredKey.ACCOUNT_ID, accountId)
    toggleDrawer(false)
    dispatch(openSnackBar('success', 'account가 변경되었습니다.'));
  }

  return (
    <>
      <SimpleSnackBar/>
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
            sx={{ width: '100%', backgroundColor: 'background.paper' }}
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
