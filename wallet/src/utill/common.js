import * as crypto from 'crypto-js';
import {StoredKey} from "./enum";

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

export const decryptByEncryptPassword = (value, encryptPassword) => {
  const decSecretKey = crypto.AES.decrypt(value, encryptPassword)
  return decSecretKey.toString(crypto.enc.Utf8)
}

export const removeStorage = async () => {
  await storage.remove(StoredKey.PASSWORD);
  await storage.remove(StoredKey.PRIVATE_KEY);
  await storage.remove(StoredKey.PUBLIC_KEY);
  await storage.remove(StoredKey.ACCOUNT_ID);
  await storage.remove(StoredKey.MNEMONIC);
}

export const convertToDate = (timestamp) => {
  const ts = new Date(Number(timestamp) * 1000)
  return ts.toLocaleString()
}

