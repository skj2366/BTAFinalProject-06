import {Hbar, Mnemonic, TransferTransaction} from "@hashgraph/sdk";
import {getClient} from "../../utill/common";
const logger = require('tracer').console();

export default async function handler(req, res) {
  const {method, body} = req
  logger.info(method)
  if (method === 'POST') {
    const {
      client,
      recipientId,
      myAccountId,
      mnemonic,
      amount,
      memo
    } = body
    const currentClient = getClient(client)
    const createMnemonice = await Mnemonic.fromString(mnemonic);
    const accountPrivateKey = await createMnemonice.toEd25519PrivateKey()

    logger.info(body)

    const transaction = await new TransferTransaction()
      .addHbarTransfer(myAccountId, new Hbar(- 1 * amount))
      .addHbarTransfer(recipientId, new Hbar(amount))
      .setTransactionMemo(memo)
      .freezeWith(currentClient)
      .sign(accountPrivateKey)

    const txResponse = await transaction.execute(currentClient);
    const receipt = await txResponse.getReceipt(currentClient);

    const transactionStatus = receipt.status;
    console.log(transactionStatus)

    if (transactionStatus._code === 22) {
      return res.status(200).json({
        complete : 'ok'
      })
    } else {
      return res.status(423)
    }
  }
}
