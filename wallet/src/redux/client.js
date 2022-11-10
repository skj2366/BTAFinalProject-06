import {ClientTypeName} from "../utill/enum";

export const CHANGE_CLIENT = 'CHANGE_CLIENT'

export const changeClient = client => ({type: CHANGE_CLIENT, value: client})

const initialState = {
  client: ClientTypeName.TEST_NET,
}

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CLIENT:
      return {
        ...state,
        client: action.value
      }
    default:
      return state
  }
}
