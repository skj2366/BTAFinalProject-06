import {AccountRecordsQuery, AccountInfoQuery} from "@hashgraph/sdk";
import {getClient} from "../../utill/common";

const logger = require('tracer').console();
export default async function handler(req, res) {
  const {method} = req
  if (method === 'GET') {
    const accountId = req.query.accountId
    const client = req.query.client
    const currentClient = getClient(client)

    const query = await new AccountInfoQuery()
      .setAccountId(accountId)

    const accountRecords = await query.execute(currentClient);

    res.status(200)
      .json({
        test: accountRecords
      })
  }
}
