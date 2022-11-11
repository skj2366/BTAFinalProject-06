import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ACCOUNT from './pages/ACCOUNT';
import ACCOUNT_DETAIL from './pages/ACCOUNT_DETAIL';
import ADDRESS from './pages/ADDRESS';
import BLOCK from './pages/BLOCK';
import BLOCK_DETAIL from './pages/BLOCK_DETAIL';
import MAIN from './pages/MAIN';
import NOT_FOUND from './pages/NOT_FOUND';
import TX from './pages/TX';
import TX_DETAIL from './pages/TX_DETAIL';

function App() {
  return (
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<MAIN />}></Route>
					<Route path="/tx" element={<TX />}></Route>
					<Route path="/tx/:txId" element={<TX_DETAIL />}></Route>
					<Route path="/block" element={<BLOCK />}></Route>
					<Route path="/block/:blockNumber" element={<BLOCK_DETAIL />}></Route>
					<Route path="/account" element={<ACCOUNT />}></Route>
					<Route path="/account/:accountId" element={<ACCOUNT_DETAIL />}></Route>
					<Route path="/address/:address" element={<ADDRESS />}></Route>
					<Route path="*" element={<NOT_FOUND />}></Route>
				</Routes>
			</BrowserRouter>
  );
}
export default App;