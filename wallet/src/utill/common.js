import * as crypto from 'crypto-js';
import {ClientTypeName, StoredKey} from "./enum";
import {AccountId, Client} from "@hashgraph/sdk";

export const storage = {
  set: async (key, data) => {
    await chrome.storage.local.set({ [key]: data })
  },
  get: async (key, callback) => {
    await chrome.storage.local.get(key,  callback);
  },
  remove: async (key) => {
    await chrome.storage.local.remove([key])
  }
}

export const encryptPassword = password => {
  return crypto.SHA256(password).toString(crypto.enc.Hex)
}

export const storeByEncryptPassword = async (key, value, encPassword) => {
  try {
    const encryptValue = crypto.AES.encrypt(
      value,
      encPassword,
    ).toString()
    await storage.set(key, encryptValue)
  } catch (e) {
    console.log(e)
  }
}


export const lockWallet = () => {
  chrome.storage.local.set({ lock: true })
}

export const unlockWallet = () => {
  chrome.storage.local.remove('lock')
}

export const decryptKey = async (key, encPassword) => {
  const result = await storage.get(key)
  if (result) {
    const decSecretKey = crypto.AES.decrypt(key, encPassword)
    const originalSecretKey = decSecretKey.toString(crypto.enc.Utf8)
    return originalSecretKey
  }
}

export const getClient = async (client) => {
  switch (client) {
    case ClientTypeName.LOCAL_NET:
      return Client.forNetwork({"127.0.0.1:50211": new AccountId(3)})
    default: {
      const operatorId = process.env.WALLET_ACCOUNT_ID
      const operatorKey = process.env.WALLET_PRIVATE_KEY
      const client = Client.forTestnet()
      client.setOperator(operatorId, operatorKey)
      return client
    }
  }
}

