import React, {useEffect, useState} from "react";
import {goTo} from "react-chrome-extension-router";
import {Avatar, Box, Button, Paper, Stack, Typography} from "@mui/material";
import {CreateAccount} from "./CreateAccount";
import {RecoverAccount} from "./RecoverAccount";
import {useDispatch} from "react-redux";
import {Login} from "./Login";
import {storage} from "../utill/common";
import {ClientTypeName, StoredKey} from "../utill/enum";
import {changeAccount} from "../redux/accountInfo";
import {changeClient} from "../redux/client";
import {Header} from "../components/header";
import {Home} from "./Home";

export const Help = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkLogin() {
      await storage.get([ StoredKey.PASSWORD, StoredKey.ACCOUNT_ID, StoredKey.LOCK, StoredKey.CLIENT],  (result) => {
        console.log(result.client)
        dispatch(changeClient(result.client ? result.client :  ClientTypeName.TEST_NET))
        if (result.password && result.accountId) {
          dispatch(changeAccount(result.accountId))
          if (result.lock) goTo(Login)
          else goTo(Home)
        }
      })
    }
    checkLogin().catch(e => console.log(e))
  }, [])

  const handleClickCreateAccount = () => {
      goTo(CreateAccount);
  }

  const handleClickRecoverAccount = () => {
      goTo(RecoverAccount);
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
            <b>FullStacks</b>가 처음이세요?
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} sx={{alignItems: "stretch"}}>
          <Paper sx={{backgroundColor:'#000', color: '#fff', padding: '10px', width: "50%", cursor: "pointer"}} onClick={handleClickRecoverAccount}>
            <Typography sx={{wordBreak: 'keep-all', fontWeight: "bold"}}>이미 비밀 복구 구문이 있습니다.</Typography>
            <Typography variant="subtitle2">비밀 복구 구문을 이용하여 지갑 가져오기</Typography>
          </Paper>
          <Paper sx={{backgroundColor:'#000', color: '#fff', padding: '10px', width: "50%", cursor: "pointer"}} onClick={handleClickCreateAccount}>
            <Typography sx={{wordBreak: 'keep-all', fontWeight: "bold"}}>설정을 시작하죠!</Typography>
            <Typography variant="subtitle2">새로운 지갑 만들기</Typography>
          </Paper>
        </Stack>
      </Box>
    </>
  )
}
