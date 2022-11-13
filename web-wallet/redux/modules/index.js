import { AnyAction, CombinedState, combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import {balanceReducer} from "./balance";
import {clientReducer} from "./client";
import {snackBarReducer} from "./snackBar";
import {accountReducer} from "./accountInfo";

const rootReducer = (state, action) => {
  switch (action.type) {
    // 서버 사이드 데이터를 클라이언트 사이드 Store에 통합.
    case HYDRATE:
      return { ...action.payload }
    default: {
      const combineReducer = combineReducers({
        balanceReducer,
        clientReducer,
        snackBarReducer,
        accountReducer
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
