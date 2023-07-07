import React from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import TokenPage from './components/TokenPage';
import { Web3ReactProvider } from '@web3-react/core';
import { provider } from './utils/web3';

function App() {
  return (
    <Web3ReactProvider getLibrary={() => provider}>
      <div className="App">
        <Header />
        <HomePage />
        <TokenPage />
      </div>
    </Web3ReactProvider>
  );
}

export default App;