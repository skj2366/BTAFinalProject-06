import React, {useEffect, useState} from "react";
import {Navigation} from "../components/navigation";
import {Page, StoredKey} from "../utill/enum";
import {Box, Stack, Typography} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SendIcon from '@mui/icons-material/Send';
import ExploreIcon from '@mui/icons-material/Explore';
import {Transfer} from "./transfer";
import {useDispatch} from "react-redux";
import copy from 'copy-to-clipboard'
import {openSnackBar} from "../redux/modules/snackBar";
import {WalletButton} from "../components/walletButton";
import {Header} from "../components/header";
import {TransactionList} from "../components/transactionList";
import {useRouter} from "next/router";
import {storage} from "../utill/common";
import {Logo} from "../components/logo";
import axios from "axios";
import {SimpleSnackBar} from "../components/simpleSnackBar";
import {Api} from "../api/api";


export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter()
  const [accountId, setAccountId] = useState('')
  const [client, setClient] = useState('')
  const [balance, setBalance] = useState('')
  const [loadingFaucet , setFaucet] = useState(false)
  const [transactions , setTransactions] = useState([])


  // 네트워크 설정
  useEffect(() => {
    const storedClient = storage.get(StoredKey.CLIENT)
    console.log(storedClient)
    setClient(storedClient)

    const storedAccountId = storage.get(StoredKey.ACCOUNT_ID)
    console.log(storedAccountId)
    if (!storedAccountId) {
      router.push('/')
    } else {
      setAccountId(storedAccountId)
    }

    if (client && accountId) {
      init().catch(e => console.log(e))
    }
  },[accountId, client])

  const init = async () => {
    await initBalance().catch(e => console.log(e))
    await getAccountTransactions().catch(e => console.log(e))
  }

  const initBalance = async () => {
    try {
      await axios.get(`/api/balance?accountId=${accountId}&client=${client}`)
        .then(response => {
          const {balance} = response.data
          setBalance(balance)
        })
    } catch (e) {
      console.log(e)
      dispatch(openSnackBar('error', '지갑 보유 금액을 가져오는데 실패했습니다. 다시 시도해주세요.'))
    }
  }

  const getAccountTransactions = async () => {
    const api = new Api(client)
    await api.getTransactions(accountId)
      .then(response => {
        setTransactions(response.data.transactions)
      })
  }

  const handleClickCopyAddress = () => {
    copy(accountId)
    dispatch(openSnackBar('success', '복사완료'))
  }

  const goToTransfer = () => {
    router.push('/transfer')
  }

  const goToExplorer = () => {
    window.open('http://localhost:3000')
  }

  return (
    <>
      <SimpleSnackBar/>
      <Header showBackBtn={false}/>
      <Box sx={{textAlign: 'center', padding: '30px'}}>
        <Box sx={{margin: '0 auto 10px'}}>
          <Logo/>
        </Box>
        <Box sx={{margin: '20px auto'}}>
          <Typography variant={'h4'} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {balance}
          </Typography>
        </Box>
        <Box onClick={handleClickCopyAddress}>
          <Typography variant={'body1'} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <ContentCopyIcon sx={{width:15, verticalAlign: 'middle'}}/> {accountId}
          </Typography>
        </Box>
        <Box sx={{marginTop: '10px'}}>
          <Stack direction="row" spacing={2} sx={{justifyContent: 'center'}}>
            <WalletButton variant="outlined"
                    startIcon={<ExploreIcon />}
                    onClick={goToExplorer}>
              Ehra Explorer
            </WalletButton>
            <WalletButton variant="contained" endIcon={<SendIcon />} onClick={goToTransfer}>
              Send
            </WalletButton>
          </Stack>
        </Box>
      </Box>
      <Box sx={{padding: '0 10px 55px'}}>
        <TransactionList transactions = {transactions} accountId={accountId} client={client}/>
      </Box>
      <Navigation page={Page.HOME}/>
    </>
  )
}
