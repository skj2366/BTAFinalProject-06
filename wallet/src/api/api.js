
import {AccountBalanceQuery, AccountId, Client} from "@hashgraph/sdk";
import {ClientTypeName} from "../utill/enum";
import axios from "axios";


export class Api {
  constructor(client) {
    switch (client) {
      case ClientTypeName.LOCAL_NET:
        this.client = Client.forNetwork({"127.0.0.1:50211": new AccountId(3)})
      default: {
        const operatorId = process.env.WALLET_ACCOUNT_ID
        const operatorKey = process.env.WALLET_PRIVATE_KEY
        this.client = Client.forTestnet()
        this.client.setOperator(operatorId, operatorKey)
      }
    }
  }
  async generateAccount () {

  }
  async fetchBalance(accountId) {
    const query = new AccountBalanceQuery()
      .setAccountId(accountId);
    const accountBalance = await query.execute(this.client);
    return accountBalance.hbars.toString()
  }
  async subscribeBalance(walletAddress, updateBalance) {

  }
  async subscribeTransaction(txId) {

  }
  async requestFaucet(walletAddress) {

  }
  async getAccountStxTransaction(walletAddress) {

  }
  async transfer(recipient, senderKey, amount, fee, memo) {

  }

  async getAccount(pubkey) {
    const option = {
      url: process.env.API_URL+'/accounts?account.publicKey='+pubkey,
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTP-8'
      }
    }
    return await axios(option);
  }
}
