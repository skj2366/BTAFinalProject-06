import React from 'react'
import Styled from 'styled-components';
import imgUrl from '../img/back.jpg';
import TextField from '@mui/material/TextField';
import { styled } from '@material-ui/styles';

const MAIN = () => {

  return (
    <MainContainer>
    <BackImg src={imgUrl} />
    <Text>Stacks Chain Explorer</Text>
    <Input placeholder="search by Address/ Txn Hash/ Blocks" />
    {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
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
const Input = Styled.input`
    width: 55%;
    height: 45px;
    margin-top: 30px;
    z-index: 10;
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

// const Input = styled(TextField)({
//     background: '#fff',
//     width: '55%',
//     // border: 0,
//     // borderRadius: 3,
//     color: '#000',
//     height: 48,
//     // marginTop: '40px',
//    margin: 50,
//   });