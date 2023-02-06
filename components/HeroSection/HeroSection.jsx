import React, { useState } from 'react'
import Image from "next/image";

import Style from "./HeroSection.module.css";
import images from "../../assets";
import { Token, SearchToken } from "../index";

const HeroSection = ({accounts, tokenData}) => {

    const [openSetting, setOpenSetting] = useState(false);
    const [openToken, setOpenToken] = useState(false);
    const [openTokensTwo, setOpenTokensTwo] = useState(false);

    const [tokenOne, setTokenOne] = useState({
        name: "",
        image: "",
    });

    const [tokenTwo, setTokenTwo] = useState({
        name: "",
        image: "",
    });

    return (
        <div className={Style.HeroSection}>
            <div className={Style.HeroSection_box}>
                <div className={Style.HeroSection_box_heading}>
                    <p>Swap</p>
                    <div className="Style HeroSection_box_heading_img">
                        <Image src={images.close}
                            alt="image"
                            width={50}
                            height={50}
                            onClick={() => setOpenSetting(true)}
                        />
                    </div>
                </div>

                <div className={Style.HeroSection_box_input}>
                    <input type="text" placeholder="0" />
                    <button onClick={() => setOpenToken(true)}>
                        <Image src={tokenOne.image || images.etherlogo} width={20} height={20} alt="ether"/>
                        {tokenOne.name || "ETH"}
                        <small>9474</small>
                    </button>
                </div>

                <div className={Style.HeroSection_box_input}>
                    <input type="text" placeholder="0" />
                    <button onClick={() => setOpenTokensTwo(true)}>
                        <Image src={tokenTwo.image || images.etherlogo} width={20} height={20} alt="ether"/>
                        {tokenTwo.name || "ETH"}
                        <small>9474</small>
                    </button>
                </div>

                {accounts? (
                    <button className={Style.HeroSection_box_btn}>Connect Wallet</button>
                ): (
                    <button className={Style.HeroSection_box_btn} onClick={()=>{}}>
                        Swap
                    </button>
                )}
            </div>

            {openSetting && <Token setOpenSetting={setOpenSetting}/>}

            {openToken && (
                <SearchToken
                    openToken={setOpenToken}
                    tokens={setTokenOne}
                    tokenData={tokenData}
                />
            )}
            {openTokensTwo && (
                <SearchToken
                    openToken={setOpenTokensTwo}
                    tokens={setTokenTwo}
                    tokenData={tokenData}
                />
            )}
        </div>
    )
}

export default HeroSection