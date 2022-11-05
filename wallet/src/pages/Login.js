import React, {useEffect, useState} from "react";
import {
  goTo
} from "react-chrome-extension-router";
import {Avatar, Box, Button, CircularProgress, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {Home} from "./Home";
import {RecoverAccount} from "./RecoverAccount";
import {useDispatch} from "react-redux";
import {storage} from "../utill/common";
import {changeNetwork} from "../redux/network";
import {NetworkType} from "../utill/enum";
import {CreateAccount} from "./CreateAccount";
import {CreateMenm} from "./CreateMenm";
import sha256 from "sha256";
import {openSnackBar} from "../redux/snackBar";
import {Help} from "./Help";

export const Login = () => {
  const dispatch = useDispatch();
  const [inputPassword, setInputPassword] = useState('');
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    async function setNetwork () {
      const storedNetwork = await storage.get('network')
      const currentNetwork = storedNetwork || NetworkType.TestNetwork
      dispatch(changeNetwork(currentNetwork))
    }
    async function checkLogin() {
      // const password = await storage.get('password');
      // const currentPassword = password || 'qwe';
      // console.log(currentPassword);
      // console.log(password);
      chrome.storage.local.get(["password"], function (result) {
        console.log('asdasdadsasdsd')
        console.log(result)
        setLogin(true);
        // result.password ? goTo(Home) : goTo(CreateAccount);
      });
    }
    setNetwork()
    checkLogin()
  }, [])

  const handleClickLogin = () => {
    goTo(Home)
  }

  const handleClickRecoverAccount = () => {
    goTo(RecoverAccount)
  }

  const handleClickCreateAccount = () => {
    goTo(CreateAccount);
  }

  const handleChangePassword = (e) => {
    setInputPassword(e.target.value);
  }

  const handleExplainKey = async () => {
    // await storage.set("privateKey", null);
    // await storage.set("password", null);
    // await storage.set("address", null);
    await storage.remove("password");
    await storage.remove("privateKey");
    await storage.remove("address");
    goTo(Help);
  }

  const handleCheckPassword = () => {
    console.log(inputPassword);
    const shaPassword = sha256(inputPassword);
    console.log(shaPassword);
    setLoadingTransfer(true);
    chrome.storage.local.get(["password"], function (result) {
      console.log('asdasdadsasdsd')
      let storagePassword = result.password.replaceAll('"', '');
      console.log(storagePassword);
      setLogin(true);
      if (shaPassword == storagePassword) {
        console.log('Ok');
        setLoadingTransfer(false);
        goTo(Home);
      } else {
        console.log('Nope');
        dispatch(openSnackBar('error', '비밀번호를 확인해주세요.'));
        setLoadingTransfer(false);
      }
      // result.password ? goTo(Home) : goTo(CreateAccount);
    });
  }

  return (
    // <>
    //   로그인 페이지
    //   <Button onClick={handleClickLogin}>임시 홈으로 이동 버튼</Button>
    //   <Button onClick={handleClickRecoverAccount}>임시 계정복구로 이동</Button>
    //   <Button onClick={handleClickCreateAccount}>계정 생성으로 이동</Button>
    // </>
    <>
      <Box sx={{textAlign: 'center', padding: '30px'}}>
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
      </Box>
      <FormControl fullWidth sx={{ margin: '5px auto'  }} variant="standard">
        <InputLabel htmlFor="standard-adornment-amount">비밀번호</InputLabel>
        <Input
          type='password'
          value={inputPassword}
          onChange={handleChangePassword}
        />
      </FormControl>
      <Box>
        <Button
          fullWidth
          variant="contained"
          disabled={loadingTransfer}
          onClick={handleCheckPassword}
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
          로그인
        </Button>
        <a onClick={handleClickRecoverAccount}>비밀번호를 잊으셨습니까?</a>
      </Box>

      <Button onClick={handleExplainKey}>키 방출</Button>
      {/*<Navigation page={Page.HOME}/>*/}
    </>
  )
}
