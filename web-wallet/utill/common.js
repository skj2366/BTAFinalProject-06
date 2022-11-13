import * as crypto from 'crypto-js';
import {ClientTypeName, StoredKey} from "./enum";
import {AccountId, Client} from "@hashgraph/sdk";

export const storage = {
  set: (key, data) => {
    localStorage.setItem(key,data)
  },
  get: (key) => {
    return localStorage.getItem(key)
  },
  remove: async (key) => {
    localStorage.removeItem(key)
  }
}

export const encryptPassword = password => {
  return crypto.SHA256(password).toString(crypto.enc.Hex)
}

export const storeByEncryptPassword = (key, value, encPassword) => {
  try {
    const encryptValue = crypto.AES.encrypt(
      value,
      encPassword,
    ).toString()
    storage.set(key, encryptValue)
  } catch (e) {
    console.log(e)
  }
}

export const decryptByEncryptPassword = (value, encryptPassword) => {
  const decSecretKey = crypto.AES.decrypt(value, encryptPassword)
  return decSecretKey.toString(crypto.enc.Utf8)
}

export const removeStorage = () => {
  localStorage.removeItem(StoredKey.PASSWORD);
  localStorage.removeItem(StoredKey.PRIVATE_KEY);
  localStorage.removeItem(StoredKey.PUBLIC_KEY);
  localStorage.removeItem(StoredKey.ACCOUNT_ID);
  localStorage.removeItem(StoredKey.MNEMONIC);
}

export const convertToDate = (timestamp) => {
  const ts = new Date(Number(timestamp) * 1000)
  return ts.toLocaleString()
}

export const getClient = (client) => {
  switch (client) {
    case ClientTypeName.LOCAL_NET:
      const operatorId = process.env.NEXT_PUBLIC_LOCAL_OPERATOR_ID
      const operatorKey = process.env.NEXT_PUBLIC_LOCAL_OPERATOR_KEY
      const node = { "127.0.0.1:50211": new AccountId(3) };
      const client = Client.forNetwork(node).setMirrorNetwork("127.0.0.1:5600");
      client.setOperator(operatorId, operatorKey)
      return client
    default: {
      const operatorId = process.env.NEXT_PUBLIC_WALLET_ACCOUNT_ID
      const operatorKey = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY
      const client = Client.forTestnet()
      client.setOperator(operatorId, operatorKey)
      return client
    }
  }
}
