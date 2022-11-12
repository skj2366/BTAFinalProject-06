import React from 'react'
import {NavLink} from 'react-router-dom'

const Account = ({id, balance, keyName, alias, evmAddress}) => {
  return (
        <tr>
            <td className='account_link'> <NavLink to = {`${id}`}>{id}</NavLink></td>
            <td>{balance}</td>
            <td>{keyName}</td>
            <td>{alias}</td>
            <td>{evmAddress}</td>
        </tr>
  )
}

export default Account