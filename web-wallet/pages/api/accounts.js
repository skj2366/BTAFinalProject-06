import {AccountCreateTransaction, Hbar, Mnemonic, TransferTransaction} from "@hashgraph/sdk";
import {getClient, getUrl} from "../../utill/common";
import axios from "axios";
import {getURL} from "next/dist/shared/lib/utils";
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
      .setInitialBalance(new Hbar(1000))
      .execute(currentClient);

    const receipt = await newAccount.getReceipt(currentClient)
    const transactionStatus = receipt.status
    logger.info(transactionStatus)

    if (transactionStatus._code === 22) {
      return res.status(200).json({
        complete : 'ok'
      })
    } else {
      return res.status(423)
    }
  } else if (method === 'GET') {
    const publicKey = req.query.publicKey
    const client = req.query.client

    const option = {
      url: getUrl(client) + `/accounts?${encodeURIComponent(`account.publickey=${publicKey}`)}`,
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTP-8'
      }
    }
    axios(option).then(response => {
      logger.info(response.data)

    }).catch(e => {
      logger.info(e)
      return res.status(424).json({
        result : 'fail'
      })
    })
  }
}
