import React, {useEffect, useState} from "react";
import {Navigation} from "../components/Navigation";
import {LAMPORTS_PER_STX, Page} from "../utill/enum";
import {Avatar, Box, Button, CircularProgress, Stack, Typography} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import SendIcon from '@mui/icons-material/Send';
import {goTo} from "react-chrome-extension-router";
import {Api} from "../api/api";
import {Transfer} from "./Transfer";
import {useDispatch, useSelector} from "react-redux";
import {updateBalance} from "../redux/balance";
import copy from 'copy-to-clipboard'
import {openSnackBar} from "../redux/snackBar";
import {TransactionList} from "../components/TransactionList";


export const Home = () => {
  const dispatch = useDispatch();
  const { network } = useSelector(state => state.networkReducer);
  const { balance } = useSelector(state => state.balanceReducer);
  const [loadingFaucet , setFaucet] = useState(false)
  const [transactions , setTransactions] = useState([])
  const walletAddress = 'ST694GTT70W411X0T6PGN15AJKRTT9YAG5W898MM'

  // 네트워크 설정
  const api = new Api(network)

  useEffect(() => {
    let subscribe;
    initBalance().catch(e => console.log(e))
    subscribeBalance()
      .then(response => {
        subscribe = response
      })
      .catch(e => console.log(e))
    getAccountStxTransaction().catch(e => console.log(e))
    return () => subscribe && subscribe.unsubscribe()
  },[])

  const initBalance = async () => {
    console.log('init balance')
    await api.initBalance(walletAddress)
      .then(response => {
        console.log('init balance complete')
        const {stx, fungible_tokens, non_fungible_tokens} = response.data
        dispatch(updateBalance(Number(stx.balance) / LAMPORTS_PER_STX))
      }).catch(e => {
        console.log(e)
        dispatch(openSnackBar('error', '정보를 불러오지 못했습니다. 잠시 후에 다시 이용해주세요.'))
      })
  }
  const subscribeBalance = async () => {
    console.log('subscribe balance')
    return await api.subscribeBalance(walletAddress, updatedBalance => {
      if (updatedBalance != balance) {
        getAccountStxTransaction()
        dispatch(updateBalance(updatedBalance))
      }
    })
  }

  const faucetStx = async () => {
    setFaucet(true)
    api.sendMakeStxTransaction(walletAddress)
      .then(response => {
        const {success, txId, txRaw} = response.data
        console.log(response.data)
        setFaucet(false)
        dispatch(openSnackBar('success', '발급 완료'))
      }).catch(e => {
        console.log(e)
        dispatch(openSnackBar('error', '잠시 후에 다시 이용해주세요.'))
        setFaucet(false)
    })
  }

  const getAccountStxTransaction = async () => {
    api.getAccountStxTransaction(walletAddress)
      .then(response => {
        const {results} = response.data
        setTransactions(results)
        console.log(response.data)
      })
  }

  const handleClickCopyAddress = () => {
    copy(walletAddress)
    dispatch(openSnackBar('success', '복사완료'))
  }

  const goToTransfer = () => {
    goTo(Transfer)
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
          <Typography variant={'h4'} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {balance.toLocaleString()}STX
          </Typography>
        </Box>
        <Box onClick={handleClickCopyAddress}>
          <Typography variant={'body1'} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <ContentCopyIcon sx={{width:15, verticalAlign: 'middle'}}/> {walletAddress}
          </Typography>
        </Box>
        <Box sx={{marginTop: '10px'}}>
          <Stack direction="row" spacing={2} sx={{justifyContent: 'center'}}>
            <Button variant="outlined"
                    disabled={loadingFaucet}
                    startIcon={<InvertColorsIcon />}
                    onClick={faucetStx}>
              {
                loadingFaucet &&
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
              Faucet
            </Button>
            <Button variant="contained" endIcon={<SendIcon />} onClick={goToTransfer}>
              Send
            </Button>
          </Stack>
        </Box>
      </Box>
      <Box sx={{padding: '0 10px 55px'}}>
        <TransactionList transactions = {transactions}/>
      </Box>
      <Navigation page={Page.HOME}/>
    </>
  )
}
