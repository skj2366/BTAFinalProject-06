const OPEN_SNACKBAR = 'SHOW_SNACKBAR'
const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

export const openSnackBar = (alertType, message) => ({type: OPEN_SNACKBAR, alertType : alertType, message: message})
export const closeSnackBar = (_) => ({type: CLOSE_SNACKBAR})

const initialState = {
  open : false,
  alertType: 'success',
  message : ''
}

export const snackBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR :
      return {
        ...state,
        open: true,
        alertType: action.alertType,
        message: action.message
      }
    case CLOSE_SNACKBAR :
      return {
        ...state,
        open: false,
        message: ''
      }
    default:
      return state
  }
}
