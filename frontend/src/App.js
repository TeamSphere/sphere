// App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState('');

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const response = await axios.get('/blocks');
      setBlocks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTransaction = async () => {
    try {
      await axios.post('/transactions', { transaction: newTransaction });
      setNewTransaction('');
    } catch (error) {
      console.error(error);
    }
  };

  const mineBlock = async () => {
    try {
      await axios.get('/mine');
      fetchBlocks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Blockchain Explorer</h1>
      <h2>Blocks</h2>
      {blocks.map((block) => (
        <div key={block.id}>
          <p>Block ID: {block.id}</p>
          <p>Timestamp: {block.timestamp}</p>
          <p>Hash: {block.hash}</p>
        </div>
      ))}

      <h2>Transactions</h2>
      {transactions.map((transaction) => (
        <p key={transaction.id}>{transaction}</p>
      ))}

      <div>
        <input
          type="text"
          value={newTransaction}
          onChange={(e) => setNewTransaction(e.target.value)}
        />
        <button onClick={createTransaction}>Create Transaction</button>
      </div>

      <button onClick={mineBlock}>Mine Block</button>
    </div>
  );
}

export default App;