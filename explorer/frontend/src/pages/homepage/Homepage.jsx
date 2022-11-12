import React from 'react'
import InfoBlocks from '../../components/InfoBlocks/InfoBlocks'
import RecentTransactions from '../../components/RecentTransactions/RecentTransactions'
import { useGetHbarInfoQuery } from '../../redux/hbarApi'
import Loader from '../../components/loader/Loader'
import { useGetSupplyQuery, useGetTransactionsQuery } from '../../redux/hederaApi'
import { useGetLocalTransactionsQuery } from '../../redux/serverApi'
import getDynamicQuery from '../../utils/getDynamicQuery'
import { useSelector } from 'react-redux'

const Homepage = () => {
    const state_net = useSelector(state => state.net.net)
    const net = getDynamicQuery(state_net)
    
    const {data = [], isLoading: hbarLoading} = useGetHbarInfoQuery(undefined,{
        pollingInterval: 20000,
    })
    console.log(state_net);
    
    const {data: transLocal, isLoading: transLoading} = useGetLocalTransactionsQuery({
        pollingInterval: 20000,
    })
    const {data: trans, isLoading: transLocalLoading} = useGetTransactionsQuery(net, {
        pollingInterval: 20000,
    })

    const {data: supply, isLoading: supplyLoading} = useGetSupplyQuery()

    if(hbarLoading || transLoading || transLocalLoading || supplyLoading) return <Loader/>

  return (
    <div className="homepage">
        <div className="wrapper">
            <InfoBlocks data={data} supply = {supply}/>
            <RecentTransactions trans = {trans} transLocal = {transLocal} net = {state_net} />
        </div>
    </div>
  )
}

export default Homepage