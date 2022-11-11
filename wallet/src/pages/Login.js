import React, {useEffect, useState} from "react";
import {
  goTo
} from "react-chrome-extension-router";
import {Avatar, Box, Button, CircularProgress, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {Home} from "./Home";
import {RecoverAccount} from "./RecoverAccount";
import {useDispatch} from "react-redux";
import {storage} from "../utill/common";
import {ClientTypeName, StoredKey} from "../utill/enum";
import sha256 from "sha256";
import {openSnackBar} from "../redux/snackBar";
import {Help} from "./Help";
import {changeClient} from "../redux/client";
import {WalletButton} from "../components/walletButton";
import {ButtonProgress} from "../components/buttonProgress";


//destroy knife property strategy clerk honey raise rural buffalo current armed already
export const Login = () => {
  const dispatch = useDispatch();
  const [inputPassword, setInputPassword] = useState('');
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  const [login, setLogin] = useState(false);

  const handleClickRecoverAccount = () => {
    goTo(RecoverAccount)
  }

  const handleChangePassword = (e) => {
    setInputPassword(e.target.value);
  }

  const handleExplainKey = async () => {
    await storage.remove(StoredKey.PASSWORD);
    await storage.remove(StoredKey.PRIVATE_KEY);
    await storage.remove(StoredKey.PUBLIC_KEY);
    await storage.remove(StoredKey.ACCOUNT_ID);
    await storage.remove(StoredKey.MNEMONIC);
    goTo(Help);
  }

  const handleCheckPassword = async () => {
    const shaPassword = sha256(inputPassword);
    setLoadingTransfer(true);
    await storage.get(StoredKey.PASSWORD, (result) => {
      setLogin(true);
      if (shaPassword === result.password) {
        console.log('Ok');
        setLoadingTransfer(false);
        goTo(Home);
      } else {
        console.log('Nope');
        dispatch(openSnackBar('error', '비밀번호를 확인해주세요.'));
        setLoadingTransfer(false);
      }
    })
  }

  return (
    <>
      <Box sx={{textAlign: 'center', padding: '80px 30px 30px'}}>
        <Box sx={{margin: '0 auto 10px'}}>
          <Avatar
            src="../img/LOGO.png"
            sx={{ width: 60, height: 60, margin: '0 auto'}}
          />
        </Box>
        <Box sx={{margin: '20px auto'}}>
          <Typography variant={'h6'} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            재방문을 환영합니다!
          </Typography>
        </Box>
        <FormControl fullWidth sx={{ margin: '5px auto' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">비밀번호</InputLabel>
          <Input
            type='password'
            value={inputPassword}
            onChange={handleChangePassword}
          />
        </FormControl>
        <Box sx={{marginTop: "10px"}}>
          <WalletButton
            fullWidth
            disabled={loadingTransfer}
            onClick={handleCheckPassword}
          >
            {
              loadingTransfer &&
              <ButtonProgress/>
            }
            로그인
          </WalletButton>
        </Box>
        <Box sx={{marginTop: '10px'}}>
          <a onClick={handleClickRecoverAccount}>비밀번호를 잊으셨습니까?</a>
        </Box>
        <Button onClick={handleExplainKey}>키 방출</Button>
      </Box>
    </>
  )
}
