'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [account, setAccount] = useState(null);
  const [blockchain, setBlockchain] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/account')
      .then(response => response.json())
      .then(data => setAccount(data));

    fetch('http://localhost:8080/api/blockchain/get')
      .then(response => response.json())
      .then(data => setBlockchain(data));
  }, []);

  const createBlockchain = () => {
    fetch('http://localhost:8080/api/blockchain/new', { method: 'POST' })
      .then(response => response.json())
      .then(data => setBlockchain(data));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to Sentience
          <code className="font-mono font-bold">&nbsp;Beta Version 0.01</code>
        </p>

        {account && (
          <div>
            <h2>Welcome, {account.username}</h2>
            <p>Your account balance is {account.balance}</p>
          </div>
        )}

        {blockchain && (
          <div>
            <h2>Your Blockchain</h2>
            <p>Hash: {blockchain.hash}</p>
            <p>Transactions: {blockchain.transactions}</p>
          </div>
        )}

        <button onClick={createBlockchain}>Create New Blockchain</button>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.thesphere.online"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/theSphere-logo.png"
              alt="The Sphere"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      {/* Rest of your page content here */}
    </main>
  );
}