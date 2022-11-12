import React from "react";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import {Box, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {LAMPORTS_PER_STX} from "../utill/enum";
import {convertToDate} from "../utill/common";
import {WalletButton} from "./walletButton";
import {useSelector} from "react-redux";

export const TransactionList = (props) => {
  const { accountId } = useSelector(state => state.accountReducer);
  const {transactions} = props

  const getTransactionInfo = (transfers) => {
    const candidate1 = transfers[transfers.length - 2];
    const candidate2 = transfers[transfers.length - 1];

    let myTransfer;
    let otherTransfer;

    if (candidate1.account === accountId) {
      myTransfer = candidate1;
      otherTransfer = candidate2
    }
    else {
      myTransfer = candidate2;
      otherTransfer = candidate1;
    }

    return {
      amount: myTransfer.amount / 100000000,
      target: otherTransfer.account,
    }
  }

  return (
    <>
      <List sx={{ width: '100%'}}>
        {
          transactions.map((transaction, index) => {
            const {amount, target} = getTransactionInfo(transaction.transfers)
            const isSent = amount < 0
            return (
              <ListItem
                alignItems="flex-start"
                key={index}
              >
                <ListItemAvatar>
                  {
                    isSent ?  <UploadIcon/> : <DownloadIcon/>
                  }
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{position:'relative'}}>
                      <Typography variant={'body1'} sx={{ textAlign: 'right', display: 'block' }}>
                        {transaction.name}
                      </Typography>
                      <Typography variant={'subtitle2'} sx={{ textAlign: 'right', display: 'block' }}>
                        {convertToDate(transaction.consensus_timestamp)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ textAlign: 'right', display: 'block' }}
                        component="span"
                        variant="caption"
                        color="text.primary"
                      >
                        {transaction.transaction_id}
                      </Typography>
                      <Typography
                        sx={{ textAlign: 'right', display: 'block' }}
                        component="span"
                        variant="caption"
                        color="text.primary"
                      >
                        {`${isSent ? '' : '+'} ${amount} Hbar`}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            )
          })
        }
      </List>
    </>
  )
}
