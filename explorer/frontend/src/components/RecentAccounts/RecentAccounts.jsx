import React, { useEffect, useState } from 'react'
import './RecentAccounts.css'
import Account from './Account';
import axios from 'axios';

const RecentAccounts = () => {
   
    let accounts;
   /*  if (net === 'localnet') {
        accounts = accountLocal.map(
            (elem) => <Account key={elem.transaction_hash} id={elem.transaction_id} type={elem.type}
                // time = {elem.consensus_timestamp}
                result={elem.result} fee={elem.charged_tx_fee}/>
        )
    } else { */

    const [account, setAccount] = useState([]); 
    useEffect(() => {
      getAccountList();
    },[]);
    const getAccountList = async() => {
      console.log(`http://localhost:8080/account`)
      await axios.get(`http://localhost:8080/account`)
      .then((res) => {
        console.log(res.data)
        setAccount(res.data.data);
      })
      .catch((e)=> {
        console.log(e);
      });
    }

    accounts = account.map(
        (elem) => <Account key={elem.account} id={elem.account} 
        balance={elem.balance.balance}
        keyName={elem.key}
        alias={elem.alias}
        evmAddress = {elem.evm_address} />
    )
    //}
    return (
        <> < h4 className = 'info_title' > Recent Accounts</h4> < div className = 'recent_transactions page' > <table className="table table-borderless table-hover">
            <thead>
                <tr>
                    <th scope="col">Account ID</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Key</th>
                    <th scope='col'>Alias</th>
                    <th scope='col'>EVM Address</th>
                </tr>
            </thead>
            <tbody>
                {accounts}
            </tbody>
        </table>
    </div>
</>
    )
}

export default RecentAccounts