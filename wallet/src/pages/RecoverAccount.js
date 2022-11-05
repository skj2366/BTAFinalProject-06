import React, {useState} from "react";
import {Header} from "../components/header";
import {Avatar, Box, Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {cloneDeep} from "@stacks/transactions";
import {restoreWalletAccounts} from '@stacks/wallet-sdk';
import {openSnackBar} from "../redux/snackBar";

export const RecoverAccount = () => {
  const INPUT_COUNT = 12;
  const MAX_INPUT_COUNT_PER_LINE = 4;
  const { network } = useSelector(state => state.networkReducer);
  const [mnemonic, setMnemonic] = useState([]);
  const dispatch = useDispatch();
  const [currentFocusedInputInfo, setCurrentFocusedInputInfo] = useState([0, 0]);
  const [inputLines, setInputLines] = useState(
    Array.from(
      {length: Math.ceil(INPUT_COUNT / MAX_INPUT_COUNT_PER_LINE)},
      () =>  Array.from({length: MAX_INPUT_COUNT_PER_LINE}, () => '')
    )
  );
  const validateMnemonic = () => {
    const isSomeInputEmpty = inputLines.some(inputLine => inputLine.some(value => !value));
    if (isSomeInputEmpty) {
      dispatch(openSnackBar('error', '복구 구문을 정확히 입력해주세요.'));
      return false;
    }
    return true;
  }

  const getMnemonicValue = () => {
    const mnemonicInputValue = inputLines.reduce((acc, curr) => {
      acc = acc + ' ' + curr.map(value => value).join(' ')
      return acc;
    }, '').slice(1);
    console.log(mnemonicInputValue);
    return mnemonicInputValue;
  }

  const handleMnemonicInputFocus = (lineOrder, inputOrder) => {
    setCurrentFocusedInputInfo([lineOrder, inputOrder]);
  }
  const handleMnemonicInputChange = (e,  lineOrder,  inputOrder) => {
    const newInputLines = cloneDeep(inputLines);
    const value = e.currentTarget.value;
    newInputLines[lineOrder][inputOrder] = value;
    setInputLines(prev => newInputLines)
  }

  const isCurrentFocusedInput = (lineOrder, inputOrder) => {
    const [currentLineOrder, currentInputOrder] = currentFocusedInputInfo;
    if (currentLineOrder === lineOrder && currentInputOrder === inputOrder) {
      return true;
    }
    return false;
  }

  const handleGetWalletBtnClick = async () => {
    if (!validateMnemonic()) return;
    console.log('1');
    chrome.storage.local.get(['wallet'], async (res) => {
      console.log(JSON.parse(res.wallet));
      const restoredWallet = await restoreWalletAccounts({
        // `baseWallet` is returned from `generateWallet`
        wallet: JSON.parse(res.wallet),
        gaiaHubUrl: 'https://hub.blockstack.org',
        network: network,
      });
      console.log(restoredWallet)
    })
    // const restoredWallet = await restoreWalletAccounts({
    //   // `baseWallet` is returned from `generateWallet`
    //   wallet: 'ST694GTT70W411X0T6PGN15AJKRTT9YAG5W898MM',
    //   gaiaHubUrl: 'https://hub.blockstack.org',
    //   network: network,
    // });
    const mnemonicValue = getMnemonicValue();
    console.log(mnemonicValue);
    try {
      console.log('지갑 가져오기');
    } catch (e) {
      dispatch(openSnackBar('error', '정확한 복구 구문을 입력해주세요.'));
      console.error(e);
    }

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
            비밀 복구 구문으로 계정 가져오기
          </Typography>
        </Box>
        <Box>
          {
            inputLines.map((inputLine, lineOrder) =>
              <p key={lineOrder}>
                {
                  inputLine.map((value, inputOrder) =>
                    <input
                      key={inputOrder}
                      value={value}
                      onChange={(e) => handleMnemonicInputChange(e, lineOrder, inputOrder)}
                      onFocus={() => handleMnemonicInputFocus(lineOrder, inputOrder)}
                      type={isCurrentFocusedInput(lineOrder, inputOrder) ? undefined : 'password'}
                    />
                  )
                }
              </p>
            )
          }
          {/*<FormControl sx={{ margin: '5px auto', width:'40px'  }} variant="filled">*/}
          {/*  <Input*/}
          {/*    type='text'*/}
          {/*    value={mnemonic}*/}
          {/*  />*/}
          {/*  <Input*/}
          {/*    type='text'*/}
          {/*    value={mnemonic}*/}
          {/*  />*/}
          {/*  <Input*/}
          {/*    type='text'*/}
          {/*    value={mnemonic}*/}
          {/*  />*/}
          {/*  <Input*/}
          {/*    type='text'*/}
          {/*    value={mnemonic}*/}
          {/*  />*/}
          {/*</FormControl>*/}
        </Box>
        <Button onClick={handleGetWalletBtnClick}>지갑 가져오기</Button>
      </Box>

      {/*<Navigation page={Page.HOME}/>*/}
    </>
  )
}
