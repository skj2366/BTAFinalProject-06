import { applyMiddleware, createStore, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./modules";

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware());
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV !== "production"
});

export default wrapper;
