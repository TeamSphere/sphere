import { ethers } from 'ethers';

let provider;
let signer;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
} else {
  provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_INFURA_URL);
  signer = provider.getSigner();
}

export { provider, signer };