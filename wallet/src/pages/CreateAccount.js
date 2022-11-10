import React, {useState} from "react";
import {goTo} from "react-chrome-extension-router";
import {Header} from "../components/header";
import {Avatar, Box, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {InputPassword} from "../components/InputPassword";
import {CheckMnemonic} from "./CheckMnemonic";
import {encryptPassword, storage, storeByEncryptPassword} from "../utill/common";
import {Mnemonic} from "@hashgraph/sdk";
import {StoredKey} from "../utill/enum";
import {useDispatch} from "react-redux";
import {openSnackBar} from "../redux/snackBar";
import {Help} from "./Help";

export const CreateAccount = () => {
  const dispatch = useDispatch();

  const handleGetWalletBtnClick = async (password) => {
    try {
      const encryptPwd = encryptPassword(password)
      await storage.set(StoredKey.PASSWORD, encryptPwd)

      const createMnemonic = await Mnemonic.generate12();
      const mnemonicString = createMnemonic.toString()
      await storeByEncryptPassword(StoredKey.MNEMONIC, mnemonicString, encryptPwd)

      goTo(CheckMnemonic, {mnemonic: mnemonicString});
    } catch (e) {
      console.log(e)
      dispatch(openSnackBar('error', '문제가 발생했습니다. 잠시 후 다시 생성해주세요.'));
      goTo(Help)
    }
  }

  return (
    <>
      <Header/>
      <Box sx={{textAlign: 'center', padding: '60px 30px 30px'}}>
        <Box sx={{margin: '0 auto 10px'}}>
          <Avatar
            src="../img/LOGO.png"
            sx={{ width: 60, height: 60, margin: '0 auto'}}
          />
        </Box>
        <Box sx={{margin: '20px auto'}}>
          <InputPassword
            buttonMessage={'지갑생성하기'}
            completeProcess={handleGetWalletBtnClick}
          />
        </Box>
      </Box>
    </>
  )
}
