import {AccountCreateTransaction, Hbar, Mnemonic} from "@hashgraph/sdk";
import {getClient} from "../../utill/common";

const logger = require('tracer').console();

export default async function handler(req, res) {
  const {method, body} = req
  logger.info(req)
  if (method === 'POST') {
    const {
      mnemonic,
      client
    } = body
    const selectedClient = getClient(client)
    const createMnemonice = await Mnemonic.fromString(mnemonic);
    const accountPrivateKey = await createMnemonice.toEd25519PrivateKey()
    const accountPublicKey = accountPrivateKey.publicKey;

    const accountCreateTransaction = await new AccountCreateTransaction()
      .setKey(accountPublicKey)
      .setInitialBalance(Hbar.fromTinybars(1000))
      .execute(selectedClient)

    const receipt = await accountCreateTransaction.getReceipt(selectedClient)

    return res.status(200)
      .json({
        accountId: receipt.accountId.toString(),
        accountPublicKey: accountPrivateKey.toString(),
        accountPrivateKey: accountPrivateKey.toString()
      })
  }
}
