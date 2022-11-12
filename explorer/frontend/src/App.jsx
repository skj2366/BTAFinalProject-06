import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Address from './pages/address/Address';
import Homepage from './pages/homepage/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import TransactionPage from './pages/transactionPage/TransactionPage';
import AccountPage from './pages/account/AccountPage';
import RecentAccounts from './components/RecentAccounts/RecentAccounts';
import TokenPage from './pages/tokenPage/TokenPage';
import TransactionMainPage from './pages/transactionPage/TransactionMainPage';
import BlockMainPage from './pages/blockPage/BlockMainPage';
import BlockDetailPage from './pages/blockPage/BlockDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path='address' element={<Address />} />
          <Route path='transaction/:id' element={<TransactionPage />} />
          <Route path='account' element={<RecentAccounts />} />
          <Route path='account/:acc' element={<AccountPage />} />
          <Route path='token/:id' element={<TokenPage />} />
          <Route path='transactions' element={<TransactionMainPage />} />
          <Route path='block/:number' element={<BlockDetailPage />} />
          <Route path='blocks' element={<BlockMainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
