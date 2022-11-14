import React, {useEffect, useState} from "react";
import {FormControl, NativeSelect} from "@mui/material";
import {ClientTypeName, StoredKey} from "../utill/enum";
import {removeStorage, storage} from "../utill/common";
import {useRouter} from "next/router";

export const NetworkChangeSelector = () => {
  const router = useRouter()
  const [client, setClient] = useState('')

  useEffect(() => {
    const storedClient = storage.get(StoredKey.CLIENT)
    console.log(storedClient)
    if (storedClient) {
      setClient(storedClient)
    } else {
      setClient(ClientTypeName.LOCAL_NET)
      storage.set(StoredKey.CLIENT, ClientTypeName.LOCAL_NET)
    }
  },[])

  const handleChangeNetwork = (e) => {
    const selectClient = e.target.value;
    console.log(selectClient)
    setClient(selectClient)
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
        <option value={ClientTypeName.LOCAL_NET}>Localnet</option>
        <option value={ClientTypeName.TEST_NET}>Testnet</option>
      </NativeSelect>
    </FormControl>
  )
}
