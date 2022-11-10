import React, {useState} from "react";
import {Header} from "../components/header";
import {Avatar, Box, Button, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {openSnackBar} from "../redux/snackBar";
import {WalletButton} from "../components/walletButton";
import {FormInput} from "../components/formInput";
import {Mnemonic} from "@hashgraph/sdk";
import {encryptPassword, storage, storeByEncryptPassword} from "../utill/common";
import {StoredKey} from "../utill/enum";
import {goTo} from "react-chrome-extension-router";
import {Home} from "./Home";
import {InputPassword} from "../components/InputPassword";

export const RecoverAccount = () => {
  const MNEMONIC_ARRAY_LENGTH = 12
  const [step, setStep] = useState(1)
  const [inputs, setInputs] = useState(
    Array.from({length: MNEMONIC_ARRAY_LENGTH}, () =>  '')
  )
  // reducx에 값을 변경할 때 사용
  const dispatch = useDispatch();

  const handleChangeMnemonic = (value, index) => {
    const newTypedMnemonic = [...inputs]
    newTypedMnemonic[index] = value
    setInputs(newTypedMnemonic)
  }

  const validateMnemonic = () => {
    console.log(inputs)
    const checkMnemonic = inputs.every(input => input.length > 0)
    console.log(checkMnemonic)
    if (!checkMnemonic) {
      dispatch(openSnackBar('error', '복구 구문을 정확히 입력해주세요.'));
      return false;
    }
    return true;
  }

  const completeMnemonic = () => {
    if (!validateMnemonic()) return;
    setStep(2)
  }

  const handleGetWalletBtnClick = async (password) => {
    console.log(password)
    try {
      const recoveredMnemonic = await Mnemonic.fromString(inputs.toString());
      const privateKey = await recoveredMnemonic.toEd25519PrivateKey();
      const accountPublicKey = privateKey.publicKey;

      const encryptPwd = encryptPassword(password)
      await storage.set(StoredKey.PUBLIC_KEY, accountPublicKey.toString())
      await storeByEncryptPassword(StoredKey.PRIVATE_KEY, privateKey.toString(), encryptPwd)
      goTo(Home)

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
        {
          step === 1 &&
          <Box>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 2, sm: 2, md: 3 }}
              sx={{marginTop: "10px", marginBottom: "10px"}}
            >
              {inputs.map((inputLine, index) => (
                <Grid
                  item
                  xs={6}
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
          <Box>
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
