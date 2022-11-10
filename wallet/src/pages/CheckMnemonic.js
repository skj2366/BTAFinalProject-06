import React, {useEffect, useState} from "react";
import {goTo} from "react-chrome-extension-router";
import {Header} from "../components/header";
import {Avatar, Box, Button, Typography} from "@mui/material";
import copy from 'copy-to-clipboard';
import {openSnackBar} from "../redux/snackBar";
import {useDispatch} from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {ConfirmMnemonic} from "./ConfirmMnemonic";
import {WalletButton} from "../components/walletButton";
import {Mnemonic} from "@hashgraph/sdk";
import {storage} from "../utill/common";

export const CheckMnemonic = (props) => {
  const dispatch = useDispatch();
  const {mnemonic} = props

  const handleClickCopyMnemonic = () => {
    copy(mnemonic)
    dispatch(openSnackBar('success', '복사완료'))
  }

  const goToNext = async () => {
    goTo(ConfirmMnemonic, {mnemonic: mnemonic})
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
            복구 구문이 생성되었습니다.<br/>
            다음의 복구구문을 꼭 기록해두세요!
          </Typography>
          <Box onClick={handleClickCopyMnemonic}>
            <Typography variant={'body1'} sx={{margin: '20px auto', textAlign: 'center', whiteSpace: 'pre-line'}}>
              <ContentCopyIcon sx={{width:15, verticalAlign: 'middle'}}/> {mnemonic}
            </Typography>
          </Box>
          <Box>
            <WalletButton
              fullWidth
              onClick={goToNext}
            >
              다음
            </WalletButton>
          </Box>
        </Box>
      </Box>
    </>
  )
}
