import React, {useState} from "react";
import {goTo} from "react-chrome-extension-router";
import {Header} from "../components/header";
import {generateSecretKey} from '@stacks/wallet-sdk';
import {Avatar, Box, Button, CircularProgress, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {CheckMnemonic} from './CheckMnemonic';
import {storage} from '../utill/common';
import sha256 from 'sha256';
import {useDispatch} from "react-redux";
import {openSnackBar} from "../redux/snackBar";

export const CreateAccount = () => {
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheckValue, setPasswordCheckValue] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const dispatch = useDispatch();

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleChangePasswordCheckValue = (e) => {
    setPasswordCheckValue(e.target.value);
  }
  const isValidPassword = () => {
    if (!password || !passwordCheckValue) {
      // alert('정확히 입력해주세요.');
      dispatch(openSnackBar('error', '정확히 입력해주세요.'));
      return false;
    }
    if (password !== passwordCheckValue) {
      dispatch(openSnackBar('error', '두 입력값이 일치하지 않습니다.'));
      return false;
    }
    return true;
  }

  const createMnemonic = async (len=128) => {
    let mnem = generateSecretKey(len);
    console.log(mnem);
    setMnemonic(mnem);
    console.log(mnemonic);
    // setParamMnem(menm);
    // console.log('menm', menm)
    // let wordList = menm.split(' ');
    // setMnem(wordList);
    return mnem;
  }

  const handleMakeWalletBtnClick = async () => {
    if (!isValidPassword()) return;
    setLoadingTransfer(true);
    let hashPassword = sha256(password);
    await storage.set('password', hashPassword);

    const secretKey = generateSecretKey(128);
    setLoadingTransfer(false);
    await goToNext(secretKey);


  }

  const goToNext = async(mnem) => {
    goTo(CheckMnemonic, {params: mnem.toString()});
  }
  return (
    <>
      <Header/>
      <Box sx={{textAlign: 'center', padding: '30px'}}>
        <Box sx={{margin: '0 auto 10px'}}>
          <Avatar
            src="../img/LOGO.png"
            sx={{ width: 60, height: 60, margin: '0 auto'}}
          />
        </Box>
        <Box sx={{margin: '20px auto'}}>
          <Typography variant={'h6'} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            새로운 비밀번호를 입력해 주세요
          </Typography>
          <FormControl fullWidth sx={{ margin: '5px auto'  }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">비밀번호</InputLabel>
            <Input
              type='password'
              value={password}
              onChange={handleChangePassword}
            />
          </FormControl>
          <FormControl fullWidth sx={{ margin: '5px auto'  }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">비밀번호 확인</InputLabel>
            <Input
              type='password'
              value={passwordCheckValue}
              onChange={handleChangePasswordCheckValue}
            />
          </FormControl>
          <Box>
            <Button
              fullWidth
              variant="contained"
              disabled={loadingTransfer}
              onClick={handleMakeWalletBtnClick}
            >
              {
                loadingTransfer &&
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}/>
              }
              지갑생성하기
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
