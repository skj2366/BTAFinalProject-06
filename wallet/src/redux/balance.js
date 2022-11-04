export const UPDATE_BALANCE = 'UPDATE_BALANCE'

export const updateBalance = balance => ({type: UPDATE_BALANCE, value: balance})

const initialState = {
  balance: 0,
}

export const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BALANCE :
      return {
        ...state,
        balance: action.value
      }
    default:
      return state
  }
}
