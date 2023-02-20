import React, { useEffect, useRef, useState, useContext } from 'react'

import { Canvas } from "@react-three/fiber";
import Blob from "../components/Blob";

import { HeroSection } from "../components/index";

import * as THREE from 'three';
import Head from "next/head";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";

const Home = () => {

  return (
    <>
      <div className="main">
        <span className="betatag"><p>Test Network Only</p></span>
        <span className="pretitle">Welcome to the <strong>Sphere</strong></span>
        <h1>The world of defi<br/> at your <span class="highlight">fingertips.</span></h1>
        {/* <div className="whitelist">
          <p className="join">Join the NFT collection whitelist</p>
          <p className="already-joined"><span className="number-joined">{numberOfWhitelisted}</span> have already joined</p>
          {renderButton()}
        </div> */}
        <div className="swap">
          <HeroSection accounts="hey" tokenData="DATA" />
        </div>

        {/* <Canvas className="blob" camera={{ position: [0,0.0,8.0] }} >
          <Blob />
        </Canvas> */}
        
        <div className="bottom">
          <p>© Copyright 2023. All Rights Reserved<br/></p>
        </div>
        <a className="bottom-github" href="https://github.com/TeamSphere/sphere">Made with ❤️ by Team Sphere - View on Github</a>
      </div>
      
    </>
  )
}

export default Home