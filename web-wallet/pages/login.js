import React, {useState} from "react";

import {Avatar, Box, Button, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {encryptPassword, storage} from "../utill/common";
import {StoredKey} from "../utill/enum";
import {openSnackBar} from "../redux/modules/snackBar";
import {WalletButton} from "../components/walletButton";
import {ButtonProgress} from "../components/buttonProgress";
import {Header} from "../components/header";
import {useRouter} from "next/router";

export default function Login () {
  const dispatch = useDispatch();
  const router = useRouter()
  const [inputPassword, setInputPassword] = useState('');
  const [loadingTransfer, setLoadingTransfer] = useState(false);

  const handleClickRecoverAccount = () => {
    router.push('/recoverAccount')
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
    router.push('/')
  }

  const handleCheckPassword = async () => {
    const shaPassword = encryptPassword(inputPassword)
    setLoadingTransfer(true);
    const encPassword = storage.get(StoredKey.PASSWORD)
    if (shaPassword === encPassword) {
      console.log('Ok');
      setLoadingTransfer(false);
      await storage.remove(StoredKey.LOCK)
      router.push('/home')
    } else {
      console.log('Nope');
      dispatch(openSnackBar('error', '비밀번호를 확인해주세요.'));
      setLoadingTransfer(false);
    }
  }

  return (
    <>
      <Header showBackBtn={false}/>
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
