import React, {useState} from "react";
import {Header} from "../components/header";
import {Avatar, Box} from "@mui/material";
import {InputPassword} from "../components/InputPassword";
import {encryptPassword, storage, storeByEncryptPassword} from "../utill/common";
import {Mnemonic} from "@hashgraph/sdk";
import {StoredKey} from "../utill/enum";
import {useDispatch} from "react-redux";
import {openSnackBar} from "../redux/modules/snackBar";
import {useRouter} from "next/router";
import {Logo} from "../components/logo";
import {CheckMnemonic} from "../components/checkMnemonic";
import {SimpleSnackBar} from "../components/simpleSnackBar";
import {ConfirmMnemonic} from "../components/confirmMnemonic";

export default function CreateAccount (){
  const dispatch = useDispatch();
  const [step, setStep] = useState(0)
  const [mnemonic, setMnemonic] = useState('')
  const router = useRouter()

  const handleGetWalletBtnClick = async (password) => {
    try {
      const encryptPwd = encryptPassword(password)
      await storage.set(StoredKey.PASSWORD, encryptPwd)

      const createMnemonic = await Mnemonic.generate12();
      const mnemonicString = createMnemonic.toString()
      await storeByEncryptPassword(StoredKey.MNEMONIC, mnemonicString, encryptPwd)
      setStep(1)
      setMnemonic(mnemonicString)
    } catch (e) {
      console.log(e)
      dispatch(openSnackBar('error', '문제가 발생했습니다. 잠시 후 다시 생성해주세요.'));
      router.push('/')
    }
  }

  const handleClickNext = nextStep => {
    console.log(nextStep)
    setStep(nextStep)
  }

  return (
    <>
      <SimpleSnackBar/>
      <Header showBackBtn={true}/>
      <Box sx={{textAlign: 'center', padding: '60px 30px 30px'}}>
        <Box sx={{margin: '0 auto 10px'}}>
          <Logo/>
        </Box>
        <Box sx={{margin: '20px auto'}}>
          {
            step === 0 &&
            <InputPassword
              buttonMessage={'지갑생성하기'}
              completeProcess={handleGetWalletBtnClick}
            />
          }
          {
            step === 1 &&
            <CheckMnemonic
              mnemonic = {mnemonic}
              goToNext={() => handleClickNext(2)}
            />
          }
          {
            step === 2 &&
            <ConfirmMnemonic
              mnemonic = {mnemonic}
            />
          }
        </Box>
      </Box>
    </>
  )
}
