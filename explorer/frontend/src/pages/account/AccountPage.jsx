import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import InfoRow from '../../components/InfoRow/InfoRow'
import Loader from '../../components/loader/Loader'
import ErrorBlock from '../../components/ErrorBlock/ErrorBlock'
import { useGetAccountQuery, useGetTransactionForAccIDQuery } from '../../redux/hederaApi'
import { useSelector } from 'react-redux'
import { LOCALNET_API_URL, MAINNET_API_URL, TESTNET_API_URL } from '../../config'
import TokenList from '../../components/TokensList/TokenList'
import Transaction from '../../components/RecentTransactions/Transaction';
import axios from 'axios';

const AccountPage = () => {
    const chooseNet = useSelector(state => state.net.net)
    const net = chooseNet === 'localnet' ? LOCALNET_API_URL : TESTNET_API_URL
    const {acc} = useParams()

    const [TX, setTX] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        if(chooseNet === 'localnet') {
          getTXLocalList();
          getAccountLocalList();
        } else {
          getTXList();
          getAccountList();
        }
    },[chooseNet]);
    useEffect(() => {
        if(chooseNet === 'localnet') {
          getTXLocalList();
          getAccountLocalList();
        } else {
          getTXList();
          getAccountList();
        }
    },[]);
    //const {trans} = useGetTransactionForAccIDQuery({net, acc})
    console.log(net)
    console.log(acc)
    //const {data, isLoading, isError, error} = useGetAccountQuery({net, acc})
    //if(isLoading) return <Loader />
    //else if(isError) return <ErrorBlock title = {error.status} value = {error.data._status.messages[0].message} />

    //const {trans} = useGetTransactionForAccID({net, acc})
    //console.log(trans);

    const getTXLocalList = async() => {
      await axios.get(`http://localhost:5551/api/v1/transactions/?account.id=${acc}&order=desc`)
      .then((res) => {
          console.log(res.data.transactions)
          setTX(res.data.transactions);
      })
      .catch((e)=> {
        console.log(e);
      });
    }
    const getTXList = async() => {
      await axios.get(`http://testnet.mirrornode.hedera.com/api/v1/transactions/?account.id=${acc}&order=desc`)
      .then((res) => {
        console.log(res.data.transactions)
        setTX(res.data.transactions);
      })
      .catch((e)=> {
        console.log(e);
      }); 
    }
    const getAccountLocalList = async() => {
      //await axios.get(`http://localhost:8080/account?accountId=${acc}`)
      await axios.get(`http://localhost:5551/api/v1/accounts?account.id=${acc}&order=desc`)
      .then((res) => {
          console.log(res.data.accounts)
          setData(res.data.accounts);
      })
      .catch((e)=> {
        console.log(e);
      });
    }
    const getAccountList = async() => {
      await axios.get(`http://testnet.mirrornode.hedera.com/api/v1/accounts?account.id=${acc}&order=desc`)
      .then((res) => {
        console.log(res.data.accounts)
        setData(res.data.accounts);
      })
      .catch((e)=> {
        console.log(e);
      }); 
    }

    console.log(TX);
    console.log(data[0])
    let transactions;
    transactions = TX.map(
      (elem) => <Transaction key={elem.transaction_hash} id={elem.transaction_id} type={elem.name}
          result={elem.result} fee={elem.charged_tx_fee}/>
    )

  return (
    <div className='account_page wrapper'>
        <h4 className='info_title'>ACCOUNT</h4>
        <div className='content page'> 
            <InfoRow title='Account ID:' value={data[0]?.account ? data[0].account : 'None'} />
            <InfoRow title='Balance:' value={<div>{(data[0]?.balance?.balance >= 0 ? data[0].balance.balance / 100000000 : 'None')} <span className='hbar'> &#8463; </span></div>} />
            
            <InfoRow title={`Key (${data[0]?.key?._type ? data[0].key._type : 'None'}):`} value = {data[0]?.key?.key ? data[0].key.key : 'None'} />
            <InfoRow title='Alias:' value={data[0]?.alias ? data[0].alias : 'None'} />
            <InfoRow title='EVM Address:' value={data[0]?.evm_address ? data[0].evm_address : 'None'} />
        </div>
    
        <> < h4 className = 'info_title' > Recent Transactions</h4>
            < div className = 'recent_transactions page' >
                <table className="table table-borderless table-hover">
                    <thead>
                        <tr>
                            <th scope="col">TX ID</th>
                            <th scope="col">Type</th>
                            <th scope="col">Result</th>
                            <th scope='col'>Fee (Hbar)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions}
                    </tbody>
                </table>
            </div>
        </>
    </div>
  
  
  )
}

export default AccountPage