import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

const TokenPage = () => {
  const { account, library } = useWeb3React();
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      if (library && account) {
        const contract = new ethers.Contract(process.env.REACT_APP_SPHERE_TOKEN_ADDRESS, ['function balanceOf(address) view returns (uint256)'], library);
        const balance = await contract.balanceOf(account);
        setBalance(balance.toString());
      }
    };

    fetchBalance();
  }, [account, library]);

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTransfer = async () => {
    if (library && account) {
      const contract = new ethers.Contract(process.env.REACT_APP_SPHERE_TOKEN_ADDRESS, ['function transfer(address to, uint256 amount)'], library.getSigner());
      const tx = await contract.transfer(recipient, amount);
      await tx.wait();
      setRecipient('');
      setAmount(0);
    }
  };

  return (
    <div>
      <h1>Token</h1>
      <p>Your Sphere token balance: {balance}</p>
      <form onSubmit={handleTransfer}>
        <label htmlFor="recipient">Recipient:</label>
        <input type="text" id="recipient" value={recipient} onChange={handleRecipientChange} />
        <br />
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={amount} onChange={handleAmountChange} />
        <br />
        <button type="submit">Transfer Tokens</button>
      </form>
    </div>
  );
};

export default TokenPage;