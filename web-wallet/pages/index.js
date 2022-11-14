import React, {useEffect} from "react";
import {Box, Paper, Stack, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {storage} from "../utill/common";
import {ClientTypeName, StoredKey} from "../utill/enum";
import {changeAccount} from "../redux/modules/accountInfo";
import {changeClient} from "../redux/modules/client";
import {Header} from "../components/header";
import {useRouter} from "next/router";
import {Logo} from "../components/logo";

export default function Help() {
  const dispatch = useDispatch();
  const router = useRouter()

  useEffect(() => {
    async function checkLogin() {
      const client = storage.get(StoredKey.CLIENT)
      dispatch(changeClient(client ? client :  ClientTypeName.LOCAL_NET))

      const password = storage.get(StoredKey.PASSWORD)
      const accountId = storage.get(StoredKey.ACCOUNT_ID)
      const lock = storage.get(StoredKey.LOCK)

      if (password && accountId) {
        dispatch(changeAccount(accountId))
        if (lock) router.push('/login')
        else router.push('/home')
      }
    }
    checkLogin().catch(e => console.log(e))
  }, [])

  const handleClickCreateAccount = () => {
    router.push('/createAccount')
  }

  const handleClickRecoverAccount = () => {
    router.push('/recoverAccount')
  }

  return (
    <Box>
      <Header showBackBtn={false}/>
      <Box sx={{textAlign: 'center', padding: '80px 30px 30px'}}>
        <Box sx={{margin: '0 auto 10px'}}>
         <Logo/>
        </Box>
        <Box sx={{margin: '20px auto'}}>
          <Typography variant={'h6'} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <b>Ehra</b>가 처음이세요?
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
    </Box>
  )
}
