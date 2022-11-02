import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

function App() {
  return (
    <MyButton variant="contained" color="primary">
      MUI 적용 테스트
    </MyButton>
  );
}
export default App;

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});