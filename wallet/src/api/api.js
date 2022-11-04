import axios from "axios";
import {LAMPORTS_PER_STX, NetworkType} from "../utill/enum";
import {bytesToHex, with0x} from "@stacks/common";
import fetch from 'cross-fetch';
import {connectWebSocketClient} from "@stacks/blockchain-api-client";

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
  async sendMakeStxTransaction(walletAddress) {
    return await axios.post(`${this.baseUrl}/extended/v1/faucets/stx`, {
      address: walletAddress,
      staking: false
    })
  }
  async getAccountStxTransaction(walletAddress) {
    return await axios.get(`${this.baseUrl}/extended/v1/address/${walletAddress}/transactions_with_transfers`)
  }
  async broadcastRawTransaction(
    rawTx,
    attachment
  ) {
    const apiConfig = new Configuration({
      fetchApi: fetch,
      basePath: this.baseUrl
    })
    const transactionApi = new TransactionsApi(apiConfig)

    const options = {
      method: 'POST',
      headers: { 'Content-Type': attachment ? 'application/json' : 'application/octet-stream' },
      body: attachment
        ? JSON.stringify({
          tx: bytesToHex(rawTx),
          attachment: bytesToHex(attachment),
        })
        : rawTx,
    };
    const response = await this.network.fetchFn(this.network.getBroadcastApiUrl(), options);
    if (!response.ok) {
      try {
        return (await response.json())
      } catch (e) {
        throw Error(`Failed to broadcast transaction: ${e.message}`);
      }
    }

    const text = await response.text();
    // Replace extra quotes around txid string
    const txid = text.replace(/["]+/g, '');
    const isValidTxId = validateTxId(txid);
    if (!isValidTxId) {
      throw new Error(text);
    }
    return {
      txid,
    }
  }
  validateTxId(txid){
    if (txid === 'success') return true; // Bypass fetchMock tests
    const value = with0x(txid).toLowerCase();
    if (value.length !== 66) return false;
    return with0x(BigInt(value).toString(16).padStart(64, '0')) === value;
  }
}
