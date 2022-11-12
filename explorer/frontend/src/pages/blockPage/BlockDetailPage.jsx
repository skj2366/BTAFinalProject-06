import React from 'react';
import './BlockPage.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import getDynamicQuery from '../../utils/getDynamicQuery';
import { useGetBlockQuery, useGetLocalBlockQuery } from '../../redux/hederaApi';
import Loader from '../../components/loader/Loader';
import InfoRow from '../../components/InfoRow/InfoRow';
import getTime from '../../utils/GetTime';

const BlockDetailPage = () => {
  // const state_net = useSelector((state) => state.net.net);
  // const net = getDynamicQuery(state_net);
  // const { number } = useParams();
  // const { data, isLoading } = useGetBlockQuery({ net, number });
  // if (isLoading) return <Loader />;
  // console.log(data);

  // return (
  //   <div className='transaction_page wrapper'>
  //     <h4 className='info_title'>BLOCK</h4>
  //     <div className='transction_page__content page'>
  //       <InfoRow title='NUMBER:' value={data.number} />
  //       <InfoRow title='No. Transactions:' value={data.count} />
  //       {/* <InfoRow title='hapi_version:' value={data.hapi_version} /> */}
  //       <InfoRow title='hash:' value={data.hash} />
  //       {/* <InfoRow title='previous_hash:' value={data.previous_hash} /> */}
  //       {/* <InfoRow title='size:' value={data.size} /> */}
  //       <InfoRow title='From Timestamp:' value={getTime(data.timestamp.from)} />
  //       <InfoRow title='To Timestamp:' value={getTime(data.timestamp.to)} />
  //       <InfoRow title='Gas Used:' value={data.gas_used} />
  //       <InfoRow title='Record File Name:' value={data.name} />
  //       {/* <InfoRow title='logs_bloom:' value={data.logs_bloom} /> */}
  //     </div>
  //   </div>
  const state_net = useSelector((state) => state.net.net);
  const net = getDynamicQuery(state_net);
  const { number } = useParams();
  const { data, isLoading } = useGetLocalBlockQuery({ net, number });
  if (isLoading) return <Loader />;
  console.log(data);

  return (
    <div className='transaction_page wrapper'>
      <h4 className='info_title'>BLOCK</h4>
      <div className='transction_page__content page'>
        <InfoRow title='NUMBER:' value={data.number} />
        <InfoRow title='No. Transactions:' value={data.count} />
        {/* <InfoRow title='hapi_version:' value={data.hapi_version} /> */}
        <InfoRow title='hash:' value={data.hash} />
        {/* <InfoRow title='previous_hash:' value={data.previous_hash} /> */}
        {/* <InfoRow title='size:' value={data.size} /> */}
        <InfoRow title='From Timestamp:' value={data.timestamp_from} />
        <InfoRow title='To Timestamp:' value={data.timestamp_to} />
        <InfoRow title='Gas Used:' value={data.gas_used} />
        <InfoRow title='Record File Name:' value={data.name} />
        {/* <InfoRow title='logs_bloom:' value={data.logs_bloom} /> */}
      </div>
    </div>
  );
};

export default BlockDetailPage;
