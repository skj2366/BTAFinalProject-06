import React from 'react';
import Loader from '../../components/loader/Loader';
import { useGetBlocksQuery, useGetLocalBlocksQuery } from '../../redux/hederaApi';
import getDynamicQuery from '../../utils/getDynamicQuery';
import { useSelector } from 'react-redux';
import RecentBlocks from '../../components/RecentBlocks/RecentBlocks';

const BlockMainPage = () => {
    const state_net = useSelector((state) => state.net.net);
    const net = getDynamicQuery(state_net);

    //todo) local일때와 testnet, mainnet일때 분기 필요
    const { data: blocks, isLoading: blocksLoading } = useGetLocalBlocksQuery(net, {
        pollingInterval: 10000,
    });

    if (blocksLoading) return <Loader />;

    return (
        <div className='homepage'>
            <div className='wrapper'>
                <RecentBlocks elements={blocks} />
            </div>
        </div>
    );
};

export default BlockMainPage;
