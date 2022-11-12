import React from 'react';
import './RecentBlocks.css';
import Block from './Block';

const RecentBlocks = ({ elements }) => {
    // const blocks = '';
    const blocks = elements.map((elem) => (
        <Block
            key={elem.hash}
            number={elem.number}
            startTime={elem.timestamp_from}
            gas_used={elem.gas_used}
            count={elem.count}
            name={elem.name}
            previous_hash={elem.previous_hash}
        />
    ));
    // const blocks = elements.map((elem) => (
    //     <Block
    //         key={elem.hash}
    //         number={elem.number}
    //         startTime={elem.timestamp.from}
    //         gas_used={elem.gas_used}
    //         count={elem.count}
    //         name={elem.name}
    //         previous_hash={elem.previous_hash}
    //     />
    // ));
    console.log(elements);
    return (
        <>
            <h4 className='info_title'>Recent Blocks</h4>
            <div className='recent_blocks page'>
                <table className='table table-borderless table-hover'>
                    <thead>
                        <tr>
                            <th scope='col'>Number</th>
                            <th scope='col'>Start Time</th>
                            <th scope='col'>No. Transaction</th>
                            <th scope='col'>Gas Used</th>
                        </tr>
                    </thead>
                    <tbody>{blocks}</tbody>
                </table>
            </div>
        </>
    );
};

export default RecentBlocks;
