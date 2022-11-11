import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ACCOUNT = () => {
 
  const { accountId } = useParams();

  const [accountList, setAccountList] = useState([]);

  const getAccountList = async() => {
    await axios.get('http://localhost:8080/account')
    .then((res) => {
      console.log(res.data.data)
      setAccountList(res.data.data);
    })
    .catch((e)=> {
      console.log(e);
    });

  }

  useEffect(() => {
    //getAccountBalance();
    getAccountList();
  },[]);

  return (
    <>
    
    <div>Recent Accounts</div>
    {
      accountList.map((item) => {
        return (
          <>
        <div>Account ID: {item.account}</div>
        <div>Expiry: {item.expiry_timestamp}</div>
        <div>Tokens: {item.balance.tokens[0]}</div>
        <div>Memo: {item.memo}</div>
        <div>Balance: {item.balance.balance}</div>
        </>
        )
      })
    }
    
    </>
  )
}

export default ACCOUNT