import React, { useEffect, useState } from 'react'
import './RecentAccounts.css'
import Account from './Account';
import axios from 'axios';
import { useSelector } from 'react-redux'
import getDynamicQuery from '../../utils/getDynamicQuery'
import { useGetAccountsQuery } from '../../redux/hederaApi'
import { useGetLocalAccountsQuery } from '../../redux/serverApi'
const RecentAccounts = () => {
    let acc;
   /*  if (net === 'localnet') {
        accounts = accountLocal.map(
            (elem) => <Account key={elem.transaction_hash} id={elem.transaction_id} type={elem.type}
                // time = {elem.consensus_timestamp}
                result={elem.result} fee={elem.charged_tx_fee}/>
        )
    } else { */
    const state_net = useSelector(state => state.net.net)
    const net = getDynamicQuery(state_net)
    const [account, setAccount] = useState([]); 
    useEffect(() => {
        if(state_net === 'localnet') {
            getAccountLocalList();
        } else {
            getAccountList();
        }
    },[]);
    useEffect(() => {
        if(state_net === 'localnet') {
            getAccountLocalList();
        } else {
            getAccountList();
        }
    },[state_net]);
    
    const getAccountLocalList = async() => {
      await axios.get(`http://localhost:8080/account`)
      .then((res) => {
        console.log(res.data)
        setAccount(res.data.data);
      })
      .catch((e)=> {
        console.log(e);
      });
    }
    const getAccountList = async() => {
        await axios.get(`http://testnet.mirrornode.hedera.com/api/v1/accounts/?order=desc`)
        .then((res) => {
          console.log(res.data.accounts)
          setAccount(res.data.accounts);
        })
        .catch((e)=> {
          console.log(e);
        });
    }
    /* const state_net = useSelector(state => state.net.net)
    const {data: accountsLocal} = useGetLocalAccountsQuery({
        pollingInterval: 20000,
    })
    const {data: accounts} = useGetAccountsQuery(net, {
        pollingInterval: 20000,
    }) */

    acc = account.map(
        (elem) => <Account  
        key={elem.account}
        id={elem.account} 
        balance={elem.balance.balance != 0 ? (elem.balance.balance / Math.pow(10, 8)) : elem.balance.balance}
        keyName={elem.key != null ? (Array.isArray(elem.key) ? elem.key.substr(0,60) : elem.key.key.substr(0,60)) : ''}
        alias={elem.alias}
        evmAddress = {elem.evm_address} 
        />
    )

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
                {acc}
            </tbody>
        </table>
    </div>
</>
    )
}

export default RecentAccounts