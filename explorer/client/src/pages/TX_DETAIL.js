import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TX = () => {
 
  const { txId } = useParams();

  const [txList, setTxList] = useState([]);

  const getTxList = async() => {
    await axios.get(`http://localhost:8080/tx/${txId}`)
    .then((res) => {
      console.log(res.data.data)
      setTxList(res.data.data);
    })
    .catch((e)=> {
      console.log(e);
    });

  }

  useEffect(() => {
    //getAccountBalance();
    getTxList();
  },[]);

  return (
    <>
    
    <div>Transaction Info</div>
    {
      txList.map((item) => {
        return (
          <>
        <div>TX ID: {item.transaction_id}</div>
        <div>Type: {item.type}</div>
        <div>Time: {item.consensus_timestamp}</div>
        <div>nonce: {item.nonce}</div>
        <div>result: {item.result}</div>
        <div>TX hash: {item.transaction_hash}</div>
        </>
        )
      })
    }
    
    </>
  )
}

export default TX