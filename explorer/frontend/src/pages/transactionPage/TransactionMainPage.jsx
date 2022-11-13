import React from 'react';
import RecentTransactions from '../../components/RecentTransactions/RecentTransactions';
import Loader from '../../components/loader/Loader';
import { useGetTransactionsQuery } from '../../redux/hederaApi';
import { useGetLocalTransactionsQuery } from '../../redux/serverApi'
import getDynamicQuery from '../../utils/getDynamicQuery';
import { useSelector } from 'react-redux';

const TransactionMainPage = () => {
  const state_net = useSelector((state) => state.net.net);
  const net = getDynamicQuery(state_net);

  const {data: transLocal, isLoading: transLocalLoading} = useGetLocalTransactionsQuery({
    pollingInterval: 20000,
})
  const {data: trans, isLoading: transLoading} = useGetTransactionsQuery(net, {
      pollingInterval: 20000,
  })

  if (transLoading || transLocalLoading) return <Loader />;

  return (
    <div className='homepage'>
      <div className='wrapper'>
        <RecentTransactions trans={trans} transLocal={transLocal} net={state_net} />
      </div>
    </div>
  );
};

export default TransactionMainPage;
