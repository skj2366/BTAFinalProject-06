import React, { useEffect } from 'react';
import './RecentBlocks.css';
import Block from './Block';
import getTime from '../../utils/GetTime';
import { useState } from 'react';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';

const RecentBlocks = ({ elements, parentFunction, intervalToggle: parentToggle }) => {
  // const blocks = '';
  const [intervalToggle, setIntervalToggle] = useState(parentToggle);
  useEffect(() => {
    setIntervalToggle(parentToggle);
  }, [parentToggle]);
  const handleClickToggleBtn = () => {
    if (intervalToggle) {
      setIntervalToggle(false);
    } else {
      setIntervalToggle(true);
    }
    parentFunction(intervalToggle);
  };
  const blocks = elements.map((elem) => (
    <Block
      key={elem.hash}
      number={elem.number}
      startTime={getTime(elem.timestamp_from)}
      gas_used={elem.gas_used}
      count={elem.count}
      name={elem.name}
      previous_hash={elem.previous_hash}
    />
  ));
  console.log(elements);
  return (
    <>
      <h4 className='info_title'>Recent Blocks</h4>
      <div className='recent_blocks page'>
        {intervalToggle ? (
          <CaretRightOutlined
            style={{ position: 'absolute', right: 30, top: 20, fontSize: 30 }}
            onClick={handleClickToggleBtn}
          />
        ) : (
          <PauseOutlined
            style={{ position: 'absolute', right: 30, top: 20, fontSize: 30 }}
            onClick={handleClickToggleBtn}
          />
        )}
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
