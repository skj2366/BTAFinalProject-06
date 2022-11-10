import {Button, styled} from "@mui/material";

export const WalletButton = styled(Button) ({
  backgroundColor: '#000',
  color: "#fff",
  boxShadow: 'none',
  textTransform: 'none',
  '&:disabled': {
    backgroundColor: '#fff',
    border: '1px solid #000',
    color: '#666',
    boxShadow: 'none',
  },
  '&:hover': {
    backgroundColor: '#fff',
    border: '1px solid #000',
    color: '#000',
    boxShadow: 'none',
  },
  '&:active': {
    backgroundColor: '#fff',
    border: '1px solid #000',
    color: '#000',
    boxShadow: 'none',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,0,0,.5)',
  },
})
