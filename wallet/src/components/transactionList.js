import React from "react";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import {List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {LAMPORTS_PER_STX} from "../utill/enum";


export const TransactionList = (props) => {
  const {transactions} = props
  return (
    <>
      <List sx={{ width: '100%'}}>
        {
          transactions.map(transaction => {
            const isSent = Number(transaction.stx_sent) > 0
            const tokenAmount = (isSent ? Number(transaction.stx_sent) * -1 : Number(transaction.stx_received)) / LAMPORTS_PER_STX
            return (
              <ListItem
                alignItems="flex-start"
                key={transaction.tx.tx_id}
                secondaryAction={tokenAmount}
              >
                <ListItemAvatar>
                  {
                    isSent ?  <UploadIcon/> : <DownloadIcon/>
                  }
                </ListItemAvatar>
                <ListItemText
                  primary={transaction.tx.tx_type}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="subtitle1"
                        color="text.primary"
                      >
                        {transaction.tx.tx_id}
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
