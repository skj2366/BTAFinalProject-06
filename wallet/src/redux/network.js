import {NetworkType} from "../utill/enum";

export const CHANGE_NETWORK = 'CHANGE_NETWORK'

export const changeNetwork = network => ({type: CHANGE_NETWORK, value: network})

const initialState = {
  network: NetworkType.TestNetwork,
}

export const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NETWORK:
      return {
        ...state,
        network: action.value
      }
    default:
      return state
  }
}
