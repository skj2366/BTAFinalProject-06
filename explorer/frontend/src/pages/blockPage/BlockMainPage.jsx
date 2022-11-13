import React, { useEffect } from 'react';
import Loader from '../../components/loader/Loader';
import { useGetBlocksQuery, useGetLocalBlocksQuery } from '../../redux/hederaApi';
import getDynamicQuery from '../../utils/getDynamicQuery';
import { useSelector } from 'react-redux';
import RecentBlocks from '../../components/RecentBlocks/RecentBlocks';
import { useState } from 'react';
import { Pagination } from 'antd';
import { useRef } from 'react';

const BlockMainPage = () => {
  const state_net = useSelector((state) => state.net.net);
  const net = getDynamicQuery(state_net);
  const [pollingInterval, setPollingInterval] = useState(1000);
  const [currentPage, setCurrentPage] = useState(1);
  const [intervalToggle, setIntervalToggle] = useState(false);
  const pagination = useRef(null);
  //   useEffect(() => {
  //     setIntervalToggle()
  //   }, []);
  const onChangePage = (page) => {
    handleTogglePollingInterval(false);
    console.log(page);
    setCurrentPage(page);
  };

  const handleTogglePollingInterval = (e) => {
    if (e) {
      console.log('a');
      setIntervalToggle(true);
      onChangePage(1);
      setPollingInterval(1000);
      //   pagination.current.disabled = true;
    } else {
      console.log('b');
      setIntervalToggle(false);
      setPollingInterval(0);
      //   pagination.current.disabled = false;
    }
  };

  console.log(currentPage);
  //todo) local일때와 testnet, mainnet일때 분기 필요
  const { data: blocks, isLoading: blocksLoading } = useGetLocalBlocksQuery(
    { net, currentPage },
    {
      pollingInterval: pollingInterval,
    }
  );

  if (blocksLoading) return <Loader />;

  return (
    <div className='homepage'>
      <div className='wrapper'>
        <RecentBlocks
          elements={blocks}
          parentFunction={handleTogglePollingInterval}
          intervalToggle={intervalToggle}
        />
        <Pagination ref={pagination} current={currentPage} onChange={onChangePage} total={50} />
      </div>
    </div>
  );
};

export default BlockMainPage;
