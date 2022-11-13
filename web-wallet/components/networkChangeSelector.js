import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, NativeSelect} from "@mui/material";
import {ClientTypeName, StoredKey} from "../utill/enum";
import {useDispatch, useSelector} from "react-redux";
import {removeStorage, storage} from "../utill/common";
import {useRouter} from "next/router";

export const NetworkChangeSelector = () => {
  const router = useRouter()
  const [client, setClient] = useState('')

  useEffect(() => {
    const storedClient = storage.get(StoredKey.CLIENT)
    if (storedClient) {
      setClient(storedClient)
    } else {
      setClient(ClientTypeName.TEST_NET)
      storage.set(StoredKey.CLIENT, ClientTypeName.TEST_NET)
    }
  },[])

  const handleChangeNetwork = (e) => {
    const selectClient = e.target.value;
    console.log(selectClient)
    storage.set(StoredKey.CLIENT, selectClient)
    removeStorage()
    router.push('/')
  }

  return (
    <FormControl>
      <NativeSelect
        onChange={handleChangeNetwork}
        value={client}
      >
        <option value={ClientTypeName.TEST_NET}>Testnet</option>
        <option value={ClientTypeName.LOCAL_NET}>Localnet</option>
      </NativeSelect>
    </FormControl>
  )
}
