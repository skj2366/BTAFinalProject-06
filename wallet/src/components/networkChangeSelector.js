import React from "react";
import {FormControl, InputLabel, NativeSelect} from "@mui/material";
import {ClientTypeName, StoredKey} from "../utill/enum";
import {useDispatch, useSelector} from "react-redux";
import {changeClient} from "../redux/client";
import {removeStorage, storage} from "../utill/common";
import {goTo} from "react-chrome-extension-router";
import {Help} from "../pages/Help";

export const NetworkChangeSelector = () => {
  const dispatch = useDispatch();
  const { client } = useSelector(state => state.clientReducer);

  const handleChangeNetwork = async (e) => {
    const selectClient = e.target.value;
    await storage.set(StoredKey.CLIENT, selectClient)
    dispatch(changeClient(selectClient))
    await removeStorage()
    goTo(Help)
  }

  return (
    <FormControl>
      <NativeSelect
        onChange={handleChangeNetwork}
        defaultValue={client}
      >
        <option value={ClientTypeName.TEST_NET}>Testnet</option>
        <option value={ClientTypeName.LOCAL_NET}>Localnet</option>
      </NativeSelect>
    </FormControl>
  )
}
