import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BLOCK = () => {
 
  const { blockNumber } = useParams();

  const [blockList, setBlockList] = useState([]);

  const getBlockList = async() => {
    await axios.get(`http://localhost:8080/block/${blockNumber}`)
    .then((res) => {
      console.log(res.data.data)
      setBlockList(res.data.data);
    })
    .catch((e)=> {
      console.log(e);
    });

  }

  useEffect(() => {
    //getAccountBalance();
    getBlockList();
  },[]);

  return (
    <>
    
    <div>Block Info</div>
    {
      blockList.map((item) => {
        return (
          <>
        <div>Number: {item.number}</div>
        <div>Hash: {item.hash}</div>
        <div>Start Time: {item.timestamp_from}</div>
        <div>End Time: {item.timestamp_to}</div>
        <div>Size: {item.size}</div>
        <div>Gas Used: {item.gas_used}</div>
        </>
        )
      })
    }
    
    </>
  )
}

export default BLOCK