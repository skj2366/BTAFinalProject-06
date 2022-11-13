import React from 'react';
import { NavLink } from 'react-router-dom';

const Block = ({ number, startTime, count, gas_used }) => {
  return (
    <tr>
      <td className='transaction_link'>
        {' '}
        <NavLink to={`/block/${number}`}>{number}</NavLink>
      </td>
      {/* <td>{getTime(startTime)}</td> */}
      <td>{startTime}</td>
      <td>{count}</td>
      <td>{gas_used}</td>
    </tr>
  );
};

export default Block;
