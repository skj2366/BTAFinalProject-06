import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Snackbar} from "@mui/material";
import {closeSnackBar} from "../redux/snackBar";

export const SimpleSnackBar = () => {
  const dispatch = useDispatch();
  const { open, alertType, message } = useSelector(state => state.snackBarReducer);

  const handleClose = () => {
    dispatch(closeSnackBar())
  }
  return (
    <>
      <Snackbar open={open} autoHideDuration={3500} onClose={handleClose} sx={{ bottom: '55px'}}>
        <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%'}}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}
