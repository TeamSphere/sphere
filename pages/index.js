import React, { useEffect, useRef, useState } from 'react'

import * as THREE from 'three';
import Head from "next/head";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";

import { WHITELIST_CONTRACT_ADDRESS, abi } from "../constants";

const Home = () => {
  useEffect(() => {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000);


    // Create our sphere
    const geometry = new THREE.SphereGeometry(3,64,64)
    const material = new THREE.MeshStandardMaterial({
      color: "#fb8c00",
    })
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff
    });

    const starVertices = []
    for (let i=0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = -Math.random() * 1000
      starVertices.push(x, y, z)
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))

    const stars = new THREE.Points(
      starGeometry, starMaterial
    )
    
    scene.add(stars)

    //Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    const camera = new THREE.PerspectiveCamera(
      25,
      sizes.width / sizes.height,
      5,
      3000
    );
    camera.position.z = 25;

 

    //Renderer
    const canvas = document.getElementById('myThreeJsCanvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(2);
    document.body.appendChild(renderer.domElement);


    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
    pointLight.position.set(0,10,10);
    scene.add(pointLight);

    const animate = () => {
      renderer.setSize(sizes.width, sizes.height);
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();

    //Cntrols
    const controls = new OrbitControls(camera,canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;

    //Resize
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.updateProjectionMatrix();
      camera.aspect = sizes.width / sizes.height;
      renderer.setSize(sizes.width, sizes.height);
    });

    const loop = () => {
      controls.update();
      renderer.render(scene,camera);
      window.requestAnimationFrame(loop);
    }
    loop();

  }, []);

  // WEB3 SECTION

  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  // joinedWhitelist keeps track of whether the current metamask address has joined the Whitelist or not
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // numberOfWhitelisted tracks the number of addresses's whitelisted
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();

  /**
   * Returns a Provider or Signer object representing the Ethereum RPC with or without the
   * signing capabilities of metamask attached
   *
   * A `Provider` is needed to interact with the blockchain - reading transactions, reading balances, reading state, etc.
   *
   * A `Signer` is a special type of Provider used in case a `write` transaction needs to be made to the blockchain, which involves the connected account
   * needing to make a digital signature to authorize the transaction being sent. Metamask exposes a Signer API to allow your website to
   * request signatures from the user using Signer functions.
   */
  const getProviderOrSigner = async (needSigner = false) => {
    try {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * addAddressToWhitelist: Adds the current connected address to the whitelist
   */
  const addAddressToWhitelist = async () => {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true);
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      // call the addAddressToWhitelist from the contract
      const tx = await whitelistContract.addAddressToWhitelist();
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      // get the updated number of addresses in the whitelist
      await getNumberOfWhitelisted();
      setJoinedWhitelist(true);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * getNumberOfWhitelisted:  gets the number of whitelisted addresses
   */
  const getNumberOfWhitelisted = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // No need for the Signer here, as we are only reading state from the blockchain
      const provider = await getProviderOrSigner();
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      );
      // call the numAddressesWhitelisted from the contract
      const _numberOfWhitelisted =
        await whitelistContract.numAddressesWhitelisted();
      setNumberOfWhitelisted(_numberOfWhitelisted);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * checkIfAddressInWhitelist: Checks if the address is in whitelist
   */
  const checkIfAddressInWhitelist = async () => {
    try {
      // We will need the signer later to get the user's address
      // Even though it is a read transaction, since Signers are just special kinds of Providers,
      // We can use it in it's place
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      // Get the address associated to the signer which is connected to  MetaMask
      const address = await signer.getAddress();
      // call the whitelistedAddresses from the contract
      const _joinedWhitelist = await whitelistContract.whitelistedAddresses(
        address
      );
      setJoinedWhitelist(_joinedWhitelist);
    } catch (err) {
      console.error(err);
    }
  };

  /*
    connectWallet: Connects the MetaMask wallet
  */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAddressInWhitelist();
      getNumberOfWhitelisted();
    } catch (err) {
      console.error(err);
    }
  };

  const renderButton = () => {
    if (walletConnected) {
      if (joinedWhitelist) {
        return (
          <div className="">
            Thanks for joining the Whitelist!
          </div>
        );
      } else if (loading) {
        return <button className="connect-button">Loading...</button>;
      } else {
        return (
          <button onClick={addAddressToWhitelist} className="connect-button">
            Join the Whitelist
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className="connect-button">
          Connect your wallet
        </button>
      );
    }
  };

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <>
      <div className="main">
        <span className="betatag"><p>Test Network Only</p></span>
        <span className="pretitle">Welcome to the <strong>Sphere</strong></span>
        <h1>The world of defi<br/> at your <span class="highlight">fingertips.</span></h1>
        <div className="whitelist">
          <p className="join">Join the NFT collection whitelist</p>
          <p className="already-joined"><span className="number-joined">{numberOfWhitelisted}</span> have already joined</p>
          {renderButton()}
        </div>
        
        <div class="bottom">
          <p>© Copyright 2023. All Rights Reserved<br/></p>
        </div>
        <a className="bottom-github" href="https://github.com/TeamSphere/sphere">Made with ❤️ by Team Sphere - View on Github</a>
      </div>
      <canvas id="myThreeJsCanvas" />
    </>
  )
}

export default Home