import React, {useEffect, useState} from "react";
import {goTo} from "react-chrome-extension-router";
import {Avatar, Box, Button, Typography} from "@mui/material";
import {CreateAccount} from "./CreateAccount";
import {RecoverAccount} from "./RecoverAccount";
import {useDispatch} from "react-redux";
import {Login} from "./Login";

export const Help = () => {
  const dispatch = useDispatch();
  const [first, setFirst] = useState(false);
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  useEffect(() => {
    async function checkLogin() {
      chrome.storage.local.get(["password", "privateKey", "address"], function (result) {
        if (result.password && result.privateKey && result.address) {
          setFirst(true);
          goTo(Login);
        }
      });
    }
    checkLogin()
  }, [])
  const handleClickCreateAccount = () => {
      goTo(CreateAccount);
  }

  const handleClickRecoverAccount = () => {
      goTo(RecoverAccount);
  }

  return (
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
            FullStacks가 처음이세요?
          </Typography>
        </Box>
        <Box sx={{border: '1px solid black', margin: '20px auto'}}>
          <Typography variant={'h6'} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <b>이미 비밀 복구 구문이 있습니다.</b>
          </Typography>
          <Typography>
            비밀 복구 구문을 이용하여 지갑 가져오기
          </Typography>
          <Button onClick={handleClickRecoverAccount}>지갑 가져오기</Button>
        </Box>
        <Box sx={{border: '1px solid black', margin: '20px auto'}}>
          <Typography variant={'h6'} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <b>설정을 시작하죠!</b>
          </Typography>
          <Typography>
            이렇게 하면 새 지갑과 비밀 복구 구문이 만들어집니다
          </Typography>
          <Button onClick={handleClickCreateAccount}>지갑 생성</Button>
        </Box>
      </Box>
    </>
  )
}