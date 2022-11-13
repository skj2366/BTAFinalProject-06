import {getUrl} from "../../utill/common";
import axios from "axios";

const logger = require('tracer').console();
export default function handler(req, res) {
  const {method} = req
  if (method === 'GET') {
    const accountId = req.query.accountId
    const client = req.query.client

    axios.get( getUrl(client) + `/transactions?account.id=${accountId}`)
      .then(response => {
        logger.info(response.data.transactions)
        return res.status(200)
          .json({
            transactions: response.data.transactions,
          })
    }).catch(e => {
      logger.info(e)
      return res.status(423).json({
        result : 'fail'
      })
    })
  }
}
