import React from "react";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import {Box, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
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
              >
                <ListItemAvatar>
                  {
                    isSent ?  <UploadIcon/> : <DownloadIcon/>
                  }
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{position:'relative'}}>
                      <Typography variant={'body1'}>
                        {transaction.tx.tx_type}
                      </Typography>
                      <Typography variant={'subtitle2'} sx={{position: 'absolute', top: 0, right: 0}}>
                        {tokenAmount.toLocaleString()} STX
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        component="span"
                        variant="caption"
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
