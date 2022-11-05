import React, {useState} from 'react'
import Styled from 'styled-components';
import imgUrl from '../img/back.jpg';
import TextField from '@mui/material/TextField';
import { styled } from '@material-ui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const MAIN = () => {

  const [search, setSearch] = useState('');

  return (
    <MainContainer>
    <BackImg src={imgUrl} />
    <Text>Stacks Chain Explorer</Text>
    <InputContainer>
    <Input placeholder="search by Address/ Txn Hash/ Blocks" onChange={(e) => setSearch(e.target.value)}/>
    <Link to={`/address/${search}`}>
    <Icon fontSize="large"/>
    </Link>

    </InputContainer>
    <TxContainer>
    <ConfiremdTx>Confirmed</ConfiremdTx>
    <ConfiremdTx>Recent</ConfiremdTx>
    </TxContainer>
    </MainContainer>
  )
}

export default MAIN;

const MainContainer = Styled.div`
width: 100%;
// height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background: #f8f9fa;
z-index: -1;

`
const BackImg = Styled.img`
    width: 100%;
    height: 290px;
    position: absolute;
    top: 60px;
    z-index: 1;
`
const Text = Styled.div`
  color: #fff;
  z-index: 10;
  font-size: 28px;
  margin-top: 70px;
`
const InputContainer = Styled.div`
margin-top: 30px;
z-index: 10;
width: 60%;
justify-content: center;
align-items: center;
display: flex;
a{
  text-decoration: none;
  text-align: center;
  display: flex;
}
`;
const Input = Styled.input`
height: 45px;
width: 80%;
    // z-index: 10;
    border: none;
    border-radius: 5px;
    padding: 5px 12px;
    box-sizing: content-box;
    font-size: 16px;
`
const TxContainer = Styled.div`
margin-top: 50px;
width: 70%;
height: 900px;
// background: #fff;
display: flex;
justify-content: space-between;
z-index: 10;
`
const ConfiremdTx = Styled.div`
width: 50%;
height: 900px;
background: #fff;
margin: 10px;
border-radius: 5px;
`

const Icon = styled(SearchIcon)({
   padding: 10, 
  marginLeft: 10,
   borderRadius: 5,
    background: '#fff',
    zIndex: 10
  });