import React from 'react';
import { useWeb3React } from '@web3-react/core';
import ConnectWalletButton from './ConnectWalletButton';

const Header = () => {
  const { account } = useWeb3React();

  return (
    <header>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Token</a></li>
          <li><a href="#">Liquidity</a></li>
          <li><a href="#">Exchange</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
        {account ? (
          <p>Connected with address: {account}</p>
        ) : (
          <ConnectWalletButton />
        )}
      </nav>
    </header>
  );
};

export default Header;