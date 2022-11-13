import {ClientTypeName} from "../utill/enum";
import axios from "axios";
import {getClient} from "../utill/common";

export class Api {
  constructor(client) {
    this.client = getClient(client)
    this.url = this.getUrl(client)
    console.log(this.url)
  }
  getUrl (client) {
    if (client === ClientTypeName.LOCAL_NET)
      return 'http://localhost:5511/api/v1'
    else return 'https://testnet.mirrornode.hedera.com/api/v1'
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
}
