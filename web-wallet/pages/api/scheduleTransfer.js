import {Hbar, Mnemonic, ScheduleCreateTransaction, ScheduleSignTransaction, TransferTransaction} from "@hashgraph/sdk";
import {getClient} from "../../utill/common";

const logger = require('tracer').console();

export default async function handler(req, res) {
  const {method, body} = req
  if (method === 'POST') {
    const {
      client,
      recipientId,
      myAccountId,
      mnemonic,
      amount,
      memo,
      isoTime
    } = body
    const currentClient = getClient(client)
    const createMnemonice = await Mnemonic.fromString(mnemonic);
    const accountPrivateKey = await createMnemonice.toEd25519PrivateKey()

    const transactionToSchedule = await new TransferTransaction()
      .addHbarTransfer(myAccountId, new Hbar(- 1 * amount))
      .addHbarTransfer(recipientId, new Hbar(amount))
      .setTransactionMemo(memo)

    const transaction = new ScheduleCreateTransaction()
      .setScheduledTransaction(transactionToSchedule)
      .setScheduleMemo(isoTime)

    const txResponse = await transaction.execute(currentClient)
    const receipt = await txResponse.getReceipt(currentClient)

    const scheduleId = receipt.scheduleId
    logger.info(scheduleId)

    const signTransaction = await new ScheduleSignTransaction()
      .setScheduleId(scheduleId)
      .freezeWith(currentClient)
      .sign(accountPrivateKey)

    const signTxResponse = await signTransaction.execute(currentClient)
    const signReceipt = await signTxResponse.getReceipt(currentClient)
    const transactionStatus = signReceipt.status
    logger.info(transactionStatus)

    if (transactionStatus._code === 22) {
      return res.status(200).json({
        complete: 'ok',
      })
    } else {
      return res.status(423).json({
        complete: 'fail',
      })
    }
  }
}
