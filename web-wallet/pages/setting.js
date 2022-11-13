import React, {useEffect, useState} from "react";
import {Navigation} from "../components/navigation";
import {Page, StoredKey} from "../utill/enum";
import {Box, Card, CardActions, CardContent} from "@mui/material";
import {removeStorage, storage} from "../utill/common";
import {Header} from "../components/header";
import {WalletButton} from "../components/walletButton";
import {ChangeAccountDrawer} from "../components/changeAccountDrawer";
import {useRouter} from "next/router";

export default function Setting ()  {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [client, setClient] = useState('')

  useEffect(() => {
    const storedClient = storage.get(StoredKey.CLIENT)
    setClient(storedClient)
  }, [])

  const handleExplainKey = async () => {
    await removeStorage()
    router.push('/')
  }
  const handleClickLock = () => {
    storage.set(StoredKey.LOCK, true)
    router.push('/login')
  }

  return (
    <>
      <Header showBackBtn={false}/>
      {
        open &&
        <ChangeAccountDrawer
          client = {client}
          open={open}
          setOpen={() => setOpen(!open)}
        />
      }
      <Box sx={{padding: '60px 30px'}}>
        <Card>
          <CardContent>
            계정을 생성하거나 현재 추가되어있는 계정을 확인 할 수 있습니다.
          </CardContent>
          <CardActions>
            <WalletButton
              fullWidth
              onClick={() => setOpen(!open)}>
              계정 확인
            </WalletButton>
          </CardActions>
        </Card>
        <Card sx={{marginTop: '15px'}}>
          <CardContent>
            지갑을 잡그면 비밀번호를 입력해야 합니다.
          </CardContent>
          <CardActions>
            <WalletButton
              fullWidth
              onClick={handleClickLock}>
              지갑 잠금
            </WalletButton>
          </CardActions>
        </Card>
        <Card sx={{marginTop: '15px'}}>
          <CardContent>
            등록된 계정 정보를 초기화합니다. 새로운 계정을 만들거나 복구 구문을 이용하여 지갑을 복구해주세요.
          </CardContent>
          <CardActions>
            <WalletButton
              fullWidth
              onClick={handleExplainKey}>
              키 방출하기
            </WalletButton>
          </CardActions>
        </Card>
      </Box>
      <Navigation page={Page.SETTING}/>
    </>
  )
}
