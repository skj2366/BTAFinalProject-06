import React from 'react';
import RecentTransactions from '../../components/RecentTransactions/RecentTransactions';
import Loader from '../../components/loader/Loader';
import { useGetTransactionsQuery, useGetLocalTransactionsQuery } from '../../redux/hederaApi';
import getDynamicQuery from '../../utils/getDynamicQuery';
import { useSelector } from 'react-redux';

const TransactionMainPage = () => {
  const state_net = useSelector((state) => state.net.net);
  const net = getDynamicQuery(state_net);

  const { data: trans, isLoading: transLoading } = useGetLocalTransactionsQuery(net, {
    pollingInterval: 10000,
  });

  if (transLoading) return <Loader />;

  return (
    <div className='homepage'>
      <div className='wrapper'>
        <RecentTransactions trans={trans} />
      </div>
    </div>
  );
};

export default TransactionMainPage;
