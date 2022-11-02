import React from "react";
import {Navigation} from "../components/Navigation";
import {Page} from "../utill/enum";

export const Home = () => {
  return (
    <>
      홈
      <Navigation page={Page.HOME}/>
    </>
  )
}
