import React, {useEffect, useState} from "react";
import {goTo} from "react-chrome-extension-router";
import {Avatar, Box, Button, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {generateWallet, getStxAddress} from '@stacks/wallet-sdk';
import {Home} from "./Home";
import {useDispatch} from "react-redux";
import {openSnackBar} from "../redux/snackBar";
import saltedSha256 from "salted-sha256";
import {storage} from '../utill/common';
import {Header} from "../components/header";

export const ConfirmMnemonic = ({params}) => {
  const dispatch = useDispatch();
  const [originalWords, setOriginalWords] = useState([]);
  const [randomWords, setRandomWords] = useState([]);
  const [formats, setFormats] = useState([]);

  useEffect(() => {
    let paramList = params.split(" ");
    setOriginalWords(paramList);
    let wordList = [];
    for (let i = 0; i < paramList.length; i++) {
      wordList.push({ word: paramList[i], toggle: false });
    }
    setRandomWords([...wordList].sort(() => Math.random() - 0.5));
  }, []);
  const goToNext = () => {
    goTo(Home);
  }

  const compareMnemonic = function (a, b) {
    if (JSON.stringify(a) == JSON.stringify(b)) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmitMnemonic = () => {
    // console.log("formats", formats);
    // console.log("originalWords", originalWords);
    const resultCompare = compareMnemonic(formats, originalWords);
    if (resultCompare) {
      chrome.storage.local.get(["password"], function (result) {
        // console.log(JSON.parse(result.password));
        generateWallet({
          secretKey: params,
          password: result.password,
        }).then(async (res) => {
          // 비밀키 => res.stxPrivateKey;
          const saltedHashAsync = await saltedSha256(
            res.accounts[0].stxPrivateKey,
            result.password,
            true
          );
          // console.log("saltedHashAsync", saltedHashAsync);
          const address = getStxAddress({ account: res.accounts[0] });
          // console.log(address);
          await storage.set("privateKey", saltedHashAsync);
          await storage.set("address", address);
          await storage.set("wallet", res);

          goToNext();
        });
      });
    } else {
      dispatch(openSnackBar('error', '복구 구문을 다시 확인해주세요.'));
      return false;
    }
  }

  const handleFormat = (event, newFormats) => {
    if (newFormats.length) {
      setFormats(newFormats);
    } else {
      setFormats([]);
    }
  };

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
          boxSizing: 'border-box'
        }}>
          {formats.map((item, index) => {
            return (
              <Box sx={{paddingLeft: '4px'}} key={index}>{item}</Box>
            )
          })}
        </Box>
      </Box>
      {/*<Box sx={{ width: '360px', margin: '10px auto', whiteSpace: 'pre-wrap', textAlign: 'center'}}>*/}
      <ToggleButtonGroup
        value={formats} onChange={handleFormat} aria-label="mnemonic"
        sx={{
          margin: '10px auto',
          width: '360px',
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '20px',
          textAlign: 'center'
      }}>
        {
          randomWords?.map((value, index) => {
            return (
              <ToggleButton size='small' color='primary' sx={{
                margin: '10px auto',
                padding: '10px',
                width: '90px'
              }} key={index} value={value.word}>
                <Typography>{value.word}</Typography>
              </ToggleButton>
            );
          })
        }
      </ToggleButtonGroup>
      {/*</Box>*/}
      <Box sx={{textAlign: 'center', padding: '30px'}}>
        <Button
          fullWidth
          variant="contained"
          onClick={onSubmitMnemonic}
        >
          다음
        </Button>
      </Box>
    </>
  )
};
