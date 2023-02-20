import React, { useState, useEffect } from 'react';
import { ethers, BigNumber } from "ethers";
import Web3Modal from "web3modal";
import {Token, CurrencyAmount, TradeType, Percent} from "@uniswap/sdk-core";

import {
    checkIfWalletConnected,
    connectWallet,
    connectingWithBooToken,
    connectingWithSphereToken,
    connectingWithSingleSwapToken,
    connectingWithIWETHToken,
    connectingWithDAIToken
} from '../utils/appFeatures';

import { IWETHABI } from "./constants";
import ERC20 from "./ERC20.json";
import {getPrice} from "../utils/fetchingPrice";
import {swapUpdatePrice} from "../utils/swapUpdatePrice";

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {

    const [account, setAccount] = useState("");
    const [ether, setEther] = useState("");
    const [networkConnect, setNetworkConnect] = useState("");
    const [weth9, setWeth9] = useState("");
    const [dai, setDai] = useState("");

    const [tokenData, setTokenData] = useState([]);

    const addToken = [
        "0x50D1c9771902476076eCFc8B2A83Ad6b9355a4c9",
        "0x42bBFa2e77757C645eeaAd1655E0911a7553Efbc",
        "0x68749665FF8D2d112Fa859AA293F07A622782F38",
        "0xe3c408BD53c31C085a1746AF401A4042954ff740",
        "0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3",
        "0xC581b735A1688071A1746c968e0798D642EDE491",
        "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
        "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    ];

    const fetchingData = async() => {
        try {
            const userAccount = await checkIfWalletConnected();
            setAccount(userAccount);

            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection)

            const balance = await provider.getBalance(userAccount);
            const convertBal = BigNumber.from(balance).toString();
            const ethValue = ethers.utils.formatEther(convertBal);
            setEther(ethValue);

            // GET NETWORK
            const network = await provider.getNetwork();
            setNetworkConnect(network.name);

            // ALL TOKEN BALANCE AND DATA
            addToken.map(async(el, i) => {
                //getting contract
                const contract = new ethers.Contract(el, ERC20, provider);
                // getting balance of token
                const userBalance = await contract.balanceOf(userAccount);
                const tokenLeft = BigNumber.from(userBalance).toString();
                const convertTokenBal = ethers.utils.formatEther(tokenLeft);
                //get name and symbol
                const symbol = await contract.symbol();
                const name = await contract.name();

                tokenData.push({
                    name: name,
                    symbol: symbol,
                    tokenBalance: convertTokenBal,
                    tokenAddress: el,
                });

            })

            // WETH balance
            const wethContract = await connectingWithIWETHToken();
            const wethBal = await wethContract.balanceOf(userAccount);
            const wethToken = BigNumber.from(wethBal).toString();
            const convertwethTokenBal = ethers.utils.formatEther(wethToken);
            setDai(convertwethTokenBal);

            // DAI balance
            const daiContract = await connectingWithDAIToken();
            const daiBal = await daiContract.balanceOf(userAccount);
            const daiToken = BigNumber.from(daiBal).toString();
            const convertdaiTokenBal = ethers.utils.formatEther(daiToken);
            setDai(convertdaiTokenBal);


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchingData();
    }, []);

    // single swap token
    const singleSwapToken = async({token1, token2, swapAmount}) => {
        console.log(
            token1.tokenAddress.tokenAddress,
            token2.tokenAddress.tokenAddress,
            swapAmount
        )
        try {
            let singleSwapToken;
            let weth;
            let dai;

            singleSwapToken = await connectingWithSingleSwapToken();
            weth = await connectingWithIWETHToken();
            dai = await connectingWithDAIToken();

            const decimals0 = 18;
            const inputAmount = swapAmount;
            const amountIn = ethers.utils.parseUnits(inputAmount.toString(), decimals0);

            console.log(amountIn);

            await weth.deposit({value: amountIn});
            await weth.approve(singleSwapToken.address, amountIn);

            const transaction = await singleSwapToken.swapExactInputSingle(
                token1.tokenAddress.tokenAddress,
                token2.tokenAddress.tokenAddress,
                swapAmount,
                amountIn, {
                gasLimit: 300000,
            });

            await transaction.wait();
            console.log(transaction);

            const balance = await dai.balanceOf(account);
            const transferAmount = BigNumber.from(balance).toString();
            const ethValue = ethers.utils.formatEther(transferAmount);
            setDai(ethValue);
            console.log("dai balance:", ethValue)


        } catch(error) {
            console.log(error)
        }
    }

    return ( 
        <SwapTokenContext.Provider value={{ singleSwapToken, tokenData, connectWallet, getPrice, swapUpdatePrice, account, weth9, dai, networkConnect, ether }}>
            {children}
        </SwapTokenContext.Provider>
    )
}