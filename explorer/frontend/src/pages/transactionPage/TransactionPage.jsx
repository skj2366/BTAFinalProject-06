import React, { useEffect, useState } from 'react'
import './TransactionPage.css'
import {useParams} from 'react-router-dom'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { useGetTransactionQuery } from '../../redux/hederaApi'
import { useGetLocalTransactionQuery } from '../../redux/serverApi'
import getTime from '../../utils/GetTime'
import Transfers from './Transfers'
import InfoRow from '../../components/InfoRow/InfoRow'
import ErrorBlock from '../../components/ErrorBlock/ErrorBlock'
import { useSelector } from 'react-redux'
import getDynamicQuery from '../../utils/getDynamicQuery'
import axios from 'axios';


const TransactionPage = () => {
  const state_net = useSelector(state => state.net.net)
  const net = getDynamicQuery(state_net)
  const {id} = useParams()
  console.log(id);

  const [dataLocal, setDataLocal] = useState([]); 
  useEffect(() => {
    if(state_net === 'localnet') {
      getTxLocalList();
    } else {
      getTxList();
    }
  },[]);

  const getTxLocalList = async() => {
    //console.log(`http://localhost:8080/tx/${id}`)
    //await axios.get(`http://localhost:8080/tx/${id}`)
    await axios.get(`http://localhost:5551/api/v1/transactions/${id}?order=desc`)
    .then((res) => {
      //setDataLocal(res.data.data[0]);
      setDataLocal(res.data.transactions[0]);  
    })
    .catch((e)=> {
      console.log(e);
    });
  }
  const getTxList = async() => {
    //console.log(`http://localhost:8080/tx/${id}`)
    //await axios.get(`http://localhost:8080/tx/${id}`)
    await axios.get(`http://testnet.mirrornode.hedera.com/api/v1/transactions/${id}?order=desc`)
    .then((res) => {
      //setDataLocal(res.data.data[0]);
      setDataLocal(res.data.transactions[0]);  
    })
    .catch((e)=> {
      console.log(e);
    });
  }
  
  //const {dataLocal, isLoadingLocal, isErrorLocal, errorLocal} = useGetLocalTransactionQuery({id})
  //const {data, isLoading, isError, error} = useGetTransactionQuery({net, id})
  console.log(dataLocal);
  console.log(state_net)
  let dur;
  if(dataLocal.valid_duration_seconds === null) {
    dur = "0 sec";
  } else {
  dur = dataLocal.valid_duration_seconds >= 60 ? dataLocal.valid_duration_seconds / 60 + ' min' : dataLocal.valid_duration_seconds + ' sec'
  }
  return (    
    <div className='transaction_page wrapper'>
        <h4 className='info_title'>TRANSACTION</h4>
        <div className='transction_page__content page'>
            <InfoRow title= 'ID:' value={dataLocal.transaction_id} />
            <InfoRow title= 'Hash:' value={dataLocal.transaction_hash} />
            <InfoRow title= 'Type:' value={dataLocal.name} />
            <InfoRow title= 'Consensus At:'  value={getTime(dataLocal.consensus_timestamp) } />
            <InfoRow title= 'Duration:' value={dur} />
            <InfoRow title= 'Status:' value={dataLocal.result} />
            <InfoRow title= 'Node Account:' value={<div className='link'> <NavLink to={`/account/${dataLocal.node}`}>{dataLocal.node}</NavLink></div>} />
            <InfoRow title= 'Operator Account:' value={<div className='link'> <NavLink to={`/account/${id.split('-')[0]}`}>{id.split('-')[0]}</NavLink></div>} />
            <InfoRow title= 'Fee:' value={<div>{dataLocal.charged_tx_fee / Math.pow(10, 8)} <span className='hbar'> &#8463; </span></div>} />
            <InfoRow title= 'Max Fee:' value={<div>{dataLocal.max_fee / Math.pow(10, 8)} <span className='hbar'> &#8463; </span></div>} />
            <h5>TRANSFERS</h5>
            <Transfers transfers = {dataLocal.transfers} node = {dataLocal.node} operator = {id.split('-')[0]} />
        </div>
    </div>
  )
} 

export default TransactionPage