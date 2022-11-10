import React, {useEffect, useState} from "react";
import {Navigation} from "../components/navigation";
import {Page, StoredKey} from "../utill/enum";
import {Box, Button, FormControl, FormControlLabel, InputAdornment, Switch, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Api} from "../api/api";
import {ButtonProgress} from "../components/buttonProgress";
import {WalletButton} from "../components/walletButton";
import {FormInput} from "../components/formInput";
import {decryptByEncryptPassword, storage} from "../utill/common";
import {Logo} from "../components/logo";
import {openSnackBar} from "../redux/snackBar";
import ErrorIcon from '@mui/icons-material/Error';
import moment from "moment";
import {Home} from "./Home";
import {goTo} from "react-chrome-extension-router";

export const Transfer = () => {
  // TODO reducx에 값을 변경할 때 사용
  const dispatch = useDispatch();

  // TODO 리덕스에서 값을 가져올때 사용!
  const { balance } = useSelector(state => state.balanceReducer);
  const { client } = useSelector(state => state.clientReducer);
  const { accountId } = useSelector(state => state.accountReducer);
  const [amount, setAmount] = useState(0)
  const [recipient, setRecipient] = useState('')
  const [memo, setMemo] = useState()
  const [scheduleTime, setScheduleTime] = useState('')
  const [transferType, setTransferType] = useState(false)
  const [loadingTransfer, setLoadingTransfer] = useState(false)

  const api = new Api(client)

  useEffect(() => {
    setScheduleTime(moment().toISOString(true).slice(0,16))
  }, [])

  const handleChangeTransferAmount = (e) => {
    setAmount(e.target.value)
  }

  const handleChangeRecipient = (e) => {
    setRecipient(e.target.value)
  }

  const handleChangeMemo = (e) => {
    setMemo(e.target.value)
  }

  const handleChangeScheduleTime = (e) => {
    console.log(e.target.value)
  }

  const validateTransfer = () => {
    if (amount <= 0) {
      dispatch(openSnackBar('error', '전송할 수량을 입력해주세요.'))
      return false
    }
    if (recipient.length === 0) {
      dispatch(openSnackBar('error', '전송할 수량을 입력해주세요.'))
      return false
    }

    return true
  }

  const handleClickPreview = async () => {
    if (!validateTransfer()) return false
    setLoadingTransfer(true)
    try {
      await storage.get([StoredKey.MNEMONIC, StoredKey.PASSWORD],  async (result) => {
        if (result.mnemonic && result.password) {
          let mnemonic = decryptByEncryptPassword(result.mnemonic, result.password)
          if (transferType) {
            const isoTime = moment(scheduleTime).toISOString()
            await api.scheduleTransfer(recipient, accountId, mnemonic, amount, memo, isoTime)
          } else {
            await api.transfer(recipient, accountId, mnemonic, amount, memo)
          }
          dispatch(openSnackBar('success', '전송완료'))
          setLoadingTransfer(false)
          goTo(Home)
        }
      })
    } catch (e) {
      console.log(e)
      dispatch(openSnackBar('error', '전송에 실패했습니다. 다시 시도해주세요.'))
    }
  }

  return (
    <>
      <Box sx={{padding: '30px'}}>
        <Box sx={{margin: '0 auto 30px'}}>
         <Logo/>
        </Box>
        <Box sx={{backgroundColor: '#efefef', padding: '20px', position: 'relative', textAlign: 'center'}}>
          <Box sx={{top: '-10px', position: 'absolute',  left: '50%', transform:'translateX(-50%)'}}>  <ErrorIcon/></Box>
          보낸 코인은 다시 돌려받을 수 없습니다. <br/>
          반드시 주소와 금액을 확인해주세요.
        </Box>
        <Box sx={{marginTop: '20px'}}>
          <FormInput
            fullWidth
            onChange={handleChangeRecipient}
            label={'전송할 주소'}
          />
          <Box sx={{marginTop: '15px'}}/>
          <FormInput
            fullWidth
            onChange={handleChangeTransferAmount}
            label={'수량'}
          />
          <Box sx={{marginTop: '15px'}}/>
          <FormInput
            fullWidth
            onChange={handleChangeMemo}
            label={'메모'}
          />
          <FormControlLabel
            checked={transferType}
            onChange={() => setTransferType(!transferType)}
            control={<Switch />}
            label={<Typography variant={'subtitle2'}>정해진 시간에 전송을 원한다면?</Typography>} />
          {
            transferType &&
            <>
              <Box/>
              <Typography variant={'caption'}>네트워크 상황에 따라 지연될 수 있습니다.</Typography>
              <Box sx={{marginTop: '15px'}}/>
              <FormInput
                fullWidth
                value={scheduleTime}
                onChange={handleChangeScheduleTime}
                type="datetime-local"
                label={'보낼 시간'}
              />
            </>
          }
        </Box>
        <Box sx={{marginTop: "20px"}}>
          <WalletButton
            fullWidth
            disabled={loadingTransfer}
            onClick={handleClickPreview}
          >
            {
              loadingTransfer &&
              <ButtonProgress/>
            }
            보내기
          </WalletButton>
        </Box>
      </Box>
      <Navigation page={Page.TRANSFER}/>
    </>
  )
}
