import React, {useEffect, useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {openSnackBar} from "../redux/snackBar";
import {Header} from "../components/header";
import {WalletButton} from "../components/walletButton";
import {Logo} from "../components/logo";
import {getClient, storage, storeByEncryptPassword} from "../utill/common";
import {AccountCreateTransaction, Client, Hbar, Mnemonic} from "@hashgraph/sdk";
import {StoredKey} from "../utill/enum";
import {goTo} from "react-chrome-extension-router";
import {Home} from "./Home";
import {changeAccount} from "../redux/accountInfo";

export const ConfirmMnemonic = (props) => {
  const dispatch = useDispatch();
  const { client } = useSelector(state => state.clientReducer);
  const [originalWords, setOriginalWords] = useState([]);
  const [randomWords, setRandomWords] = useState([]);
  const [formats, setFormats] = useState([]);
  const {mnemonic} = props

  console.log(client)

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

  //pistol bleak chronic machine biology unlock shed scissors chief cushion half top
  const onSubmitMnemonic = async () => {
    const resultCompare = compareMnemonic(formats, originalWords);
    if (resultCompare) {
      let encPassword = ''
      await storage.get(StoredKey.PASSWORD, async (result) => {
        encPassword = result.password
      })

      const createMnemonice = await Mnemonic.fromString(mnemonic);
      const accountPrivateKey = await createMnemonice.toEd25519PrivateKey()
      const accountPublicKey = accountPrivateKey.publicKey;

      const operatorId = process.env.WALLET_ACCOUNT_ID
      const operatorKey = process.env.WALLET_PRIVATE_KEY
      const currentClient = Client.forTestnet()
      currentClient.setOperator(operatorId, operatorKey);

      const transaction = new AccountCreateTransaction()
        .setKey(accountPublicKey)
        .setInitialBalance(new Hbar(1000))

      const txResponse = await transaction.execute(currentClient)
      const receipt = await txResponse.getReceipt(currentClient)
      const newAccountId = receipt.accountId.toString();

      await storage.set(StoredKey.ACCOUNT_ID, newAccountId)
      await storage.set(StoredKey.PUBLIC_KEY, accountPublicKey.toString())
      await storeByEncryptPassword(StoredKey.PRIVATE_KEY, accountPrivateKey.toString(), encPassword)
      dispatch(changeAccount(newAccountId))
      goTo(Home)
    } else {
      dispatch(openSnackBar('error', '복구 구문을 다시 확인해주세요.'));
      return false;
    }
  }

  const handleClickMnemonic = (value) => {
    if (!formats.includes(value.word)) {
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
      <Header/>
      <Box sx={{textAlign: 'center', padding: '30px'}}>
        <Logo/>
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
          width: '286px',
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
      </Box>
    </>
  )
};
