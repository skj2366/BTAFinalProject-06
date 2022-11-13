import {Header} from "./header";
import {Box, Grid, Typography} from "@mui/material";
import {Logo} from "./logo";
import {WalletButton} from "./walletButton";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {storage, storeByEncryptPassword} from "../utill/common";
import {StoredKey} from "../utill/enum";
import {changeAccount} from "../redux/modules/accountInfo";
import {Home} from "../pages/home";
import {openSnackBar} from "../redux/modules/snackBar";
import {Api} from "../api/api";
import {useRouter} from "next/router";
import axios from "axios";

export const ConfirmMnemonic = (props) => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { client } = useSelector(state => state.clientReducer);
  const [originalWords, setOriginalWords] = useState([]);
  const [randomWords, setRandomWords] = useState([]);
  const [formats, setFormats] = useState([]);
  const {mnemonic} = props

  useEffect(() => {
    const mnemonicArray = mnemonic.split(" ");
    const toggleArray = mnemonicArray.map(word => {
      return {
        word: word,
        toggle: false
      }
    })
    setOriginalWords(mnemonicArray)
    setRandomWords(toggleArray.sort(() => Math.random() - 0.5));
  }, []);

  const compareMnemonic = function (a, b) {
    if (JSON.stringify(a) == JSON.stringify(b)) {
      return true;
    } else {
      return false;
    }
  };

  const handleClickReset = () => {
    setFormats([])
    setRandomWords(randomWords.map(word => {
      word.toggle = false
      return word
    }))
  }

  const onSubmitMnemonic = async () => {
    const resultCompare = compareMnemonic(formats, originalWords);
    if (resultCompare) {
      const encPassword = storage.get(StoredKey.PASSWORD)
      await axios.post("/api/account", {
        mnemonic: mnemonic
      }).then(response => {
        const {accountId, accountPublicKey, accountPrivateKey} = response.data
        storage.set(StoredKey.ACCOUNT_ID, accountId)
        storage.set(StoredKey.PUBLIC_KEY, accountPublicKey)
        storeByEncryptPassword(StoredKey.PRIVATE_KEY, accountPrivateKey, encPassword)
        dispatch(changeAccount(accountId))
        router.push('/home')
      })
    } else {
      dispatch(openSnackBar('error', '복구 구문을 다시 확인해주세요.'));
      return false;
    }
  }

  const handleClickMnemonic = (value) => {
    if (!value.toggle) {
      setRandomWords(randomWords.map(word => {
        if(word.word === value.word) {
          word.toggle = true
        }
        return word
      }))
      setFormats(formats.concat(value.word))
    }
  }

  return (
    <>
        <Box sx={{margin: '20px auto'}}>
          <Typography variant={'h6'} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            복구 구문을 확인합니다.
            <br/>
            복구 구문을 순서대로 눌러주세요.
          </Typography>
        </Box>
        <Box sx={{
          textAlign: 'center',
          border: '1px solid #a5a5a5',
          borderRadius: '10px',
          height: '80px',
          width: '80%',
          display: 'flex',
          flexWrap: 'wrap',
          padding: '10px',
          margin: '0 auto'
        }}>
          {formats.map((item, index) => {
            return (
              <Box sx={{paddingLeft: '4px'}} key={index}>{item}</Box>
            )
          })}
        </Box>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 2, sm: 2, md: 3 }}
          sx={{marginTop: "10px", marginBottom: "10px"}}
        >
          {randomWords.map((value, index) => (
            <Grid
              item
              xs={4}
              key={index}
              sx={{cursor: 'pointer'}}
            >
              <Box
                onClick={() => handleClickMnemonic(value)}
                sx={{
                  backgroundColor: !value.toggle? '#000' : '#fff',
                  color: !value.toggle? '#fff' : '#666',
                  textAlign: 'center',
                  padding: '10px',
                  borderRadius: '5px',}}
              >
                {value.word}
              </Box>
            </Grid>
          ))}
        </Grid>
        <WalletButton
          fullWidth
          onClick={onSubmitMnemonic}
        >
          다음
        </WalletButton>
        <Box sx={{marginTop: '10px'}}>

        </Box>
        <WalletButton
          fullWidth
          onClick={handleClickReset}
        >
          다시하기
        </WalletButton>
    </>
  )
}
