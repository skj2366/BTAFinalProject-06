import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, NativeSelect} from "@mui/material";
import {ClientTypeName, StoredKey} from "../utill/enum";
import {useDispatch, useSelector} from "react-redux";
import {removeStorage, storage} from "../utill/common";
import {useRouter} from "next/router";

export const NetworkChangeSelector = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const [client, setClient] = useState('')

  useEffect(() => {
    const storedClient = storage.get(StoredKey.CLIENT)
    console.log(storedClient)
    setClient(storedClient || ClientTypeName.TEST_NET)
  },[])

  const handleChangeNetwork = (e) => {
    const selectClient = e.target.value;
    storage.set(StoredKey.CLIENT, selectClient)
    removeStorage()
    router.push('/')
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
