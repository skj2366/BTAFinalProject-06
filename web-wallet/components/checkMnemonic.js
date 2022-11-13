import React from "react";
import {Box, Typography} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {WalletButton} from "./walletButton";
import copy from "copy-to-clipboard";
import {openSnackBar} from "../redux/modules/snackBar";
import {useDispatch} from "react-redux";

export const CheckMnemonic = (props) => {
  const dispatch = useDispatch();
  const {mnemonic, goToNext} = props

  const handleClickCopyMnemonic = () => {
    console.log('ee')
    copy(mnemonic)
    dispatch(openSnackBar('success', '복사완료'))
  }

  return (
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
  )
}
