import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, notification } from 'antd';
import { Select } from 'antd';
import './Navbar.css';
import { useDispatch } from 'react-redux';
import { selectNet } from '../../redux/netSlice';
import Search from 'antd/lib/input/Search';

const Navbar = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const searchInput = useRef();

  const searchHandle = (value) => {
    let page = 'transaction';
    console.log(value);
    if (!value) {
      const args = {
        message: `Search Error`,
        description: 'Please enter a search value',
        duration: 2,
      };
      return notification.open(args);
    } else {
      value = value.trim();
      const regBlock = /^[0-9]+$/;
      const regTrans = /[-]/g;
      const regAcc = /^[0][.][0][.]\d{1,10}$/;
      if (regBlock.test(value)) page = 'block';
      else if (regTrans.test(value)) page = 'transaction';
      if (regAcc.test(value)) page = 'account';
    }
    navigate(`${page}/${value}`);
  };

  return (
    <nav className='navbar'>
      <div className='navbar__content wrapper'>
        <div className='navbar__logo'>
          {' '}
          <NavLink to='/'>
            {' '}
            <span className='hbar__logo'>&#8463;</span>explorer
          </NavLink>
        </div>
        <div className='beta'>
          <Select
            className='navbar__net'
            defaultValue='localnet'
            style={{ width: 150 }}
            onChange={(value) => dispatch(selectNet(value))}
          >
            <Option value='localnet'>Localnet</Option>
            <Option value='testnet'>Testnet</Option>
            <Option value='mainnet'>Mainnet</Option>
          </Select>

          <Button type='link' ghost={true} size='small'>
            <NavLink to={`/`}>Dash Board</NavLink>
          </Button>
          <Button type='link' ghost={true} size='small'>
            <NavLink to={`/transactions`}>Transactions</NavLink>
          </Button>
          <Button type='link' ghost={true} size='small'>
            <NavLink to={`/account`}>Accounts</NavLink>
          </Button>
          <Button type='link' ghost={true} size='small'>
            <NavLink to={`/blocks`}>Blocks</NavLink>
          </Button>
          <div style={{ marginTop: 10 }}></div>
          <div className='info_inp'>
            <Search
              placeholder='AccountId or TxId or Block Number'
              ref={searchInput}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={(e) => searchHandle(searchValue)}
              style={{ width: 600 }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
