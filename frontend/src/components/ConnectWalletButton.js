import React from 'react';

const ConnectWalletButton = () => {
  const connectWallet = async () => {
    try {
      await window.ethereum.enable();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={connectWallet}>Connect Wallet</button>
  );
};

export default ConnectWalletButton;