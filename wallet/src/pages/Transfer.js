import React, {useState} from "react";
import {Navigation} from "../components/Navigation";
import {LAMPORTS_PER_STX, Page} from "../utill/enum";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  NativeSelect,
  Stack,
  Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Api} from "../api/api";
import {openSnackBar} from "../redux/snackBar";
import {generateWallet} from "@stacks/wallet-sdk";

const transferFees = [
  {value: 250n, label : 'low',},
  {value: 300n, label : 'standard',},
  {value: 350n, label : 'high',}
]

export const Transfer = () => {
  const wallet2 = 'ST2Z3AB623Y5GSRK6A2E5GJ30QH63PA0KBTZNRZ14'
  const wallet1 = 'ST694GTT70W411X0T6PGN15AJKRTT9YAG5W898MM'
  const secretKey = 'bba99899629c489f41418a849ff48d9098ce26b777742d0edb70d256b888fc2e01'
  const secretKey2 = 'innocent bright region diagram once forward great hello awkward maple morning expire eagle kidney butter mansion frost little venture era material auto scissors undo'

  const privateKey1 = generateWallet({secretKey : secretKey2, password: ''}).then(e => {
    console.log(e)
  })
  console.log('generate',privateKey1)

  const dispatch = useDispatch();
  const { network } = useSelector(state => state.networkReducer);
  const { balance } = useSelector(state => state.balanceReducer);
  const [amount, setAmount] = useState(0)
  const [recipient, setRecipient] = useState('')
  const [memo, setMemo] = useState()
  const [fee, setFee] = useState(transferFees[1])
  const [loadingTransfer, setLoadingTransfer] = useState(false)

  const api = new Api(network)

  const handleChangeTransferAmount = (e) => {
    setAmount(e.target.value)
  }

  const handleChangeRecipient = (e) => {
    setRecipient(e.target.value)
  }

  const handleChangeMemo = (e) => {
    setMemo(e.target.value)
  }

  const handleChangeFee = (e) => {
    const selectedFee = e.target.value
    const select = transferFees.find(fee => fee.label === selectedFee)
    console.log(select)
    setFee(select)
  }

  const handleClickPreview = async () => {
    setLoadingTransfer(true)
    await api.transferSTXToken(recipient, secretKey, amount, fee.value, memo)
      .then(response => {
        setLoadingTransfer(false)
        console.log(response)
      }).catch(e => {
        setLoadingTransfer(false)
        dispatch(openSnackBar('error', '잠시 후에 다시 이용해주세요.'))
      })
  }

  return (
    <>
      <Box sx={{padding: '30px'}}>
        <Box sx={{margin: '0 auto 30px'}}>
          <Avatar
            src="../img/LOGO.png"
            sx={{ width: 60, height: 60, margin: '0 auto'}}
          />
        </Box>
        <Box>
          <Typography>
            현재 보유량 {balance.toLocaleString()} STX
          </Typography>
          <FormControl fullWidth sx={{ margin: '5px auto' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">수량</InputLabel>
            <Input
              type='number'
              value={amount}
              onChange={handleChangeTransferAmount}
              endAdornment={<InputAdornment position="end">STX</InputAdornment>}
            />
          </FormControl>
          <FormControl fullWidth sx={{ margin: '5px auto'  }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">받는 주소</InputLabel>
            <Input
              type='text'
              value={recipient}
              onChange={handleChangeRecipient}
            />
          </FormControl>
          <FormControl fullWidth sx={{ margin: '5px auto'  }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">메모</InputLabel>
            <Input
              type='text'
              value={memo}
              onChange={handleChangeMemo}
            />
          </FormControl>
        </Box>
        <Stack direction="row" spacing={2} sx={{justifyContent: 'space-between', alignItems: 'end', margin: '10px auto 30px'}}>
          <Box>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Fees
          </InputLabel>
            <NativeSelect
              defaultValue={fee.label}
              onChange={handleChangeFee}
              inputProps={{
                name: 'Fees',
                id: 'uncontrolled-native',
              }}
            >
              {
                transferFees.map(fee => {
                  return  <option value={fee.label} key={fee.label}>{fee.label}</option>
                })
              }
            </NativeSelect></Box>
          <Box> <Typography>{Number(fee.value)/LAMPORTS_PER_STX} STX</Typography></Box>
        </Stack>
        <Box>
          <Button
            fullWidth
            variant="contained"
            disabled={loadingTransfer}
            onClick={handleClickPreview}
          >
            {
              loadingTransfer &&
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
            보내기
          </Button>
        </Box>
      </Box>
      <Navigation page={Page.TRANSFER}/>
    </>
  )
}
