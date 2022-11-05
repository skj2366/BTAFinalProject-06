import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ADDRESS from './pages/ADDRESS';
import BLOCK from './pages/BLOCK';
import MAIN from './pages/MAIN';
import NOT_FOUND from './pages/NOT_FOUND';
import TX from './pages/TX';


function App() {
  return (
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<MAIN />}></Route>
					<Route path="/tx" element={<TX />}></Route>
					<Route path="/block" element={<BLOCK />}></Route>
					<Route path="/address/:address" element={<ADDRESS />}></Route>
					<Route path="*" element={<NOT_FOUND />}></Route>
				</Routes>
			</BrowserRouter>
  );
}
export default App;