import React, {useState} from "react";
import {Box, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {WalletButton} from "./walletButton";
import {ButtonProgress} from "./buttonProgress";
import {openSnackBar} from "../redux/snackBar";
import {useDispatch} from "react-redux";

export const InputPassword = (props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheckValue, setPasswordCheckValue] = useState('');
  const { buttonMessage, completeProcess } = props

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleChangePasswordCheckValue = (e) => {
    setPasswordCheckValue(e.target.value);
  }
  const isValidPassword = () => {
    if (!password || !passwordCheckValue) {
      dispatch(openSnackBar('error', '정확히 입력해주세요.'));
      return false;
    }
    if (password !== passwordCheckValue) {
      dispatch(openSnackBar('error', '두 입력값이 일치하지 않습니다.'));
      return false;
    }
    return true;
  }

  const handleClickComplete = () => {
    if (isValidPassword()) {
      completeProcess(password)
    }
  }

  return (
    <Box sx={{margin: '20px auto'}}>
      <Typography variant={'h6'} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        새로운 비밀번호를 입력해 주세요
      </Typography>
      <FormControl fullWidth sx={{ margin: '5px auto'  }} variant="standard">
        <InputLabel htmlFor="standard-adornment-amount">비밀번호</InputLabel>
        <Input
          type='password'
          value={password}
          onChange={handleChangePassword}
        />
      </FormControl>
      <FormControl fullWidth sx={{ margin: '5px auto'  }} variant="standard">
        <InputLabel htmlFor="standard-adornment-amount">비밀번호 확인</InputLabel>
        <Input
          type='password'
          value={passwordCheckValue}
          onChange={handleChangePasswordCheckValue}
        />
      </FormControl>
      <Box sx={{marginTop: '10px'}}>
        <WalletButton
          fullWidth
          disabled={loading}
          onClick={handleClickComplete}
        >
          {
            loading &&
            <ButtonProgress size={24}/>
          }
          {buttonMessage}
        </WalletButton>
      </Box>
    </Box>
  )
}
