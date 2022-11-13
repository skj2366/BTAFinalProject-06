import {AccountCreateTransaction, Hbar, Mnemonic, TransferTransaction} from "@hashgraph/sdk";
import {getClient} from "../../utill/common";
const logger = require('tracer').console();

export default async function handler(req, res) {
  const {method, body} = req
  if (method === 'POST') {
    const {
      mnemonic,
      client
    } = body
    const currentClient = getClient(client)
    const createMnemonice = await Mnemonic.fromString(mnemonic);
    const accountPrivateKey = await createMnemonice.toEd25519PrivateKey()

    const newAccount  = await new AccountCreateTransaction()
      .setKey(accountPrivateKey.publicKey)
      .setInitialBalance(Hbar.fromTinybars(1000))
      .execute(currentClient);

    const receipt = await newAccount.getReceipt(currentClient)
    const transactionStatus = receipt.status
    logger.info(transactionStatus)
    return res.status(200).json({
      result: 'ok'
    })
  }
}
