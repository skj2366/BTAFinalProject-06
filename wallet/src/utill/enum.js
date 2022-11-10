import {AccountId, Client} from "@hashgraph/sdk";

export const Page = {
  LOGIN: 'login',
  HOME: 'home',
  TRANSFER: 'transfer',
  SETTING: 'setting',
}
export const LAMPORTS_PER_HG = 1000000

export const ClientType = {
  MainNetwork: Client.forMainnet(),
  TestNetwork: Client.forTestnet(),
  localNetwork: Client.forNetwork({"127.0.0.1:50211": new AccountId(3)}),
}

export const ClientTypeName = {
  MAIN_NET: 'mainnet',
  TEST_NET: 'testnet',
  LOCAL_NET: 'localnet'
}

export const StoredKey = {
  MNEMONIC: 'mnemonic',
  PASSWORD: 'password',
  PUBLIC_KEY: 'publicKey',
  ACCOUNT_ID: 'accountId',
  PRIVATE_KEY: 'privateKey',
  CLIENT: 'client'
}
