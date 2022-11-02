import React from 'react'
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderContainer>
        <Logo><Link to ="/">로고 이미지</Link></Logo>
        <Navi>
            <Link to ="/tx">Transaction</Link>
            <Link to ="/block">Blocks</Link>
            <div>시세 API</div>
        </Navi>
    </HeaderContainer>
  )
}

export default Header;

const HeaderContainer = Styled.div`
    width: 100vw;
    background: #fff;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    a{
        text-decoration: none; color: black;
    }
`;
const Logo = Styled.div`

`;
const Navi = Styled.div`
    width: 300px;
    display: flex;
    justify-content: space-between;
    div{
        cursor:pointer;
    }
   
`;

// const MyButton = styled(Button)({
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   });