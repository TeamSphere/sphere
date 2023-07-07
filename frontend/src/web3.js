import Web3 from 'web3';

const web3 = new Web3(window.ethereum || 'https://mainnet.infura.io/v3/4b0219f59df14608bd3e637197493373');

export default web3;