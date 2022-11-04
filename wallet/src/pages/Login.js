import React, {useEffect} from "react";
import {
  goTo
} from "react-chrome-extension-router";
import {Button} from "@mui/material";
import {Home} from "./Home";
import {RecoverAccount} from "./RecoverAccount";
import {useDispatch} from "react-redux";
import {storage} from "../utill/common";
import {changeNetwork} from "../redux/network";
import {NetworkType} from "../utill/enum";

export const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function setNetwork () {
      const storedNetwork = await storage.get('network')
      const currentNetwork = storedNetwork || NetworkType.TestNetwork
      dispatch(changeNetwork(currentNetwork))
    }
    setNetwork()
  }, [])

  const handleClickLogin = () => {
    goTo(Home)
  }

  const handleClickRecoverAccount = () => {
    goTo(RecoverAccount)
  }

  return (
    <>
      로그인 페이지
      <Button onClick={handleClickLogin}>임시 홈으로 이동 버튼</Button>
      <Button onClick={handleClickRecoverAccount}>임시 계정복구로 이동</Button>
    </>
  )
}
