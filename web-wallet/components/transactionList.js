import React from "react";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import {Box, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {convertToDate} from "../utill/common";
import {ClientTypeName} from "../utill/enum";

export const TransactionList = (props) => {
  const {transactions, accountId, client} = props

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

  const handleClickTransaction = (transactionId) => {
    if (client === ClientTypeName.LOCAL_NET) {
      window.open(`http://localhost:3000/transaction/${transactionId}`)
    } else {
      window.open(`https://hashscan.io/testnet/transaction/${transactionId}`)
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
                sx={{cusor: 'pointer'}}
                onClick={() => handleClickTransaction(transaction.transaction_id)}
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
