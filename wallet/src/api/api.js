import {
  AccountBalanceQuery,
  AccountCreateTransaction,
  AccountId,
  Client,
  Hbar,
  Mnemonic, PublicKey, ScheduleCreateTransaction, ScheduleSignTransaction,
  TransferTransaction
} from "@hashgraph/sdk";
import {ClientTypeName} from "../utill/enum";
import axios from "axios";

export class Api {
  constructor(client) {
    this.client = this.getClient(client)
    this.url = this.getUrl(client)
    console.log(this.url)
  }
  getClient (client)  {
    switch (client) {
      case ClientTypeName.LOCAL_NET:
        const operatorId = process.env.LOCAL_OPERATOR_ID
        const operatorKey = process.env.LOCAL_OPERATOR_KEY
        const node = { "http://127.0.0.1:50211": new AccountId(3) };
        const client = Client.forNetwork(node).setMirrorNetwork("http://127.0.0.1:5600");
        client.setOperator(operatorId, operatorKey)
        return client
      default: {
        const operatorId = process.env.WALLET_ACCOUNT_ID
        const operatorKey = process.env.WALLET_PRIVATE_KEY
        const client = Client.forTestnet()
        client.setOperator(operatorId, operatorKey)
        return client
      }
    }
  }
  getUrl (client) {
    if (client === ClientTypeName.LOCAL_NET)
      return '127.0.0.1:5600'
    else return 'https://testnet.mirrornode.hedera.com/api/v1'
  }
  async generateAccount (mnemonic) {
    const createMnemonice = await Mnemonic.fromString(mnemonic);
    const accountPrivateKey = await createMnemonice.toEd25519PrivateKey()
    const accountPublicKey = accountPrivateKey.publicKey;

    const accountCreateTransaction = await new AccountCreateTransaction()
      .setKey(accountPublicKey)
      .setInitialBalance(Hbar.fromTinybars(1000))
      .execute(this.client)

    const receipt = await accountCreateTransaction.getReceipt(this.client)
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
  async requestFaucet(walletAddress) {

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
    if (transactionStatus !== 22)
      throw '전송 실패'
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
    if (transactionStatus !== 22)
      throw '예약 트랜잭션 생성 실패'
  }

  async getAccount(publicKey) {
    const option = {
      url: this.url + `/accounts?account.publicKey=${publicKey}`,
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTP-8'
      }
    }
    return await axios(option);
  }

  async getTransactions(currentAccountId) {
    const option = {
      url: this.url + `/transactions`,
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTP-8'
      },
      data: {
        queryParams: {
          account: {
            id: currentAccountId,
          },
          transactionType: 'CRYPTOTRANSFER',
        }
      }
    }
    return await axios(option)
  }

  async addAccount (mnemonic) {
    const createMnemonice = await Mnemonic.fromString(mnemonic);
    const accountPrivateKey = await createMnemonice.toEd25519PrivateKey()

    const newAccount  = await new AccountCreateTransaction()
      .setKey(accountPrivateKey.publicKey)
      .setInitialBalance(Hbar.fromTinybars(1000))
      .execute(this.client);

    const receipt = await newAccount.getReceipt(this.client)
    const transactionStatus = receipt.status
    console.log(transactionStatus)
  }
}
