
import {
  AccountBalanceQuery,
  AccountCreateTransaction,
  AccountId,
  Client,
  Hbar,
  Mnemonic, PrivateKey, ScheduleCreateTransaction, ScheduleSignTransaction,
  TransferTransaction
} from "@hashgraph/sdk";
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
  async generateAccount (mnemonic) {
    const createMnemonice = await Mnemonic.fromString(mnemonic);
    const accountPrivateKey = await createMnemonice.toEd25519PrivateKey()
    const accountPublicKey = accountPrivateKey.publicKey;
    const transaction = new AccountCreateTransaction()
      .setKey(accountPublicKey)
    const txResponse = await transaction.execute(this.client)
    const receipt = await txResponse.getReceipt(this.client)
    return {
      accountId : receipt.accountId.toString(),
      accountPublicKey: accountPrivateKey.toString(),
      accountPrivateKey: accountPrivateKey.toString()
    }
  }
  async fetchBalance(accountId) {
    const query = new AccountBalanceQuery()
      .setAccountId(accountId);
    const accountBalance = await query.execute(this.client);
    return accountBalance.hbars.toString()
  }
  async subscribeTransaction(txId) {

  }
  async requestFaucet(walletAddress) {

  }
  async getAccountStxTransaction(walletAddress) {

  }
  async transfer(recipientId, myAccountId, mnemonic, amount, memo) {
    const createMnemonice = await Mnemonic.fromString(mnemonic);
    const accountPrivateKey = await createMnemonice.toEd25519PrivateKey()

    const transaction = await new TransferTransaction()
      .addHbarTransfer(myAccountId, new Hbar(- 1 * amount))
      .addHbarTransfer(recipientId, new Hbar(amount))
      .setTransactionMemo(memo)
      .freezeWith(this.client)
      .sign(accountPrivateKey)

    const txResponse = await transaction.execute(this.client);
    const receipt = await txResponse.getReceipt(this.client);

    const transactionStatus = receipt.status;
    console.log(transactionStatus)
  }
  async scheduleTransfer(recipientId, myAccountId, mnemonic, amount, memo, isoTime) {
    const createMnemonice = await Mnemonic.fromString(mnemonic);
    const accountPrivateKey = await createMnemonice.toEd25519PrivateKey()

    const transactionToSchedule = await new TransferTransaction()
      .addHbarTransfer(myAccountId, new Hbar(- 1 * amount))
      .addHbarTransfer(recipientId, new Hbar(amount))
      .setTransactionMemo(memo)

    const transaction = new ScheduleCreateTransaction()
      .setScheduledTransaction(transactionToSchedule)
      .setScheduleMemo(isoTime)

    const txResponse = await transaction.execute(this.client)
    const receipt = await txResponse.getReceipt(this.client)

    const scheduleId = receipt.scheduleId
    console.log(scheduleId)

    const signTransaction = await new ScheduleSignTransaction()
      .setScheduleId(scheduleId)
      .freezeWith(this.client)
      .sign(accountPrivateKey)

    const signTxResponse = await signTransaction.execute(this.client)
    const signReceipt = await signTxResponse.getReceipt(this.client)
    const transactionStatus = signReceipt.status
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
