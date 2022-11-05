import React from "react";
import {Navigation} from "../components/Navigation";
import {Page} from "../utill/enum";
import {goTo} from "react-chrome-extension-router";
import {Login} from "./Login";
import {Button} from "@mui/material";
import {storage} from "../utill/common";
import {Help} from "./Help";
import {Header} from "../components/header";

export const Setting = () => {
  const handleExplainKey = async () => {
    // await storage.set("privateKey", null);
    // await storage.set("password", null);
    // await storage.set("address", null);
    await storage.remove("password");
    await storage.remove("privateKey");
    await storage.remove("address");
    goTo(Help);
  }
  const handleAddNewAccount = async () => {

  }
  return (
    <>
      <Header/>
      setting
      <Button onClick={handleAddNewAccount}>add New Account</Button>
      <Button onClick={handleExplainKey}>키 방출하기</Button>
      <Navigation page={Page.SETTING}/>
    </>
  )
}
