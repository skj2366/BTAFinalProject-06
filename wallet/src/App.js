import React from "react";
import './App.css';
import {Router} from "react-chrome-extension-router";
import {Login} from "./pages/Login";
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {logger} from "redux-logger/src";
import {Provider} from "react-redux";
import {SimpleSnackBar} from "./pages/SimpleSnackBar";

function App() {
  const enhancer = composeWithDevTools(applyMiddleware(logger));
  const store = createStore(rootReducer, enhancer);
  return (
    <>
      <Provider store={store}>
        <SimpleSnackBar/>
        <Router>
          <Login/>
        </Router>
      </Provider>
    </>
  );
}

export default App;
