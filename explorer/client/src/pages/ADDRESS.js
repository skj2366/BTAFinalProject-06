import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ADDRESS = () => {
  //const getAddressAPI = 'https://stacks-node-api.testnet.stacks.co/extended/v1/address/{principal}/balances'
  //ST319CF5WV77KYR1H3GT0GZ7B8Q4AQPY42ETP1VPF
  const { address } = useParams();
  const [balance, setBalance] = useState('');
  const [txNonce, setTxNonce] = useState('');
  const [txList, setTxList] = useState([]);
  const getSTXBalance = async() => {

    await axios.get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${address}/balances`)
    .then((res) => setBalance(res.data.stx.balance))
    .catch((e)=> {
      setBalance(null)
      console.log(e);
    });

  }

  const getTxNonce = async() => {

    await axios.get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${address}/nonces`)
    .then((res) => {
      console.log(res)
      setTxNonce(res.data.last_executed_tx_nonce)
    })
    .catch((e)=> {
      setBalance(null)
      console.log(e);
    });

  }

  const getTxList = async() => {
    //https://stacks-node-api.testnet.stacks.co/extended/v1/address/{principal}/transactions
    await axios.get(` https://stacks-node-api.testnet.stacks.co/extended/v1/address/${address}/transactions`)
    .then((res) => {
      console.log(res.data.results)
      setTxList(res.data.results)
    })
    .catch((e)=> {
      setBalance(null)
      console.log(e);
    });

  }

  useEffect(() => {
    getSTXBalance();
    getTxNonce();
    getTxList();
  },[]);
  return (
    <>
    <div>account: {address}</div>
    <div>balance: {balance}</div>
    <div>last executed tx nonce: {txNonce}</div>
    <div>-------------------------------------------</div>
    <div>Transactions</div>
    {
      txList.map((item) => {
        return (
          <>
        <div>sender : {item.sender_address}</div>
        <div>receipient: {item.token_transfer.recipient_address}</div>
        <div>amount:{item.token_transfer.amount}</div>
        <div>fee: {item.fee_rate}</div>
        </>
        )
      })
    }
    
    </>
  )
}

export default ADDRESS