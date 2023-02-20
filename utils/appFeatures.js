import {ethers} from "ethers";
import Web3Modal from "web3modal";

import {
    BookTokenABI,
    BooTokenAddress,
    SphereTokenABI,
    SphereTokenAddress,
    SingleSwapTokenAddress,
    SingleSwapTokenABI,
    SwapMultiHopAddress,
    SwapMultiHopABI,
    IWETHAddress,
    IWETHABI
} from '../Context/constants';

export const checkIfWalletConnected = async() => {
    try {
        if(!window.ethereum) return console.log("install MetaMask");
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
}

export const connectWallet = async() => {
    try {
        if (!window.ethereum) return console.log("Install MetaMask");
        const accounts = await window.ethereum.request({
            method: "eth_request"
        });
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
}

export const fetchBooContract = (signerOrProvider) => new ethers.Contract(BooTokenAddress, BookTokenABI, signerOrProvider);
export const connectingWithBooToken = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchBooContract(signer)
        return contract
    } catch (error) {
        console.log(error);
    }
}

export const fetchSphereContract = (signerOrProvider) => new ethers.Contract(SphereTokenAddress, SphereTokenABI, signerOrProvider);
export const connectingWithSphereToken = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchSphereContract(signer);
        return contract
    } catch (error) {
        console.log(error);
    }
}

export const fetchSingleSwapContract = (signerOrProvider) => new ethers.Contract(SingleSwapTokenAddress, SingleSwapTokenABI, signerOrProvider);
export const connectingWithSingleSwapToken = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchSingleSwapContract(signer);
        return contract
    } catch (error) {
        console.log(error);
    }
}

export const fetchIWETHContract = (signerOrProvider) => new ethers.Contract(IWETHAddress, IWETHABI, signerOrProvider);
export const connectingWithIWETHToken = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchIWETHContract(signer);
        return contract
    } catch (error) {
        console.log(error);
    }
}

const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const fetchDAIContract = (signerOrProvider) => new ethers.Contract(DAIAddress, IWETHABI, signerOrProvider);
export const connectingWithDAIToken = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchDAIContract(signer);
        return contract
    } catch (error) {
        console.log(error);
    }
}