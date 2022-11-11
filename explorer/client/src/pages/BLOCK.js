import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { utils } from '../utils/utils';

const server_url = process.env.SERVER_URL;

const BLOCK = () => {
 
  const { blockNumber } = useParams();

  const [blockList, setBlockList] = useState([]);

  const getBlockList = async() => {
    
    await axios.get(`http://localhost:8080/block`)
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
    
    <div>Recent Blocks</div>
    {
      blockList.map((item) => {
        return (
          <>
        <div>Number: {item.number}</div>
        <div>Hash: {item.hash}</div>
        <div>Start Time: {utils.convertToDate(item.timestamp_from)}</div>
        <div>End Time: {utils.convertToDate(item.timestamp_to)}</div>
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