import React, {useState} from "react";
import {Header} from "../components/header";
import {Avatar, Box, Button, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {openSnackBar} from "../redux/modules/snackBar";
import {WalletButton} from "../components/walletButton";
import {FormInput} from "../components/formInput";
import {Mnemonic} from "@hashgraph/sdk";
import {encryptPassword, storage, storeByEncryptPassword} from "../utill/common";
import {StoredKey} from "../utill/enum";
import {InputPassword} from "../components/InputPassword";
import {Api} from "../api/api";
import {changeAccount} from "../redux/modules/accountInfo";
import {useRouter} from "next/router";
import {Logo} from "../components/logo";

export default function RecoverAccount () {
  const MNEMONIC_ARRAY_LENGTH = 12
  const [step, setStep] = useState(1)
  const [inputs, setInputs] = useState(
    Array.from({length: MNEMONIC_ARRAY_LENGTH}, () =>  '')
  )
  const [recoverMnem, setRecoverMnem] = useState({});
  // reducx에 값을 변경할 때 사용
  const dispatch = useDispatch();
  const router = useRouter()

  const handleChangeMnemonic = (value, index) => {
    const newTypedMnemonic = [...inputs]
    newTypedMnemonic[index] = value
    setInputs(newTypedMnemonic)
  }

  const validateMnemonic = async () => {
    console.log(inputs)
    const checkMnemonic = inputs.every(input => input.length > 0)
    console.log(checkMnemonic)
    if (!checkMnemonic) {
      dispatch(openSnackBar('error', '복구 구문을 정확히 입력해주세요.'));
      return false;
    }
    return true;
  }

  const completeMnemonic = async () => {
    let flag = false;
    if (!await validateMnemonic()) return;
    try {
      const recoveredMnemonic = await Mnemonic.fromString(inputs.toString());
      setRecoverMnem(recoveredMnemonic);
      flag = true;
    } catch (e) {
      dispatch(openSnackBar('error', '정확한 복구 구문을 입력해주세요.'));
      console.error(e);
    }
    if (flag) setStep(2)
  }

  const handleGetWalletBtnClick = async (password) => {
    console.log(password)
    try {
      const recoveredMnemonic = recoverMnem;
      const privateKey = await recoveredMnemonic.toEd25519PrivateKey();
      const accountPublicKey = privateKey.publicKey;

      const encryptPwd = encryptPassword(password)
      const client = storage.get(StoredKey.CLIENT)

      const api = new Api(client)
      let axiosData = await api.getAccount(accountPublicKey.toString());
      const recoverAccountIds = axiosData.data.accounts;
      const recoverAccountId = recoverAccountIds[0].account;

      await storage.set(StoredKey.PASSWORD, encryptPwd)
      await storage.set(StoredKey.ACCOUNT_ID, recoverAccountIds[0].account);
      await storage.set(StoredKey.PUBLIC_KEY, accountPublicKey.toString())
      await storeByEncryptPassword(StoredKey.MNEMONIC, recoveredMnemonic.toString(), encryptPwd)
      await storeByEncryptPassword(StoredKey.PRIVATE_KEY, privateKey.toString(), encryptPwd)
      dispatch(changeAccount(recoverAccountId));
      router.push('/home')

    } catch (e) {
      dispatch(openSnackBar('error', '정확한 복구 구문을 입력해주세요.'));
      console.error(e);
    }

  }

  return (
    <>
      <Header showBackBtn={true}/>
      <Box sx={{textAlign: 'center', padding: '30px'}}>
        <Box sx={{margin: '0 auto 10px'}}>
          <Logo/>
        </Box>
        <Box sx={{margin: '20px auto'}}>
          <Typography variant={'h6'} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            비밀 복구 구문으로 계정 가져오기
          </Typography>
        </Box>
        {
          step === 1 &&
          <Box sx={{maxWidth: '725px', margin: '0 auto'}}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 2, sm: 3, md: 3 }}
              sx={{margin: "10px auto", marginBottom: "10px", justifyContent: 'space-around'}}
            >
              {inputs.map((inputLine, index) => (
                <Grid
                  item
                  key={index}
                  sx={{cursor: 'pointer'}}
                >
                  <FormInput
                    onChange={ e => {
                      handleChangeMnemonic(e.target.value, index)
                    }}
                    label={index + 1}
                  />
                </Grid>
              ))}
            </Grid>
            <WalletButton
              fullWidth
              onClick={completeMnemonic}>다음으로</WalletButton>
          </Box>
        }
        {
          step === 2 &&
          <Box sx={{maxWidth: '725px', margin: '0 auto'}}>
            <InputPassword
              buttonMessage={'지갑 가져오기'}
              completeProcess={handleGetWalletBtnClick}
            />
          </Box>
        }
      </Box>
    </>
  )
}
