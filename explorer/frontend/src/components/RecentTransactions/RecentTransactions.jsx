import React from 'react'
import './RecentTransactions.css'
import Transaction from './Transaction';

const RecentTransactions = ({trans, transLocal, net}) => {
    console.log(net);
    let transactions;
    if (net === 'localnet') {
        transactions = transLocal.map(
            (elem) => <Transaction key={elem.transaction_hash} id={elem.transaction_id} type={elem.type}
                // time = {elem.consensus_timestamp}
                result={elem.result} fee={elem.charged_tx_fee}/>
        )
    } else {
        transactions = trans.map(
            (elem) => <Transaction key={elem.transaction_hash} id={elem.transaction_id} type={elem.name}
                // time = {elem.consensus_timestamp}
                result={elem.result} fee={elem.charged_tx_fee}/>
        )
    }
    return (
        <> < h4 className = 'info_title' > Recent Transactions</h4> < div className = 'recent_transactions page' > <table className="table table-borderless table-hover">
            <thead>
                <tr>
                    <th scope="col">TX ID</th>
                    <th scope="col">Type</th>
                    <th scope="col">Result</th>
                    <th scope='col'>Fee (Hbar)</th>
                </tr>
            </thead>
            <tbody>
                {transactions}
            </tbody>
        </table>
    </div>
</>
    )
}

export default RecentTransactions