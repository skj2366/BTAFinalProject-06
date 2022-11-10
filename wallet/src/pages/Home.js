import React, {useEffect, useState} from "react";
import {Navigation} from "../components/navigation";
import {Page, StoredKey} from "../utill/enum";
import {Avatar, Box, Button, CircularProgress, Stack, Typography} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import SendIcon from '@mui/icons-material/Send';
import {goTo} from "react-chrome-extension-router";
import {Api} from "../api/api";
import {Transfer} from "./Transfer";
import {useDispatch, useSelector} from "react-redux";
import copy from 'copy-to-clipboard'
import {openSnackBar} from "../redux/snackBar";
import {TransactionList} from "../components/transactionList";
import {AccountBalanceQuery} from "@hashgraph/sdk";
import {clientReducer} from "../redux/client";
import {balanceReducer, updateBalance} from "../redux/balance";
import {getClient, storage} from "../utill/common";
import {accountReducer} from "../redux/accountInfo";
import {WalletButton} from "../components/walletButton";


export const Home = () => {
  const dispatch = useDispatch();
  const { client } = useSelector(state => state.clientReducer);
  const { accountId } = useSelector(state => state.accountReducer);
  const { balance } = useSelector(state => state.balanceReducer);
  const [loadingFaucet , setFaucet] = useState(false)
  const [transactions , setTransactions] = useState([])

  // 네트워크 설정
  const api = new Api(client)

  useEffect(() => {
    initBalance().catch(e => console.log(e))
    getAccountStxTransaction().catch(e => console.log(e))
  },[])

  const initBalance = async () => {
    try {
      const accountBalance = await api.fetchBalance(accountId).catch(e => console.log(e))
      dispatch(updateBalance(accountBalance))
    } catch (e) {
      console.log(e)
      dispatch(openSnackBar('error', '지갑 보유 금액을 가져오느데 실패했습니다. 다시 시도해주세요.'))
    }
  }

  const faucetStx = async () => {

  }

  const getAccountStxTransaction = async () => {

  }

  const handleClickCopyAddress = () => {
    copy(accountId)
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
                    disabled={loadingFaucet}
                    startIcon={<InvertColorsIcon />}
                    onClick={faucetStx}>
              {
                loadingFaucet &&
                <WalletButton size={24}/>
              }
              Faucet
            </WalletButton>
            <WalletButton variant="contained" endIcon={<SendIcon />} onClick={goToTransfer}>
              Send
            </WalletButton>
          </Stack>
        </Box>
      </Box>

      <Navigation page={Page.HOME}/>
    </>
  )
}
