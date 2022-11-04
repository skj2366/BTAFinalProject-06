import axios from "axios";
import {LAMPORTS_PER_STX, NetworkType} from "../utill/enum";
import {connectWebSocketClient} from "@stacks/blockchain-api-client";
import { makeSTXTokenTransfer, broadcastTransaction, AnchorMode } from '@stacks/transactions';
import {intToBigInt} from "@stacks/common";

export class Api {
  constructor(network) {
    this.network = network
    this.baseUrl = network.coreApiUrl
  }
  explorerUrl() {
    if (this.network === NetworkType.MainNetwork){
      return `https://explorer.stacks.co/?chain=mainnet`
    } else if(this.network === NetworkType.TestNetwork) {
      // 익스플로러 생성 시 익스플로러 주소
      return `http://localhost:8080`
    } else {
      return `https://explorer.stacks.co/?chain=mainnet`
    }
  }
  getSocketUrl() {
    if (this.network.isMainnet()) {
      return `wss://stacks-node-api.mainnet.stacks.co/`
    } else {
      return `wss://stacks-node-api.testnet.stacks.co/`
    }
  }
  async initBalance(address) {
    return await axios.get(`${this.baseUrl}/extended/v1/address/${address}/balances?unanchored=true`)
  }
  async subscribeBalance(walletAddress, updateBalance) {
    const socketUrl = this.getSocketUrl()
    const client = await connectWebSocketClient(socketUrl);
    return await client.subscribeAddressBalanceUpdates(walletAddress, event => {
      console.log(event)
      updateBalance(Number(event.balance) / LAMPORTS_PER_STX)
    })
  }
  async subscribeTransaction(txId) {
    const socketUrl = this.getSocketUrl()
    const client = await connectWebSocketClient(socketUrl);
    return await client.subscribeTxUpdates(txId, event => {
      console.log(event)
    })
  }
  async requestFaucet(walletAddress) {
    return await axios.post(`${this.baseUrl}/extended/v1/faucets/stx`, {
      address: walletAddress,
      staking: false
    })
  }
  async getAccountStxTransaction(walletAddress) {
    return await axios.get(`${this.baseUrl}/extended/v1/address/${walletAddress}/transactions_with_transfers`)
  }
  async transferSTXToken(recipient, senderKey, amount, fee, memo) {
    const txOptions = {
      recipient: recipient,
      amount: intToBigInt(Number(amount) * LAMPORTS_PER_STX, true),
      senderKey: senderKey,
      network: this.network.isMainnet() ? 'mainnet' : 'testnet',
      memo: memo,
      fee: fee, // set a tx fee if you don't want the builder to estimate
      anchorMode: AnchorMode.Any,
    };
    const transaction = await makeSTXTokenTransfer(txOptions);
    console.log(transaction)
    const serializedTx = transaction.serialize().toString('hex');
    console.log(serializedTx)
    const broadcastResponse = await broadcastTransaction(transaction);
    const txId = broadcastResponse.txid;
    console.log(txId)
    return txId
  }
}
