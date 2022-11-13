export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT'

export const changeAccount = (accountId) => ({type: CHANGE_ACCOUNT, accountId: accountId})

const initialState = {
  accountId: null,
}

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ACCOUNT:
      return {
        ...state,
        accountId: action.accountId,
      }
    default:
      return state
  }
}
